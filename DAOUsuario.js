"use strict";

/**
 * Clase que implementa la funcionalidad relacionada con la gestión de usuarios en la BD.
 */
class DAO_Usuario {

    /**
     * Constrictor de la clase 'DAO'.
     * Crea un objeto con los métodos necesarios para realizar las operaciones de gestión en la BD.
     * @param pool Pool de conexiones que se usará para conectarse a la BD.
     */
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Método que comprueba la conexión a la base de datos.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Boolean result).
     * result = 'true' si ha podido conectarse. 'false' si no.
    */
    testConnection(callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    // Devolver la conexión al pool y llamar a la función de callback cone éxito
                    connection.release();
                    callback(null, true);
                }
            }
        );
    }
    
    /**
     * Método que comprueba las tablas de la base de datos.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, String result).
     * result: Cadena de texto con información del número de filas en cada tabla.
     */
    existeNombreUsuario(nombre,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                reject(new Error("Error de conexión a la base de datos"));
            }
            else{
                const existeName = "SELECT * FROM UCM_AW_CAU_USU_Usuarios where nombre = ?;";
                connection.query(existeName,[nombre],
                function(err, result){
                    connection.release();
                    if(err){
                        console.log("ERROR: "+err.message);
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        if (result.length==1) callback(null,true);
                        else callback(null,false);
                    }
                });
            }
        });
    }


    /*
    Comprueba que no E un correo en la base de datos
    True --> El usuario/correo existe
    False --> No Existe
    */
    existeCorreoUsuario(correo,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                //El usuario no existe
                const existeName = "SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE email= ?;";
                connection.query(existeName,[correo],
                    function(err, result2){
                    connection.release();
                    if(err){
                        console.log("ERROR: "+err.message);
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        if (result2.length==1) callback(new Error("El correo ya está registrado"), true);
                        else callback(null,false);
                    }
                });
            }
        });
    }


    registroUsuario(usuario,img, callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                 callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                let fecha =new Date().toISOString().replace('T', ' ').substr(0, 19);
                console.log("Datos registro usuario: "+usuario.nombre+" "+usuario.correo+" "+usuario.pass); 
                const valor="INSERT INTO UCM_AW_CAU_USU_Usuarios (nombre,fecha,email, password,perfil,desactivado,reputacion,imagen) VALUES (?,?,?,?,?,?,?,?);";
                console.log(valor);
                connection.query(valor,[usuario.username,fecha, usuario.correo, usuario.password,usuario.perfil,false,0,img],
                function(err2, result2){
                    connection.release(); //devolver el pool de conexiones.
                    if(err2){
                        console.log("ERROR: "+err2.message);
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{     
                        if(result2.affectedRows) callback(null,result2.insertId);
                        else callback(null,false);
                    }
                });
            }
        });
    }

    
    loginUsuario(email, password,callback) {
        //console.log("DAO "+email+" "+password);
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                //console.log("Datos log usuario: "+ email +" "+ password);
                // connection.query('USE back2study;');
                connection.query("SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE email = ? AND password= ?;" ,
                    [email,password],
                    function(err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            console.log(rows);
                            if (rows.length === 0) {
                                callback(null,false); //no está el usuario con el password proporcionado
                            }
                            else {
                                // console.log("DATOS DAO: "+rows[0].id+"/"+rows[0].username+"/"+rows[0].email+"/"+rows[0].password);
                                callback(null,rows[0]);
                            }
                        }
                    }
                );
            }
        });
    }

    obtenerImagen(id, callback) {
        this.pool.getConnection(function(err, connection) {
        if (err)
            callback(err);
        else {
                let sql = "SELECT imagen FROM UCM_AW_CAU_USU_Usuarios  WHERE idUsu = ?";
                connection.query(sql, [id], function(err, rows) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        console.log(rows);
                        if (rows.length === 0) {
                            callback(null,false); //no está el usuario con el password proporcionado
                        }
                        else {
                            console.log(rows);
                            // console.log("DATOS DAO: "+rows[0].id+"/"+rows[0].username+"/"+rows[0].email+"/"+rows[0].password);
                            callback(null,rows[0].imagen);
                        }
                    }
            });
        }
        });
    }
    
    /**
     * Devuelve todos los usuarios estándar.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Usuario , ... , Usuario] result) .
     * Usuario = { idUsu: Number, email: String, password: String, nombre: String, perfil: String, imagen: String, desactivado: Boolean, reputacion: Number } .
     * Ejecuta la consulta: "SELECT * FROM UCM_AW_CAU_USU_Usuarios;".
     */
    getAllUsers(callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_USU_Usuarios;", [],
                        function(err, rows) {
                            connection.release();
                            if(err) callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_TEC_Tecnicos"), null);
                            else callback(null, rows);
                        }
                    );
                }
            }
        );
    }
    
}

module.exports = DAO_Usuario;