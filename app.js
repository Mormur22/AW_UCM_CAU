/* APLICACIONES WEB. Práctica obligatoria: UCM-CAU - El Centro de Atencion a Usuarios. Grupo 33: Daniel Compán López de Lacalle y Alejandro Moreno Murillo */
'use strict'

// Librerias
//const livereload = require("livereload"); // watch front-end changes
//const connectLivereload = require("connect-livereload");
//const liveReloadServer = livereload.createServer(); // open livereload high port and start to watch public directory for changes
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator');
const multer = require("multer");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const { Console } = require("console");

 // File Modules
const config = require("./config"); // Configuracion BD y puerto
const mysql = require("mysql");
const DAOGen = require("./DAOGeneral");
const DAOUsu = require("./DAOUsuario");
const DAOTec = require("./DAOTecnico");
const DAOAvi = require("./DAOAviso");
const Util = require("./util.js");
const Hardcode = require("./hardcode.js");

// Creación de la aplicación express
const app = express();
app.set("view engine", "ejs");  // Configurar EJS como motor de plantillas
app.set("views", path.join(__dirname, "views"));  // Se indica a express donde se encuentan las plantillas

const PORT = process.env.PORT || config.puerto;
const pool = mysql.createPool(config.mysqlConfig);

// Crear las instancias DAO
const daoGen= new DAOGen(pool);
const daoUsu = new DAOUsu(pool);
const daoTec = new DAOTec(pool);
const daoAvi = new DAOAvi(pool);
// Crear un objeto Util
const util = new Util();
// Crear un objeto Hardcode
const hardcode = new Hardcode();
//const user_data = hardcode.tecnicoSession(1);
//const user_data = hardcode.usuarioSession(1);

//--------------------------------------------------------------------

app.use(express.static(path.join(__dirname, "public")));  // Ubicacion Archivos estaticos
app.use(express.json()); // Devuelve middleware que solo analiza json y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo.
app.use(express.urlencoded({extended: true})); // Devuelve middleware que solo analiza cuerpos codificados en URL y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo
//liveReloadServer.watch(path.join(__dirname, "public"), path.join(__dirname, "views"));
//app.use(connectLivereload());
app.use(bodyParser.urlencoded({ extended:true}));

