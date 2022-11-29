/* APLICACIONES WEB. Práctica obligatoria: UCM-CAU - El Centro de Atencion a Usuarios. Grupo 33: Daniel Compán López de Lacalle y Alejandro Moreno Murillo */

"use strict";

const path = require("path");  // core module
const express = require("express");  // package module (npm install express --save)
const mysql = require("mysql");  // Package Module (npm install mysql --save)
const dbConfig = require("./config.js");  // File Module
const DAO = require("./DAO.js");  // File Module

// Ejemplo de objeto devuelto por la BD al consultar la tabla técnico
const tecnico = {
    idTec: 1,
    email: "aortiz@ucm.es",
    password: "letmein",
    nombre: "Alexander Ortiz",
    perfil: "pas",
    imagen: "aortiz.jpg",
    desactivado: 0,
    numEmp: "4678-dfs"
};

// Ejemplo de objeto con los datos que nos interesan del usuario que utiliza la aplicación (ya sea tecnico u usuario normal)
// Estos datos deben estar presentes en la sesion una vez que el usuario ha hecho login
const user_data = {
    id: tecnico.idTec,
    name: tecnico.nombre,
    profile: tecnico.perfil,
    imageURL: tecnico.imagen == undefined || tecnico.imagen == "null" ? "\\img\\avatars\\default.jpg" : "\\img\\avatars\\" + tecnico.imagen,
    isTechnician: true
}
// Tengase en cuenta que las consultas devuelven "null" como texto.
// De todas formas, primera condicion devuelve 'true' para 'null' al estar hecha intencionadamente con == en vez de ===

// Creación de la aplicación express
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

app.get("/main.html", function(request, response) {
    response.status(200);
    response.render("main", { userData: user_data });
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