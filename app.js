/* APLICACIONES WEB. Práctica obligatoria: UCM-CAU - El Centro de Atencion a Usuarios. Grupo 33: Daniel Compán López de Lacalle y Alejandro Moreno Murillo */
'use strict'

// watch front-end changes
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const multer = require("multer");
// open livereload high port and start to watch public directory for changes
const liveReloadServer = livereload.createServer();
const express = require("express");
//Libreria que vamos a usar
const app = express();
const config = require("./config");//Configuracion bbd y puerto
const mysql = require("mysql");
const DAOGen = require("./DAOGeneral");
const DAOUsu = require("./DAOUsuario");
const DAOTec = require("./DAOTecnico");
const DAOAvi = require("./DAOAviso");
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator');


const PORT = process.env.PORT || config.puerto;
const pool = mysql.createPool(config.mysqlConfig);
// Crear las instancias DAO
const daoGen= new DAOGen(pool);
const daoUsu = new DAOUsu(pool);
const daoTec = new DAOTec(pool);
const daoAvi = new DAOAvi(pool);
//Para validar errores en formularios.

//Configuracion de las vistas y usos
const path = require("path");  // core module
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(connectLivereload());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.json());

const Util = require("./util.js"); // File Module
const Hardcode = require("./hardcode.js"); // File Module


// Crear un objeto Util
const util = new Util();

// Crear un objeto Hardcode
const hardcode = new Hardcode();

const user_data = hardcode.tecnicoSession(1);
//const user_data = hardcode.usuarioSession(1);

// Creación de la aplicación express




//Ubicacion Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));
liveReloadServer.watch(path.join(__dirname, "public"), path.join(__dirname, "views"));
//--------------------------------------------------------------------

app.use(express.json());//Devuelve middleware que solo analiza json y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo.
app.use(express.urlencoded({extended: true}));//Devuelve middleware que solo analiza cuerpos codificados en URL y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo
//Se indica a express donde se encuentan las vistas

//---------------------------------Sesion---------------------------------
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore(config.mysqlConfig);
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: true,
    store: sessionStore
});
app.use(middlewareSession);

//---------------------------------Multer----------------------------------

var almacen = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public', 'img'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  });

const multerFactory = multer({ storage: multer.memoryStorage() });

app.get("/", (request, response) => {

    if(request.session.iduser===undefined){
        response.status(200);
        response.render("login", {  
                title: "Página de inicio de sesión",
                msgRegistro: false});
    }

    //cargarme la sessión
    else{
        response.redirect("logout");
    }
});

app.post("/login_user", multerFactory.none(),(request, response) => {

    console.log(request.body);



    daoTec.loginTecnico(request.body.correo, request.body.password, function(err, loginTecExito) {

        //tiene exito
        if(!err){
            
            console.log(loginTecExito);
            //es tecnico
            if(loginTecExito)
            {   
                request.session.iduser=loginTecExito.idTec;
                request.session.name = loginTecExito.nombre;
                request.session.correo = loginTecExito.email;
                request.session.profile = loginTecExito.perfil;
                request.session.fecha = loginTecExito.fecha;
                request.session.isTechnician = true;

                response.locals.iduser=request.session.iduser;
                response.locals.correo = request.session.email;
                response.locals.name = request.session.name;
                response.locals.perfil = request.session.profile;
                response.locals.isTechnician = true;
                console.log("locals (técnico):");
                console.log(response.locals)
                response.redirect("./main.html");
            }

            //no es tecnico
            else{

                daoUsu.loginUsuario(request.body.correo, request.body.password, function(err, loginUsuExito) {

                    //tiene exito
                    if(!err){
                        
                        //es 
                        if(loginUsuExito)
                        {   
                            request.session.iduser=loginUsuExito.idUsu;
                            request.session.name = loginUsuExito.nombre;
                            request.session.correo = loginUsuExito.email
                            request.session.profile = loginUsuExito.perfil;
                            request.session.fecha = loginUsuExito.fecha.toISOString().replace('T', ' ').substr(0, 19);
                            request.session.isTechnician = false;
            
                            response.locals.iduser=request.session.iduser;
                            response.locals.correo = request.session.correo;
                            response.locals.name = request.session.name;
                            response.locals.perfil = request.session.profile;
                            response.locals.isTechnician = false;
                            console.log("locals (usuario estándar):");
                            console.log(response.locals);
                            response.redirect("./main.html");
                           
                        }

                        //el correo con el usuario no está
                        else{
                            response.status(500);
                                response.render("login", {  
                                title: "Error", 
                                msgRegistro: "ERROR no coinciden usuario y contraseña", 
                                tipoAlert: "alert-danger"
                            });
                        }
                    }

                    //error de base de datos
                    else{
                        response.status(500);
                        response.render("login", {  
                            title: "Error", 
                            msgRegistro: err.msg,
                            tipoAlert: "alert-danger"
                        });
                    }
                });
            }
            
        }

        //error de base de datos
        else{
            response.status(500);
            response.render("login", {  
            title: "Error", 
            msgRegistro: "ERROR no coinciden usuario y contraseña",tipoAlert: "alert-danger"
            });
        }

    });

    //habría que pasarle el request.session
    

})


