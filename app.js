/* APLICACIONES WEB. Práctica obligatoria: UCM-CAU - El Centro de Atencion a Usuarios. Grupo 33: Daniel Compán López de Lacalle y Alejandro Moreno Murillo */

"use strict";

const path = require("path");  // core module
const express = require("express");  // package module (npm install express --save)
const mysql = require("mysql");  // Package Module (npm install mysql --save)
const dbConfig = require("./config.js");  // File Module
const DAO = require("./DAO.js");  // File Module

const app = express();

// Establecer el motor de plantillas
app.set("view engine","ejs");  // package module (npm install ejs --save)

// Establecer el directorio de plantillas
app.set("views",path.join(__dirname,"views"));

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig.mysqlConfig);

// Crear el objeto DAO
let dao = new DAO(pool);

app.get("/", function(request, response) {
    response.redirect("/index.html");
});

app.get("/index.html", function(request, response) {
    response. sendFile(path.join(__dirname, "public", "index.html"));
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
