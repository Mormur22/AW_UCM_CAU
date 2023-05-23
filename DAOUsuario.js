"use strict";

/**
 * Clase que implementa la funcionalidad relacionada con la gestión de usuarios en la BD.
 */
class DAO_Usuario {

    /**
     * Constrictor de la clase 'DAO'.
     * Crea un objeto con los métodos necesarios para realizar las operaciones de gestión de usuarios estándar en la BD.
     * @param pool Pool de conexiones que se usará para conectarse a la BD.
     */
    constructor(pool) {
        this.pool = pool;
    }
    
    /**
     * Método que comprueba si existe un nombre de usuario en la BD.
     * @param nombre Nombre de usuario a comprobar.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Boolean result).
     * Ejecuta la consulta: "SELECT * FROM UCM_AW_CAU_USU_Usuarios where nombre = $nombre;".
     */
    existeNombreUsuario(nombre, callback){
        this.pool.getConnection(function(err,connection){
            if(err) callback(new Error("Error de conexión a la base de datos"), false);
            else {
                const existeName = "SELECT * FROM UCM_AW_CAU_USU_Usuarios where nombre = ?;";
                connection.query(existeName,[nombre],
                function(err, result){
                    connection.release();
                    if(err) callback(new Error("Error de acceso a la base de datos"), false);
                    else{
                        if (result.length==0) callback(null, false);
                        else callback(null, true);
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
    existeCorreoUsuario(correo, callback){
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
                    if(err) callback(new Error("Error de acceso a la base de datos"));
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
                const valor="INSERT INTO UCM_AW_CAU_USU_Usuarios (nombre,fecha,email, password,perfil,desactivado,reputacion,imagen) VALUES (?,?,?,?,?,?,?,?);";
                connection.query(valor,[usuario.username,fecha, usuario.correo, usuario.password,usuario.perfil,false,0,img],
                function(err2, result2){
                    connection.release();
                    if(err2) callback(new Error("Error de acceso a la base de datos"));
                    else{     
                        if(result2.affectedRows) callback(null,result2.insertId);
                        else callback(null,false);
                    }
                });
            }
        });
    }

    
    loginUsuario(email, password, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query("SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE email = ? AND password= ?;" ,
                    [email,password],
                    function(err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (rows.length === 0) callback(null,false); //no está el usuario con el password proporcionado
                            else callback(null,rows[0]);
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
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (rows.length === 0) callback(null,false); //no está el usuario con el password proporcionado
                        else callback(null,rows[0].imagen);
                    }
            });
        }
        });
    }

    /**
     * Devuelve los datos de un usuario.
     * @param idUsu El id del usuario cuyos datos se quieren obtener.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Usuario result) .
     * Usuario = { idUsu: Number, email: String, password: String, nombre: String, perfil: String, imagen: String, desactivado: Boolean, reputacion: Number } .
     * Ejecuta la consulta: "SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE idUsu = $idUsu;".
     */
    getUser(idUsu, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE idUsu = ?;", [idUsu],
                        function(err, rows) {
                            connection.release();
                            if(err) callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_USU_Usuarios"), null);
                            else{
                                if(rows.length === 0) callback(new Error("No se ha encontrado ningún usuario con idUsu = " + idUsu), null);
                                else callback(null, rows[0]);
                            }
                        }
                    );
                }
            }
        );
    }    
    
    /**
     * Devuelve todos los usuarios estándar.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Usuario , ... , Usuario] result) .
     * Usuario = { idUsu: Number, email: String, password: String, nombre: String, perfil: String, imagen: String, desactivado: Boolean, reputacion: Number } .
     * Ejecuta la consulta: "SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE desactivado = 0;".
     */
    getAllUsers(callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE desactivado = 0;", [],
                        function(err, rows) {
                            connection.release();
                            if(err) callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_USU_Usuarios"), null);
                            else callback(null, rows);
                        }
                    );
                }
            }
        );
    }
    
    /**
     * Desactiva la cuenta de un usuario estándar.
     * @param idUsu El id del usuario cuya cuenta se quiere desactivar. 
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Boolean result) .
     * Ejecuta la consulta: "UPDATE UCM_AW_CAU_USU_Usuarios SET desactivado = 1 WHERE idUsu = $idUsu;".
     */
    cancelUser(idUsu, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), false);
                else {
                    connection.query("UPDATE UCM_AW_CAU_USU_Usuarios SET desactivado = 1 WHERE idUsu = ?;", [idUsu],
                        function(err, rows) {
                            if(rows.affectedRows != 1) {
                                connection.release();
                                if(rows.affectedRows == 0) callback(new Error("Error al intentar desactivar el usuario estándar (idUsu="+idUsu+" no encontrado)."), false);
                                else callback(new Error("Error al intentar desactivar el usuario estándar ("+rows.affectedRows+" filas modificadas)."), false);
                            }
                            else{
                                connection.query("UPDATE UCM_AW_CAU_AVI_Avisos SET idUsu = NULL WHERE idUsu = ?;", [idUsu],
                                    function(err, rows) {
                                        connection.release();
                                        if(err) callback(new Error("No se ha podido modificar los avisos del usuario estándar (idUsu="+idUsu+")."), false);
                                        else callback(null, true);
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    }

}

module.exports = DAO_Usuario;