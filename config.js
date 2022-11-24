"use strict"

/* Datos de conexión a la BD local */
const localDB = {
    mysqlConfig:  {
        host: "localhost",      // Ordenador que ejecuta el SGBD
        user: "root",           // Usuario que accede a la BD
        password: "",           // Contraseña con la que se accede a la BD
        database: "UCM_AW_CAU"  // Nombre de la base de datos
    },
    port: 3306
};

/* Datos de conexión a la BD externa */
const externalDB = {
    mysqlConfig:  {
        host:"aw-db.cilmfqfwy9bi.eu-west-3.rds.amazonaws.com",
        user:"admin",
        password: "Adminucm22",
        database:"UCM_AW_CAU"
    },
    puerto: 3306
};

module.exports = externalDB;
