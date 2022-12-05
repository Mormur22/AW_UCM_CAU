/* APLICACIONES WEB. Práctica obligatoria: UCM-CAU - El Centro de Atencion a Usuarios. Grupo 33: Daniel Compán López de Lacalle y Alejandro Moreno Murillo */

"use strict";

const path = require("path");  // core module
const express = require("express");  // package module (npm install express --save)
const mysql = require("mysql");  // Package module (npm install mysql --save)
const dbConfig = require("./config.js");  // File module
const DAO = require("./DAO.js");  // File module
const Util = require("./util.js"); // File Module
const Hardcode = require("./hardcode.js"); // File Module


// Crear un objeto Util
const util = new Util();

// Crear un objeto Hardcode
const hardcode = new Hardcode();

const user_data = hardcode.tecnico1_session();
const avisos_BD = hardcode.avisos_DB();
const notifies_data = hardcode.avisos_HTML();

// Creación de la aplicación express
const app = express();

// Establecer el motor de plantillas
app.set("view engine","ejs");  // package module (npm install ejs --save)

// Establecer el directorio de plantillas
app.set("views",path.join(__dirname,"views"));

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig.mysqlConfig);

// Crear un objeto DAO
let dao = new DAO(pool);

app.get("/", function(request, response) {
    response.redirect("/index.html");
});

app.get("/index.html", function(request, response) {
    response. sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/main.html", function(request, response) {
    response.status(200);
    response.render("main", { userData: user_data });
});

app.get("/tables/notifies", function(request, response) {
    response.status(200);
    response.render("notifies", { rows: avisos_BD.map( a => util.toTechnicianHtmlNotify(a, user_data.idTec) ) });
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

// Definición de las funciones callback
// ...

dao.testDB();