app.get("/signup", (request, response) => {     
    if(request.session.iduser===undefined){
        response.status(200);
        const errors = validationResult(request);
        response.render("signup", { title: "Página de registro",
                                    errores: errors.mapped() ,
                                    msgRegistro: false});//False para usu que no existe True si ya existe 
    }   
});


app.post("/registro", multerFactory.single('foto'),(request,response) => {
    
        let imagen;
        if (request.file) {
            imagen= request.file.buffer ;
        }

        let esTecnico = request.body['tecnico-check'];

        //tecnico
        if(esTecnico){
            daoTec.existeTecnico(request.body.username,function(err, existeTec) {
                console.log("compruebausername")
                if(err) {
                    response.status(500); 
                    console.log(err.message);
                } 
                else {
                    console.log("comprueba correo")
                    //no existe el tecnico con el nombre de usuario
                    if(!existeTec){
                        daoTec.existeCorreoTecnico(request.body.correo,function(err, existeCorreo) {
                            if(err) {
                                response.status(500); 
                                response.render("signup", 
                                { title: "ERROR",
                                msgRegistro: err.message,
                                tipoAlert: "alert-danger"});//False para usu que no existe True si ya existe 
                            } else {
                                
                                //no existe el tecnico con el nombre de correo
                                if(!existeCorreo){
                                    
                                    daoTec.existeNumEmpleado(request.body.numEmp, function(err, existeNumEmp) {
                                        if(err) {
                                            response.status(500); 
                                            response.render("signup", { title: "ERROR",
                                            msgRegistro: err.message,
                                            tipoAlert: "alert-danger"});
                                        } else {
                                        
                                            //el numero de empleado es correcto
                                            if(existeNumEmp){
                                                
                                                daoTec.registroTecnico(request.body,imagen,function(err,insertId){
                                                    console.log("registro")
                                                    if(err) {
                                                        response.status(500); 
                                                        console.log(err.message);
                                                        response.render("signup", { title: "ERROR",
                                                        msgRegistro: err.message,
                                                        tipoAlert: "alert-danger"});
                                                    }
                                                    else{
                                                        response.status(200);
                                                        response.redirect("/");
                                                    }
                                                });
                                            }

                                            else{
                                                response.status(500); 
                                                response.render("signup", { title: "ERROR",
                                                msgRegistro: "EL CODIGO DE EMPLEADO NO EXISTE",
                                                tipoAlert: "alert-danger"});//False para usu que no existe True si ya existe 
                                            }
                                        }
                                    });
                                }

                                else{
                                    response.status(500); 
                                    response.render("signup", { title: "ERROR",
                                    msgRegistro: "EL CORREO DEL USUARIO YA ESTA REGISTRADO COMO TECNICO",
                                    tipoAlert: "alert-danger"});//False para usu que no existe True si ya existe 
                                }
                            }
                        });
                    }

                    else{
                        response.status(500); 
                        response.render("signup", { title: "ERROR",
                        msgRegistro: "EL NOMBRE DE USUARIO YA ESTA REGISTRADO COMO TECNICO",
                        tipoAlert: "alert-danger"});//False para usu que no existe True si ya existe 
                    }
                }
            });
        }

        //usuario
        else{
            daoUsu.existeNombreUsuario(request.body.username,function(err, existeUsu) {
                console.log("compruebausername")
                if(err) {
                    response.status(500); 
                    console.log(err.message);
                    response.render("signup", { title: "ERROR",
                    msgRegistro: err.message,
                    tipoAlert: "alert-danger"});
                } 
                else {
                    console.log("comprueba correo")
                    console.log(existeUsu);
                    //no existe el usuario con el nombre de usuario
                    if(!existeUsu){
                        daoUsu.existeCorreoUsuario(request.body.correo,function(err, existeCorreo) {
                            if(err) {
                                response.status(500); 
                                console.log(err.message);
                                response.render("signup", { title: "ERROR",
                                msgRegistro: err.message,
                                tipoAlert: "alert-danger"});
                            } 
                            else {
                                console.log(existeCorreo)
                                //no existe el usuario con el nombre de correo
                                if(!existeCorreo){   
                                    console.log(request.body);
                                    daoUsu.registroUsuario(request.body.correo, imagen, function(err,insertId){
                                    console.log("registro")
                                    if(err) {
                                        response.status(500); 
                                                        console.log(err.message);
                                                        response.render("signup", { title: "ERROR",
                                                        msgRegistro: err.message,
                                                        tipoAlert: "alert-danger"});
                                    }
                                    else{
                                        response.status(200);
                                        response.redirect("/");
                                    }
                                    });
                                }

                                else{
                                    response.status(500); 
                                    response.render("signup", { title: "ERROR",
                                    msgRegistro: "EL CORREO DEL USUARIO YA ESTA REGISTRADO COMO USUARIO",
                                    tipoAlert: "alert-danger"});//False para usu que no existe True si ya existe 
                                }
                            }
                        });
                    }
                    else{
                        response.status(500); 
                        response.render("signup", { title: "ERROR",
                        msgRegistro: "EL NOMBRE DEL USUARIO YA ESTA REGISTRADO COMO USUARIO",
                        tipoAlert: "alert-danger"});//False para usu que no existe True si ya existe 
                    }
                }
            });
        }

    });

    app.use(function(request, response, next) {
        if (request.session.iduser!== undefined) {
            response.locals.iduser = request.session.iduser;
            next();
        } else {
            response.redirect("/");
        }
});



