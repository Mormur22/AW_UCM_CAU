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

    createNotify(aviso,callback){
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    let fecha =new Date().toISOString().replace('T', ' ').substr(0, 19);
                    connection.query("INSERT INTO UCM_AW_CAU_AVI_Avisos (tipo, categoria, subcategoria, fecha, observaciones, cerrado, cancelado, idUsu) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", 
                    [aviso.tipo, aviso.categoria, aviso.subcategoria, fecha, aviso.observaciones, 0, 0, aviso.idUsu],
                        function(err, rows) {
                            connection.release();
                            if(err) callback(new Error("No se ha podido crear el aviso"), null);
                            else callback(null, rows[0].idAvi);
                        }
                    );
                }
            }
        );
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
     * Devuelve los avisos abiertos de un usuario estándar.
     * @param myIdUsu El id del usuarioa estándar que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } + TEC.nombre .
     * Ejecuta la consulta "SELECT AVI.idAvi, AVI.tipo, AVI.categoria, AVI.subcategoria, AVI.fecha, AVI.observaciones, AVI.comentario, AVI.cerrado, AVI.cancelado, AVI.idUsu, AVI.idTec, TEC.nombre FROM UCM_AW_CAU_AVI_Avisos AVI JOIN UCM_AW_CAU_TEC_Tecnicos TEC ON AVI.idTec = TEC.idTec WHERE AVI.cerrado = 0 AND AVI.cancelado = 0 AND AVI.idUsu = $idUsu;"
     */
    getUserOpenNotifies(myIdUsu, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    connection.query("SELECT AVI.idAvi, AVI.tipo, AVI.categoria, AVI.subcategoria, AVI.fecha, AVI.observaciones, AVI.comentario, AVI.cerrado, AVI.cancelado, AVI.idUsu, AVI.idTec, TEC.nombre FROM UCM_AW_CAU_AVI_Avisos AVI JOIN UCM_AW_CAU_TEC_Tecnicos TEC ON AVI.idTec = TEC.idTec WHERE AVI.cerrado = 0 AND AVI.cancelado = 0 AND AVI.idUsu = ?;", [myIdUsu],
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
    getTechnicianOpenNotifies(myIdTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
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

    getTechnicianAllNotifies(myIdTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    connection.query("SELECT tipo FROM UCM_AW_CAU_AVI_Avisos WHERE idTec = ?;", [myIdTec],
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

    getUserAllNotifies(myIdUsu, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idUsu = ?;", [myIdUsu],
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
     * Devuelve los avisos cerrados de un usuario estándar.
     * @param myIdUsu El id del usuarioa estándar que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 1 AND cancelado = 0 AND idUsu = $idUsu;"
     */
    getUserClosedNotifies(myIdUsu, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 1 AND cancelado = 0 AND idUsu = ?;", [myIdUsu],
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
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE (cerrado = 1 OR cancelado = 1) AND idTec = $idTec;"
     */
    getTechnicianClosedNotifies(myIdTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE (cerrado = 1 OR cancelado = 1) AND idTec = ?;", [myIdTec],
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