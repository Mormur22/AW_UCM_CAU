/* APLICACIONES WEB. Práctica obligatoria: UCM-CAU - El Centro de Atencion a Usuarios. Grupo 33: Daniel Compán López de Lacalle y Alejandro Moreno Murillo */
'use strict'

const path = require("path");// modulo para manejar rutas
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
const DAO = require("./DAO");
const DAOUsu = require("./DAOUsuario");
const DAOTec = require("./DAOTecnico");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || config.puerto;
const pool = mysql.createPool(config.mysqlConfig);
// Crear una instancia de DAOTasks
const dao = new DAO(pool);
const daoUsu = new DAOUsu(pool);
const daoTec = new DAOTec(pool);
//Para validar errores en formularios.
const { check, validationResult } = require("express-validator"); // https://www.youtube.com/watch?v=hBETsBY3Hlg

//Configuracion de las vistas y usos
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(connectLivereload());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.json());


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
const sessionStore = new MySQLStore(config.databaseConfig);
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});


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




app.use(middlewareSession);

//Para ver que usuario esta logeado en el momento (Para pruebas) A eliminar en un futuro no muy lejano
app.use(function(request, response, next) {
    console.log("Usuario logeado: ", request.session.userName);
    next();
})

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
                request.session.mail = loginTecExito.email;
                request.session.userName = loginTecExito.nombre;
                console.log(request.session);

                response.locals.id_=request.session.id_;
                response.locals.mailID = request.session.mailID;
                response.locals.userName = request.session.userName;
            }

            //no es tecnico
            else{

                daoUsu.loginUsuario(request.body.correo, request.body.password, function(err, loginUsuExito) {

                    //tiene exito
                    if(!err){
                        
                        //es 
                        if(loginUsuExito)
                        {   
                            request.session.id_=loginTecExito.idUsu;
                            request.session.mail = loginTecExito.email;
                            request.session.userName = loginTecExito.nombre;
            
                            response.locals.id_=request.session.id_;
                            response.locals.mailID = request.session.mailID;
                            response.locals.userName = request.session.userName;


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
    console.log("Usuario logeado: ", request.session.userName);
    response.render("login", {  
        title: "Página de inicio de sesión",
        msgRegistro: false});
   
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

    }

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


dao.testDB();
// Definición de las funciones callback
// ...