app.get("/main.html", function(request, response) {
    response.status(200);

    response.locals.name = request.session.name;
    response.locals.isTechnician = request.session.isTechnician;
    response.locals.fecha = request.session.fecha;
    response.locals.perfil= request.session.perfil;
    let avisosData;
    //Recuperamos los datos del perfil dependiendo de si es usuario o técnico de
    if(response.locals.isTechnician===true){

       
        daoAvi.getTechnicianAllNotifies(request.session.iduser, function (err,avisos)
        {   if(err){
                console.log(err);
            }
            else{
                console.log(avisos);
                avisosData = util.getAvisosNumbers(avisos);
                response.locals.numAvisos = avisosData.numAvisos;
                response.locals.numInc = avisosData.numInc;
                response.locals.numSug = avisosData.numSug;
                response.locals.numFel = avisosData.numFel;
                response.render("main");
            }
        });
    
    }

    else {
        daoAvi.getUserAllNotifies(request.session.iduser, function (err,avisos)
            {   if(err){
                console.log(err);
            }
            else{
                console.log(avisos);
                avisosData = util.getAvisosNumbers(avisos);
                response.locals.numAvisos = avisosData.numAvisos;
                response.locals.numInc = avisosData.numInc;
                response.locals.numSug = avisosData.numSug;
                response.locals.numFel = avisosData.numFel;
                console.log(response.locals);
                response.render("main");
            }
        });
    }
});

