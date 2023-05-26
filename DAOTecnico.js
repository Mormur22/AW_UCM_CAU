"use strict";

/**
 * Clase que implementa la funcionalidad relacionada con la gestión de técnicos en la BD.
 */
class DAO_Tecnico {

    /**
     * Constrictor de la clase 'DAO_Tecnico'.
     * Crea un objeto con los métodos necesarios para realizar las operaciones de gestión de técnicos en la BD.
     * @param pool Pool de conexiones que se usará para conectarse a la BD.
     */
    constructor(pool) {
        this.pool = pool;
    }

    existeTecnico(nombre,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                reject(new Error("Error de conexión a la base de datos"));
            }
            else{
                const existeName = "SELECT * FROM UCM_AW_CAU_TEC_Tecnicos WHERE nombre = ?;";
                connection.query(existeName,[nombre],
                function(err, result){
                    connection.release();
                    if(err) callback(new Error("Error de acceso a la base de datos"));
                    else{
                        if (result.length==1) callback(new Error("El nombre de usuario ya existe"),true);
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
    existeCorreoTecnico(correo,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                //El usuario no existe
                const existeName = "SELECT * FROM UCM_AW_CAU_TEC_Tecnicos WHERE email= ?;";
                connection.query(existeName,[correo],
                    function(err, result2){
                    connection.release();
                    if(err) callback(new Error("Error de acceso a la base de datos"));
                    else{
                        if (result2.length==1) callback( new Error("El correo ya está registrado"), true);
                        else callback(null, false);
                    }
                });
            }
        });
    }

    existeNumEmpleado(numEmp,callback){
        this.pool.getConnection(function(err,connection){
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else{
                //El usuario no existe
                const existeName = "SELECT * FROM UCM_AW_CAU_EMP_Empleados WHERE numero = ?;";
                connection.query(existeName,[numEmp],
                    function(err, result2){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        if (result2.length==1) callback(null,true);
                        else callback(new Error("El numero de empleado no existe"),false);
                    }
                });
            }
        });
    }
    
    registroTecnico(usuario,img,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                 callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                let fecha =new Date().toISOString().replace('T', ' ').substr(0, 19);
                const valor="INSERT INTO UCM_AW_CAU_TEC_Tecnicos (nombre,fecha,email, password,perfil,desactivado,numEmp,imagen) VALUES (?,?,?,?,?,?,?,?);";
                connection.query(valor,[usuario.username,fecha,usuario.correo, usuario.password,usuario.perfil,false,usuario.numEmp,img],
                function(err2, result2){
                    connection.release(); //devolver el pool de conexiones.
                    if(err2) callback(new Error("Error de acceso a la base de datos"));
                    else{     
                        if(result2.affectedRows) callback(null,result2.insertId);
                        else callback(new Error("Error en el registro de usuario"));
                    }
                });
            }
        });
    }

    
    loginTecnico(email, password,callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM UCM_AW_CAU_TEC_Tecnicos WHERE email = ? AND password= ?;" ,
                    [email,password],
                    function(err, rows) {
                        connection.release(); // devolver al pool la conexión
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
                let sql = "SELECT imagen FROM UCM_AW_CAU_TEC_Tecnicos  WHERE idTec = ?";
                connection.query(sql, [id], function(err, rows) {
                    connection.release(); // devolver al pool la conexión
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

    
    buscarUsuarioPorNombreApellido(nombre, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                const sql = "SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE (nombre LIKE 'Javier%') or (nombre LIKE '%Torres');";
                connection.query(sql, [`%${nombre}%`, `%${nombre}%`], function(err, rows) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        callback(null, rows);
                    }
                });
            }
        });
    }
    
    
    /**
     * Devuelve el nombre de un técnico.
     * @param idTec El id del técnico del que se quiere obtener el nombre.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, String result) .
     * Ejecuta la consulta: "SELECT nombre FROM UCM_AW_CAU_TEC_Tecnicos WHERE idTec = $idTec;".
     */
    getTechnicianName(idTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT nombre FROM UCM_AW_CAU_TEC_Tecnicos WHERE idTec = ?;", [idTec],
                        function(err, rows) {
                            connection.release();  
                            if(err) callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_TEC_Tecnicos"), null);
                            else{
                                if(rows.length === 0) callback(new Error("No se ha encontrado ningún técnico con idTec = " + idTec), null);
                                else callback(null, rows[0].nombre);
                            }
                        }
                    );
                }
            }
        );
    }

    /**
     * Devuelve todos los técnicos.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Tecnico , ... , Tecnico] result) .
     * Tecnico = { idTec: Number, email: String, password: String, nombre: String, perfil: String, imagen: String, desactivado: Boolean, numEmp: String } .
     * Ejecuta la consulta: "SELECT * FROM UCM_AW_CAU_TEC_Tecnicos WHERE desactivado=0;".
     */
    getAllTechnicians(callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_TEC_Tecnicos WHERE desactivado=0;", [],
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

    /**
     * Desactiva la cuenta de un técnico.
     * @param idTec  El id del técnico cuya cuenta se quiere desactivar. 
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Boolean result) .
     * Ejecuta la consulta: "UPDATE UCM_AW_CAU_TEC_Tecnicos SET desactivado = 1 WHERE idTec = $idTec;".
     */
    cancelTechnician(idTec,callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), false);
                else {
                    connection.query("UPDATE UCM_AW_CAU_TEC_Tecnicos SET desactivado = 1 WHERE idTec = ?;", [idTec],
                        function(err, rows) {
                            if(rows.affectedRows != 1) {
                                connection.release();
                                if(rows.affectedRows == 0) callback(new Error("Error al intentar desactivar el técnico (idTec="+idTec+" no encontrado)."), false);
                                else callback(new Error("Error al intentar desactivar el técnico ("+rows.affectedRows+" filas modificadas)."), false);
                            }
                            else{
                                connection.query("UPDATE UCM_AW_CAU_AVI_Avisos SET idTec = NULL WHERE idTec = ?;", [idTec],
                                    function(err, rows) {
                                        connection.release();
                                        if(err) callback(new Error("No se ha podido modificar los avisos del técnico (idTec="+idTec+")."), false);
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

module.exports = DAO_Tecnico;