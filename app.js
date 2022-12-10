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


const PORT = process.env.PORT || config.puerto;
const pool = mysql.createPool(config.mysqlConfig);
// Crear instancias DAO
const daoGen = new DAOGen(pool);
const daoUsu = new DAOUsu(pool);
const daoTec = new DAOTec(pool);
const daoAvi = new DAOAvi(pool);
//Para validar errores en formularios.
const { check, validationResult } = require("express-validator"); // https://www.youtube.com/watch?v=hBETsBY3Hlg

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

const multerFactory = multer({ storage: almacen });

app.get("/", (request, response) => {
    if(request.session.userName===undefined){
        response.status(200);
        response.render("login", {  
                title: "Página de inicio de sesión",
                msgRegistro: false});
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
                request.session.id_=loginTecExito.idTec;
                request.session.userName = loginTecExito.nombre;
                request.session.profile = loginTecExito.perfil;
                request.session.isTechnician = true;

                response.locals.id_=request.session.id_;
                response.locals.mailID = request.session.mailID;
                response.locals.userName = request.session.userName;
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
                            request.session.id_=loginUsuExito.idUsu;
                            request.session.userName = loginUsuExito.nombre;
                            request.session.profile = loginUsuExito.perfil;
                            request.session.isTechnician = false;
            
                            response.locals.id_=request.session.id_;
                            response.locals.mailID = request.session.mailID;
                            response.locals.userName = request.session.userName;
                            response.redirect("./main.html");
                           
                        }

                        //el correo con el usuario no está
                        else{
                            console.log(500);
                            console.log("ERROR no coinciden usuario y contraseña");
                        }
                    }

                    //error de base de datos
                    else{
                        console.log(err.message);
                    }
                });
            }
            
        }

        //error de base de datos
        else{
            console.log(err.message);
        }

    });

    //habría que pasarle el request.session
    

})

app.get("/signup", (request, response) => {     
    if(request.session.userName===undefined){
        response.status(200);
        const errors = validationResult(request);
        response.render("signup", { title: "Página de registro",
                                    errores: errors.mapped() ,
                                    msgRegistro: false});//False para usu que no existe True si ya existe 
    }
    
});


app.post("/registro", multerFactory.single('foto'),(request, response) => {

    console.log(request.body);
    //aqui se deben hacer las comprobaciones

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
                            console.log(err.message);
                        } else {
                            
                            //no existe el tecnico con el nombre de correo
                            if(!existeCorreo){
                                
                                daoTec.existeNumEmpleado(request.body.numEmp, function(err, existeNumEmp) {
                                    if(err) {
                                        response.status(500); 
                                        console.log(err.message);
                                    } else {
                                       
                                        //el numero de empleado es correcto
                                        if(existeNumEmp){
                                            
                                            daoTec.registroTecnico(request.body, function(err,insertId){
                                                console.log("registro")
                                                if(err) {
                                                    response.status(500); 
                                                    console.log(err.message);
                                                }
                                                else{
                                                    response.status(200);
                                                    response.redirect("/signup");
                                                }
                                            });
                                        }

                                        else{
                                            response.status(500); 
                                            console.log(err.message);
                                        }
                                    }
                                });
                            }

                            else{
                                response.status(500); 
                                console.log(err.message);
                            }
                        }
                    });
                }

                else{
                    response.status(500); 
                    console.log(err.message);
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
            } 
            else {
                console.log("comprueba correo")
                //no existe el usuario con el nombre de usuario
                if(!existeUsu){
                    daoUsu.existeCorreoUsuario(request.body.correo,function(err, existeCorreo) {
                        if(err) {
                            response.status(500); 
                            console.log(err.message);
                        } else {
                            
                            //no existe el tecnico con el nombre de correo
                            if(!existeCorreo){   
                                daoUsu.registroUsuario(request.body, function(err,insertId){
                                console.log("registro")
                                if(err) {
                                    response.status(500); 
                                    console.log(err.message);
                                }
                                else{
                                    response.status(200);
                                    response.redirect("/signup");
                                }
                                });
                            }
                        }
                    });
                }
                else{
                    response.status(500); 
                    console.log(err.message);
                }
            }
        });
    }

 });

app.get("/main.html", function(request, response) {
    response.status(200);
    console.log(request.session);
    response.render("main", { userData: user_data });
});

app.get("/tables/notifies", function(request, response) {
    daoAvi.getOpenNotifies(
        function(err, result) {
            const rows = result.map( a => util.toTechnicianHtmlNotify(a, user_data.id) );
            response.render("notifies", { rows: rows });
        } );
});

app.get("/tables/mynotifies", function(request, response) {
    daoAvi.getMyOpenNotifies(user_data.id,
        function(err, result) {
            const rows = result.map( a => util.toTechnicianHtmlNotify(a, user_data.id) );
            response.render("notifies", { rows: rows });
        } );
});

app.get("/tables/historic", function(request, response) {
    daoAvi.getMyClosedNotifies(user_data.id,
        function(err, result) {
            const rows = result.map( a => util.toTechnicianHtmlNotify(a, user_data.id) );
            response.render("notifies", { rows: rows });
        } );
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