app.get("/imagen", function(request, response) {
    if(request.session.isTechnician){
        daoTec.obtenerImagen(request.session.iduser, function(err, imagen) {
            if (imagen) {
                response.status(200);
                response.sendFile(path.join(__dirname,'public', 'img','avatars', imagen));
            } 
            else {
                response.status(200);
                response.sendFile(path.join(__dirname,'public', 'img','avatars', 'default.jpg'));
            }
        });
    }
    else{
        daoUsu.obtenerImagen(request.session.iduser, function(err, imagen) {
            if (imagen) {
                response.status(200);
                response.sendFile(path.join(__dirname,'public', 'img','avatars', imagen));
            } 
            else {
                response.status(200);
                response.sendFile(path.join(__dirname,'public', 'img','avatars', 'default.jpg'));
            }
        });
    }
});

app.post("/crearAviso", multerFactory.none(), function(request, response){
   
    let aviso ={

        tipo: request.tipo,
        categoria: request.categoria,
        subcategoria: request.subcategoria,
        observaciones: request.obs,
        idUsu: request.session.idUsu,
    }

    daoAvi.createNotify(aviso, function(err, result){

    });
   
});
    


app.get("/tables/notifies", function(request, response) {
    daoAvi.getOpenNotifies(
        function(err, result) {
            const rows = result.map( a => util.toTechnicianHtmlNotify(a, request.session.iduser) );
            response.render("notifies", { rows: rows });
        } );
});

app.get("/tables/mynotifies", function(request, response) {
    if(request.session.isTechnician) {
        daoAvi.getTechnicianOpenNotifies(request.session.iduser,
            function(err, result) {
                const rows = result.map( a => util.toTechnicianHtmlNotify(a, request.session.iduser) );
                response.render("notifies", { rows: rows });
            } );
    }
    else {
        daoAvi.getUserOpenNotifies(request.session.iduser,
            function(err, result) {
                const rows = result.map( a => util.toUserHtmlOpenNotify(a) );
                response.render("mynotifies", { rows: rows });
            } );
    }
});

app.get("/tables/historic", function(request, response) {
    if(request.session.isTechnician) {
        daoAvi.getTechnicianClosedNotifies(request.session.iduser,
            function(err, result) {
                const rows = result.map( a => util.toTechnicianHtmlNotify(a, request.session.iduser) );
                response.render("notifies", { rows: rows });
            } );
    }
    else {
        daoAvi.getUserClosedNotifies(request.session.iduser,
            function(err, result) {
                const rows = result.map( a => util.toUserHtmlClosedNotify(a) );
                response.render("notifies", { rows: rows });
            } );
    }
});

app.get("/tables/users", function(request, response) {
    daoTec.getAllTechnicians(
        function(err,trows) {
            daoUsu.getAllUsers(
                function(err,urows) {
                    const rows = util.toComonArray(trows,urows).map( c => util.toHtmlCommon(c) );
                    response.render("users", { rows: rows });
                }
            );
        }
    );
});

app.get("/logout",(request, response) => {
    response.status(200);
    request.session.destroy();
    response.redirect("/");
});

// Uso del middleware Static para servir todos los ficheros estáticos (.html, .css, .jpg, png, ...) de la carpeta public y sus subdirectorios
app.use(express.static(path.join(__dirname, "public")));


// Escuchar peticiones
app.listen(3000, function(err){
    if(err){
        console.error("No se pudo iniciar el servidor: " + err.message );
    } else {
        console.log("Servidor arrancado en el puerto 3000")
    }
});

daoGen.testDB();

// DATOS DE SESIÓN NECESARIOS
// session = { id: Number, name: String, profile: String, imageURL: String, isTechnician: Boolean}
// EJEMPLO
// session_ej = { id: 1, name: "Alexander Ortiz", profile: "pas", imageURL: "\\img\\avatars\\aortiz.jpg", isTechnician: Boolean }
// La URL de la imagen se obtiene así:
// imageURL = USU.imagen == undefined ||  tec.imagen == "null" ? "\\img\\avatars\\default.jpg" : "\\img\\avatars\\" + tec.imagen