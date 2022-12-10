"use strict";

/**
 * Clase que implementa la funcionalidad relacionada con la gestión de avisos en la BD.
 */
class DAO_Aviso {

    /**
     * Constrictor de la clase 'DAO_Aviso'.
     * Crea un objeto con los métodos necesarios para realizar las operaciones de gestión de avisos en la BD.
     * @param pool Pool de conexiones que se usará para conectarse a la BD.
     */
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Devuelve los avisos abiertos.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result).
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 0 AND cancelado = 0;".
     */
    getOpenNotifies(callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    //connection.query("SELECT idAvi, tipo, categoria, subcategoria, date_format(fecha,'%d/%m/%Y') AS fecha, observaciones, comentario, cerrado, cancelado, idUsu, idTec FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 0 AND cancelado = 0;", [],
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 0 AND cancelado = 0;", [],
                        function(err, rows) {
                            connection.release();
                            if(err) callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_AVI_Avisos"), null);
                            else callback(null, rows);
                        }
                    );
                }
            }
        );
    }

    /**
     * Devuelve los avisos abiertos de un tecnico.
     * @param myIdTec El id del técnico que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 0 AND cancelado = 0 AND idTec = $idTec;"
     */
     getMyOpenNotifies(myIdTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    //connection.query("SELECT idAvi, tipo, categoria, subcategoria, date_format(fecha,'%d/%m/%Y') AS fecha, observaciones, comentario, cerrado, cancelado, idUsu, idTec FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 0 AND cancelado = 0 AND idTec = ?;", [myIdTec],
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 0 AND cancelado = 0 AND idTec = ?;", [myIdTec],
                        function(err, rows) {
                            connection.release();
                            if(err) callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_AVI_Avisos"), null);
                            else callback(null, rows);
                        }
                    );
                }
            }
        );
    }    
    
    /**
     * Devuelve los avisos cerrados de un tecnico.
     * @param myIdTec El id del técnico que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE (cerrado = 1 OR cancelado = 0) AND idTec = $idTec;"
     */
    getMyClosedNotifies(myIdTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    //connection.query("SELECT idAvi, tipo, categoria, subcategoria, date_format(fecha,'%d/%m/%Y') AS fecha, observaciones, comentario, cerrado, cancelado, idUsu, idTec FROM UCM_AW_CAU_AVI_Avisos WHERE (cerrado = 1 OR cancelado = 0) AND idTec = ?;", [myIdTec],
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE (cerrado = 1 OR cancelado = 0) AND idTec = ?;", [myIdTec],
                        function(err, rows) {
                            connection.release();
                            if(err) callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_AVI_Avisos"), null);
                            else callback(null, rows);
                        }
                    );
                }
            }
        );
    }    

}

module.exports = DAO_Aviso;