//---------------------------------Sesion---------------------------------

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

    daoTec.loginTecnico(request.body.correo, request.body.password, function(err, loginTecExito) {

        //tiene exito
        if(!err){
            
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
                const cookieVal = {
                    id:  response.locals.iduser,
                    nombre:  response.locals.name,
                    correo: response.locals.correo,
                    perfil: response.locals.perfil,
                    isTechnician: response.locals.isTechnician
                }
                const cookieValStr = JSON.stringify(cookieVal);
                response.cookie("cookieUser",cookieValStr);
                response.redirect("./main");
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
                            const cookieVal = {
                                id:  response.locals.iduser,
                                nombre:  response.locals.name,
                                correo: response.locals.correo,
                                perfil: response.locals.perfil,
                                isTechnician: response.locals.isTechnician
                            }
                            const cookieValStr = JSON.stringify(cookieVal);
                            response.cookie("cookieUser",cookieValStr);
                            response.redirect("./main");

                        }

                        //el correo con el usuario no está
                        else{
                            response.status(500);
                                response.render("login", {  
                                title: "Error", 
                                msgRegistro: "ERROR no coinciden usuario y contraseña o el usuario está desactivado", 
                                tipoAlert: "alert-danger"
                            });
                        }
                    }

                    //error de base de datos
                    else{
                        response.status(501);
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
            msgRegistro: "ERROR no coinciden usuario y contraseña o el usuario está desactivado",tipoAlert: "alert-danger"
            });
        }

    });

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
            imagen = {
                data: request.file.buffer, // Los datos de la imagen
                mime: request.file.mimetype // Aquí obtienes el tipo MIME
            };
        }

        let esTecnico = request.body['tecnico-check'];

        //tecnico
        if(esTecnico){
            daoTec.existeTecnico(request.body.username,function(err, existeTec) {
                if(err) {
                    response.status(501);
                    response.render("signup", 
                    { title: "ERROR",
                    msgRegistro: "Error de conexión con la base de datos",
                    tipoAlert: "alert-danger"});//False para usu que no existe True si ya existe 
                } 
                else {
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
                                                    
                                                    if(err) {
                                                        response.status(500); 
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
                if(err) {
                    response.status(500); 
                    response.render("signup", { title: "ERROR",
                    msgRegistro: err.message,
                    tipoAlert: "alert-danger"});
                } 
                else {
                    //no existe el usuario con el nombre de usuario
                    if(!existeUsu){
                        daoUsu.existeCorreoUsuario(request.body.correo,function(err, existeCorreo) {
                            if(err) {
                                response.status(501); 
                                response.render("signup", { title: "ERROR",
                                msgRegistro: err.message,
                                tipoAlert: "alert-danger"});
                            } 
                            else {
                                //no existe el usuario con el nombre de correo
                                if(!existeCorreo){   
                                    daoUsu.registroUsuario(request.body, imagen, function(err,insertId){
                                    if(err) {
                                        response.status(501); 
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

app.get("/main", function(request, response) {
    response.status(200);

    response.locals.name = request.session.name;
    response.locals.isTechnician = request.session.isTechnician;
    response.locals.fecha = request.session.fecha;
    response.locals.perfil= request.session.profile;
    let avisosData;
    //Recuperamos los datos del perfil dependiendo de si es usuario o técnico de
    if(response.locals.isTechnician===true){

       
        daoAvi.getTechnicianAllNotifies(request.session.iduser, function (err,avisos)
        {   if(err){

            }
            else{
                avisosData = util.getAvisosNumbers(avisos);
                response.locals.numAvisos = avisosData.numAvisos;
                response.locals.numInc = avisosData.numInc;
                response.locals.numSug = avisosData.numSug;
                response.locals.numFel = avisosData.numFel;
                response.render("main",{msgRegistro: false, isTechnician: response.locals.isTechnician});
            }
        });
    
    }

    else {
        daoAvi.getUserAllNotifies(request.session.iduser, function (err,avisos)
            {   if(err){

            }
            else{
                avisosData = util.getAvisosNumbers(avisos);
                response.locals.numAvisos = avisosData.numAvisos;
                response.locals.numInc = avisosData.numInc;
                response.locals.numSug = avisosData.numSug;
                response.locals.numFel = avisosData.numFel;
                response.render("main",{msgRegistro: false, isTechnician: response.locals.isTechnician});
            }
        });
    }
});


app.post('/search', function(request, response) {

    const searchText = request.body.searchText;
    const searchUsers = request.body.isUserSearch;
    const option = Number(request.body.option);
    const isTechnician = request.session.isTechnician;

    if (searchUsers === 'true') {
        daoTec.buscarUsuarioPorNombreApellido(searchText, function(err, result) {
            if (err) {
                response.send("<p> Error </p>");
                response.status(500).json({ error: 'Error en la búsqueda de usuarios.' });
            } else {
                const rows = result.map( c => util.toHtmlCommon(c) );
                response.render("users", { rows: rows });
            }
        });
    } else {
        // Aquí podríamos tener una lógica para diferentes tipos de tablas
        switch (option) {

            case 0:
                if(request.session.isTechnician) {
                    daoAvi.buscarTodosAvisostecnicoPorDescripcion(searchText,
                        function(err, result) {
                            if (err) {
                                response.send("<p> Error </p>");
                                response.status(500).json({ error: 'Error en la búsqueda de avisos.' });
                            }
                            else{
                                const rows = result.map( a => util.toTechnicianHtmlNotify(a, request.session.iduser) );
                                response.render("notifies", { rows: rows });
                            }
                        });
                }
                else {
                    daoAvi.buscarTodosAvisosUsuarioPorDescripcion(request.session.iduser,searchText,
                        function(err, result) {
                            if (err) {
                                response.send("<p> Error </p>");
                                response.status(500).json({ error: 'Error en la búsqueda de avisos.' });
                            }
                            else{
                                const rows = result.map( a => util.toUserHtmlClosedNotify(a) );
                                response.render("notifies", { rows: rows });
                            }
                        });
                }
                break;
            
            //avisos entrantes del tecnico
            case 1:
                daoAvi.buscarAvisoPorDescripcion(searchText, function(err, result) {
                    if (err) {
                        response.send("<p> Error </p>");
                        response.status(500).json({ error: 'Error en la búsqueda de avisos.' });
                    } else {
                        const rows = result.map( a => util.toTechnicianHtmlNotify(a, request.session.iduser) );
                        response.render("notifies", { rows: rows });
                    }
                });
                break;
            
            //misavisos
            case 2:

                if(request.session.isTechnician) {
                    daoAvi.buscarMisAvisosTecnicoPorDescripcion(request.session.iduser,searchText,
                        function(err, result) {
                            if (err) {
                                response.send("<p> Error </p>");
                                response.status(500).json({ error: 'Error en la búsqueda de avisos.' });
                            }
                            else{
                            const rows = result.map( a => util.toTechnicianHtmlNotify(a, request.session.iduser) );
                            response.render("notifies", { rows: rows });
                            }
                        });
                }
                else {
                    daoAvi.buscarMisAvisosUsuarioPorDescripcion(request.session.iduser,searchText,
                        function(err, result) {
                            if (err) {
                                response.send("<p> Error </p>");
                                response.status(500).json({ error: 'Error en la búsqueda de avisos.' });
                            }
                            else{
                                const rows = result.map( a => util.toUserHtmlOpenNotify(a) );
                                response.render("mynotifies", { rows: rows });
                            }
                        });
                }
                break;

                //historico de avisos
            case 3:
                if(request.session.isTechnician) {
                    daoAvi.buscarHistoricoAvisostecnicoPorDescripcion(request.session.iduser,searchText,
                        function(err, result) {
                            if (err) {
                                response.send("<p> Error </p>");
                                response.status(500).json({ error: 'Error en la búsqueda de avisos.' });
                            }
                            else{
                                const rows = result.map( a => util.toTechnicianHtmlNotify(a, request.session.iduser) );
                                response.render("notifies", { rows: rows });
                            }
                        });
                }
                else {
                    daoAvi.buscarHistoricoAvisosUsuarioPorDescripcion(request.session.iduser,searchText,
                        function(err, result) {
                            if (err) {
                                response.send("<p> Error </p>");
                                response.status(500).json({ error: 'Error en la búsqueda de avisos.' });
                            }
                            else{
                                const rows = result.map( a => util.toUserHtmlClosedNotify(a) );
                                response.render("notifies", { rows: rows });
                            }
                        });
                }
                break;

            default:
                if(request.session.isTechnician) {
                    daoAvi.buscarTodosAvisostecnicoPorDescripcion(searchText,
                        function(err, result) {
                            if (err) {
                                response.send("<p> Error </p>");
                                response.status(500).json({ error: 'Error en la búsqueda de avisos.' });
                            }
                            else{
                                const rows = result.map( a => util.toTechnicianHtmlNotify(a, request.session.iduser) );
                                response.render("notifies", { rows: rows });
                            }
                        });
                }
                else {
                    daoAvi.buscarTodosAvisosUsuarioPorDescripcion(request.session.iduser,searchText,
                        function(err, result) {
                            if (err) {
                                response.send("<p> Error </p>");
                                response.status(500).json({ error: 'Error en la búsqueda de avisos.' });
                            }
                            else{
                                const rows = result.map( a => util.toUserHtmlClosedNotify(a) );
                                response.render("notifies", { rows: rows });
                            }
                        });
                }
                break;
            }
        }
    });
    
    app.get("/imagen", function(request, response) {

        if(request.session.isTechnician){
            daoTec.obtenerImagen(request.session.iduser, function(err, imagen) {
                console.log(imagen.data)
                if (err) {
                    // Si ocurre un error, enviar la imagen por defecto
                    console.log('error');
                    response.status(200);
                    response.sendFile(path.join(__dirname, 'public', 'img', 'avatars', 'default.jpg'));
                } else if (Buffer.isBuffer(imagen.data)) {
                    // Si se obtiene la imagen, enviar los datos binarios al cliente
                    console.log('hay imagen: ', imagen);
                    response.writeHead(200, {
                        'Content-Type': imagen.mime
                    });
                    response.end(imagen.data);
                } else {
                    // Si no hay imagen, enviar la imagen por defecto
                    console.log('no hay hay imagen');
                    response.status(200);
                    response.sendFile(path.resolve(__dirname, 'public', 'img', 'avatars', 'default.jpg'));
                }
            });
        }

        else{
            daoUsu.obtenerImagen(request.session.iduser, function(err, imagen) {
                if (err) {
                    // Si ocurre un error, enviar la imagen por defecto
                    console.log('error');
                    response.status(200);
                    response.sendFile(path.join(__dirname, 'public', 'img', 'avatars', 'default.jpg'));
                } else if (Buffer.isBuffer(imagen.data)) {
                    // Si se obtiene la imagen, enviar los datos binarios al cliente
                    console.log('hay imagen: ', imagen);
                    response.writeHead(200, {
                        'Content-Type': imagen.mime
                    });
                    response.end(imagen.data);
                } else {
                    // Si no hay imagen, enviar la imagen por defecto
                    console.log('no hay hay imagen');
                    response.status(200);
                    response.sendFile(path.resolve(__dirname, 'public', 'img', 'avatars', 'default.jpg'));
                }
            });
        }
    });
    
    
    

// Devolver la lista de categorias para el combo box (<select>) del modal de crear aviso
app.get("/category_list/:typeAvi", (request, response) => {
    const perfil= request.session.profile;
    const tipo = request.params.typeAvi;
    const categories = util.getProfileCategories(perfil, tipo);
    response.send(categories.map( c => { return { value: c , text: util.toCategoryText(c) } } ));
});

// Devolver la lista de subcategorias para el combo box (<select>) del modal de crear aviso
app.post("/subcategory_list", (request, response) => {
    const perfil= request.session.profile;
    const tipo = request.body.typeAvi;
    const categoria = request.body.category;
    const subcategories = util.getProfileSubcategories(perfil, tipo, categoria);
    response.send(subcategories.map( c => { return { value: c , text: util.toSubcategoryText(c) } } ));
});

// Crear nuevo aviso
app.post("/crearAviso", function(request, response){
    const aviso ={
        tipo: request.body.tipo,
        categoria: request.body.categoria,
        subcategoria: request.body.subcategoria,
        observaciones: request.body.observaciones,
        idUsu: request.session.iduser,
    };
    daoAvi.createNotify(aviso, function(err, result){
        response.redirect("/main");
    });
});

// Avisos entrantes
app.get("/tables/notifies", function(request, response) {
   
    daoAvi.getOpenNotifies(
        function(err, result) {
            const rows = result.map( a => util.toTechnicianHtmlNotify(a, request.session.iduser) );
            response.render("notifies", { rows: rows });
        } );
});

// Mis avisos
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

// Historico de avisos
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

// Gestion de usuarios
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

// Borrar técnico
app.post("/user/cancelTechnician/:idTec", (request, response) => {
    daoTec.cancelTechnician(request.params.idTec, function(err, res) {
        response.send(res);
    });
});

// Borrar usuario
app.post("/user/cancelUser/:idUsu", (request, response) => {
    daoUsu.cancelUser(request.params.idUsu, function(err,res) {
        response.send(res);
    });
});

// Ver Aviso
app.get("/notice/view/:idAvi", (request, response) => {
    if(request.session.isTechnician) {
        daoAvi.getNotify(request.params.idAvi,
            function(err, aviso) {
                if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha encontrado el aviso solicitado en la BD.", stack: null });
                else {
                    daoUsu.getUser(aviso.idUsu,
                        function(err, usuario) {
                            if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha encontrado el usuario del aviso solicitado en la BD.", stack: null });
                            else {
                                if(aviso.idTec === null) response.render("notice", { mode: "view", user: usuario.nombre, profile: util.toProfileText(usuario.perfil, true), notify: util.toModalHtmlNotify(aviso), technician: null });
                                else {
                                    daoTec.getTechnicianName(aviso.idTec , 
                                        function(err, nombreTec) {
                                            if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha podido recuperar el nombre del técnico asignado al aviso solicitado.", stack: null });
                                            else response.render("notice", { mode: "view", user: usuario.nombre, profile: util.toProfileText(usuario.perfil, true), notify: util.toModalHtmlNotify(aviso), technician: nombreTec });
                                        }
                                    );                                   
                                }
                            }
                        }
                    );
                }
            }
        )
    }
    else {
        daoAvi.getNotify(request.params.idAvi,
            function(err, aviso) {
                if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha encontrado el aviso solicitado en la BD.", stack: null });
                else {
                    if(request.session.iduser !== aviso.idUsu) response.render("error_modal", { code: 500, status: "Forbidden", message: "Permiso denegado. El aviso solicitado es de otro usuario.", stack: null });
                    else {
                        if(aviso.idTec === null) response.render("notice", { mode: "view", user: request.session.name, profile: util.toProfileText(request.session.profile, true), notify: util.toModalHtmlNotify(aviso), technician: null });
                        else {
                            daoTec.getTechnicianName(aviso.idTec , 
                                function(err, nombreTec) {
                                    if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha podido recuperar el nombre del técnico asignado al aviso solicitado.", stack: null });
                                    else response.render("notice", { mode: "view", user: request.session.name, profile: util.toProfileText(request.session.profile, true), notify: util.toModalHtmlNotify(aviso), technician: nombreTec });
                                }
                            );                           
                        }
                    }
                }
            }
        )
    }
});

// Asignar aviso (mostrar)
app.get("/notice/assign/:idAvi", (request, response) => {
    if(request.session.isTechnician) {
        daoAvi.getNotify(request.params.idAvi,
            function(err, aviso) {
                if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha encontrado el aviso solicitado en la BD.", stack: null });
                else {
                    daoUsu.getUser(aviso.idUsu,
                        function(err, usuario) {
                            if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha encontrado el usuario del aviso solicitado en la BD.", stack: null });
                            else {
                                if(aviso.idTec !== null) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "El aviso solicitado ya está asignado.", stack: null });
                                else {
                                    response.render("notice", { mode: "assign", user: usuario.nombre, profile: util.toProfileText(usuario.perfil, true), notify: util.toModalHtmlNotify(aviso), technician: null });
                                }
                            }
                        }
                    );
                }
            }
        )       
    }
    else  response.render("error_modal", { code: 500, status: "Forbidden", message: "Permiso denegado. No tiene permiso para realizar esta acción.", stack: null });
});

// Devolver la lista de técnicos para el combo box (<select>) del modal de aviso en modo de asignación
app.get("/technician_list", (request, response) => {
    if(request.session.isTechnician) {
        daoTec.getAllTechnicians(
            function(err, techList) {
                if(err) response.send({ idTec: 0, nombre: "ERROR" });
                else response.send(techList.map(t => { return { idTec: t.idTec, nombre: t.nombre } } ));
            }
        );
    }
});

// Asignar aviso (recibir formulario)
app.post("/notice/assign", function(request, response) {
    if(request.session.isTechnician) {
        const idAvi = request.body.idAvi;
        const idTec = request.body.idTec;
        daoAvi.setTechnicianNotify(idAvi, idTec, 
            function(err, techList) {
                if(err) response.send(false);
                else response.send(true);
            }
        );
    }
    else response.send(false);
});

// Cerrar aviso (mostrar)
app.get("/notice/close/:idAvi", (request, response) => {
    if(request.session.isTechnician) {
        daoAvi.getNotify(request.params.idAvi,
            function(err, aviso) {
                if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha encontrado el aviso solicitado en la BD.", stack: null });
                else {
                    daoUsu.getUser(aviso.idUsu,
                        function(err, usuario) {
                            if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha encontrado el usuario del aviso solicitado en la BD.", stack: null });
                            else {
                                if(aviso.idTec === null) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "El aviso solicitado no está asignado.", stack: null });
                                else {
                                    if(request.session.iduser !== aviso.idTec) response.render("error_modal", { code: 500, status: "Forbidden", message: "Permiso denegado. El aviso solicitado está asignado a otro técnico.", stack: null });
                                    else {
                                        daoTec.getTechnicianName(aviso.idTec , 
                                            function(err, nombreTec) {
                                                if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha podido recuperar el nombre del técnico asignado al aviso solicitado.", stack: null });
                                                else response.render("notice", { mode: "close", user: usuario.nombre, profile: util.toProfileText(usuario.perfil, true), notify: util.toModalHtmlNotify(aviso), technician: nombreTec });
                                            }
                                        );
                                    }                             
                                }
                            }
                        }
                    );
                }
            }
        )
    }
    else response.render("error_modal", { code: 500, status: "Forbidden", message: "Permiso denegado. No tiene permiso para realizar esta acción.", stack: null });
});

// Cerrar aviso (recibir formulario)
app.post("/notice/close", function(request, response) {
    if(request.session.isTechnician) {
        const idAvi = request.body.idAvi;
        const comment = request.body.comment;
        daoAvi.closeNotify(idAvi, request.session.iduser, comment,
            function(err, result) {
                if(err) response.send(false);
                else response.send(true);
            }
        );
    }
    else response.send(false);
});

// Borrar aviso (mostrar)
app.get("/notice/cancel/:idAvi", (request, response) => {
    if(request.session.isTechnician) {
        daoAvi.getNotify(request.params.idAvi,
            function(err, aviso) {
                if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha encontrado el aviso solicitado en la BD.", stack: null });
                else {
                    daoUsu.getUser(aviso.idUsu,
                        function(err, usuario) {
                            if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha encontrado el usuario del aviso solicitado en la BD.", stack: null });
                            else {
                                if(aviso.idTec === null) response.render("notice", { mode: "cancel", user: usuario.nombre, profile: util.toProfileText(usuario.perfil, true), notify: util.toModalHtmlNotify(aviso), technician: null });
                                else {
                                    if(request.session.iduser !== aviso.idTec) response.render("error_modal", { code: 500, status: "Forbidden", message: "Permiso denegado. El aviso solicitado está asignado a otro técnico.", stack: null });
                                    else {
                                        daoTec.getTechnicianName(aviso.idTec , 
                                            function(err, nombreTec) {
                                                if(err) response.render("error_modal", { code: 500, status: "Internal Server Error", message: "No se ha podido recuperar el nombre del técnico asignado al aviso solicitado.", stack: null });
                                                else response.render("notice", { mode: "cancel", user: usuario.nombre, profile: util.toProfileText(usuario.perfil, true), notify: util.toModalHtmlNotify(aviso), technician: nombreTec });
                                            }
                                        );
                                    }                             
                                }
                            }
                        }
                    );
                }
            }
        )
    }
    else response.render("error_modal", { code: 500, status: "Forbidden", message: "Permiso denegado. No tiene permiso para realizar esta acción.", stack: null });
});

// Borrar aviso (recibir formulario)
app.post("/notice/cancel", function(request, response) {
    if(request.session.isTechnician) {
        const idAvi = request.body.idAvi;
        const comment = request.body.comment;
        daoAvi.cancelNotify(idAvi, request.session.iduser, comment,
            function(err, result) {
                if(err) response.send(false);
                else response.send(true);
            }
        );
    }
    else response.send(false);
});

// Logout
app.get("/logout", (request, response) => {
    response.status(200);
    request.session.destroy();
    response.redirect("/");
});

// Uso de un middleware para la gestion de errores 404 (Not Found)
app.use((request, response) => {
    response.status(404);
    response.render("error", { code: 404, status: "Not Found", message: "La página solicitada (" + request.url + ") no existe.", stack: null });
});

// Uso de un middleware de error para la gestion de errores 500 (Internal Server Error)
app.use((error, request, response, next) => {
    response.status(500);
    let msg;
    let stus;
    let stck;
    if(error.status === undefined || error.status === null || error.status === "") stus = "Internal Server Error";
    else stus = error.status;
    if(error.message === undefined || error.message === null || error.message === "") msg = "Se ha producido un error inesperado en el servidor.";
    else msg = error.message;
    if(error.stack === undefined || error.stack === null || error.stack === "") stck = null;
    else stck = error.stack;
    response.render("error", { code: 500, status: stus, message: msg, stack: stck });
});

// Escuchar peticiones
app.listen(3000, function(err){
    if(err){
        console.error("No se pudo iniciar el servidor: " + err.message );
    } else {
        console.log("Servidor arrancado en el puerto 3000")
    }
});

daoGen.testDB();
