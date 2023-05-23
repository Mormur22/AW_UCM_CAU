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
     * Crea un nuevo aviso en la BD.
     * @param aviso Objeto con los datos del nuevo aviso a insertar en la tabla UCM_AW_CAU_AVI_Avisos de la BD.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Boolean result).
     * Ejecuta la consulta "INSERT INTO UCM_AW_CAU_AVI_Avisos (tipo, categoria, subcategoria, fecha, observaciones, cerrado, cancelado, idUsu) VALUES ($tipo, $categoria, $subcategoria, $fecha, $observaciones, $cerrado, $cancelado, $idUsu);".
     */
    createNotify(aviso, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), false);
                else {
                    let fecha =new Date().toISOString().replace('T', ' ').substring(0, 19);
                    if(aviso.subcategoria === "NULL"){
                        connection.query("INSERT INTO UCM_AW_CAU_AVI_Avisos (tipo, categoria, subcategoria, fecha, observaciones, cerrado, cancelado, idUsu) VALUES (?, ?, NULL, ?, ?, ?, ?, ?);", 
                            [aviso.tipo, aviso.categoria, fecha, aviso.observaciones, 0, 0, aviso.idUsu],
                            function(err, rows) {
                                connection.release();
                                if(err) callback(new Error("No se ha podido crear el aviso"), false);
                                else callback(null, true);
                            }
                        );
                    }
                    else {
                        connection.query("INSERT INTO UCM_AW_CAU_AVI_Avisos (tipo, categoria, subcategoria, fecha, observaciones, cerrado, cancelado, idUsu) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", 
                            [aviso.tipo, aviso.categoria, aviso.subcategoria, fecha, aviso.observaciones, 0, 0, aviso.idUsu],
                            function(err, rows) {
                                connection.release();
                                if(err) callback(new Error("No se ha podido crear el aviso"), false);
                                else callback(null, true);
                            }
                        );
                    }
                }
            }
        );
    }

    /**
     * Asigna un técnico a un aviso.
     * @param idAvi El id del aviso al que se le quiere asignar un técnico.
     * @param idTec El id del técnico que se le quiere asignar el aviso.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Boolean result).
     * Ejecuta la consulta "UPDATE UCM_AW_CAU_AVI_Avisos SET idTec = $idTec WHERE idAvi = $idAvi;".
     */
    setTechnicianNotify(idAvi, idTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), false);
                else {
                    connection.query("UPDATE UCM_AW_CAU_AVI_Avisos SET idTec = ? WHERE idAvi = ?;", [idTec, idAvi],
                        function(err, rows) {
                            connection.release();
                            if(rows.affectedRows != 1) {
                                if(rows.affectedRows == 0) callback(new Error("Error al intentar asignar al técnico (idAvi=" + idAvi + " no encontrado)."), false);
                                else callback(new Error("Error al intentar asignar al técnico (" + rows.affectedRows + " filas modificadas)."), false);
                            }
                            else{
                                if(err) callback(new Error("No se ha podido asignar al técnico al avisos solicitado (idAvi=" + idAvi + ", idTec=" + idTec + ")."), false);
                                else callback(null, true);
                            }
                        }
                    );
                }
            }
        );
    }

    /**
     * Asigna el comentarioo del técnico a un aviso y lo cierra.
     * @param idAvi El id del aviso al que se le quiere asignar el comentario del técnico.
     * @param idTec El id del técnico cuyo comentario se quiere asignar al aviso.
     * @param comment El comentario que se quiere asignar al aviso.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Boolean result).
     * Ejecuta la consulta "UPDATE UCM_AW_CAU_AVI_Avisos SET comentario = $comentario, cerrado = 1 WHERE idAvi = $idAvi;".
     */
    closeNotify(idAvi, idTec, comment, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), false);
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idAvi = ?;", [idAvi],
                        function(err, rows) { 
                            if(err){
                                connection.release();  
                                callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_AVI_Avisos"), false);
                            }
                            else{
                                if(rows.length === 0) {
                                    connection.release();  
                                    callback(new Error("No se ha encontrado ningún aviso con idAvi = " + idAvi), false);
                                }
                                else{
                                    const aviso = rows[0];
                                    if(aviso.idTec === null) { 
                                        connection.release();
                                        callback(new Error("El aviso con idAvi = " + idAvi + " no está asignado a ningún técnico"), false);
                                    }
                                    else {
                                        if(aviso.idTec !== idTec) {
                                            connection.release();
                                            callback(new Error("El aviso con idAvi = " + idAvi + " está asignado a otro técnico con idTec = " + aviso.idTec + ", sin embargo la solicitud se ha hecho para el técnico con idTec = " + idTec), false);
                                        }
                                        else {
                                            if(aviso.cerrado === 1) {
                                                connection.release();
                                                callback(new Error("El aviso con idAvi = " + idAvi + " ya está cerrado"), false);
                                            }
                                            else {
                                                if(aviso.cancelado === 1) {
                                                    connection.release();
                                                    callback(new Error("El aviso con idAvi = " + idAvi + " está cancelado"), false);
                                                }
                                                else {
                                                    connection.query("UPDATE UCM_AW_CAU_AVI_Avisos SET comentario = ?, cerrado = 1 WHERE idAvi = ?;", [comment, idAvi],
                                                        function(err, rows) {
                                                            connection.release();
                                                            if(rows.affectedRows != 1) {
                                                                if(rows.affectedRows == 0) callback(new Error("Error al intentar asignar el comentario dal técnico (idAvi=" + idAvi + " no encontrado)."), false);
                                                                else callback(new Error("Error al intentar asignar el comentario dal técnico (" + rows.affectedRows  +" filas modificadas)."), false);
                                                            }
                                                            else{
                                                                if(err) callback(new Error("No se ha podido asignar el comentario del técnico al avisos solicitado (idAvi=" + idAvi + ", idTec=" + idTec + ")."), false);
                                                                else callback(null, true);
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    );
                }
            }
        );
    }

    /**
     * Devuelve un aviso.
     * @param idAvi El id del aviso cuyos datos se quieren obtener.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Aviso result).
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idAvi = $idAvi;".
     */
    getNotify(idAvi, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idAvi = ?;", [idAvi],
                        function(err, rows) {
                            connection.release();  
                            if(err) callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_AVI_Avisos"), null);
                            else{
                                if(rows.length === 0) callback(new Error("No se ha encontrado ningún aviso con idAvi = " + idAvi), null);
                                else callback(null, rows[0]);
                            }
                        }
                    );
                }
            }
        )
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
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
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
     * @param myIdUsu El id del usuario estándar que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } + TEC.nombre .
     * Ejecuta la consulta "SELECT AVI.idAvi, AVI.tipo, AVI.categoria, AVI.subcategoria, AVI.fecha, AVI.observaciones, AVI.comentario, AVI.cerrado, AVI.cancelado, AVI.idUsu, AVI.idTec FROM UCM_AW_CAU_AVI_Avisos AVI WHERE AVI.cerrado = 0 AND AVI.cancelado = 0 AND AVI.idUsu = $idUsu;".
     */
    getUserOpenNotifies(myIdUsu, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT AVI.idAvi, AVI.tipo, AVI.categoria, AVI.subcategoria, AVI.fecha, AVI.observaciones, AVI.comentario, AVI.cerrado, AVI.cancelado, AVI.idUsu, AVI.idTec, TEC.nombre FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN UCM_AW_CAU_TEC_Tecnicos TEC ON AVI.idTec = TEC.idTec WHERE AVI.cerrado = 0 AND AVI.cancelado = 0 AND AVI.idUsu = ?;", [myIdUsu],
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
     * Devuelve los avisos abiertos de un técnico.
     * @param myIdTec El id del técnico que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 0 AND cancelado = 0 AND idTec = $idTec;".
     */
    getTechnicianOpenNotifies(myIdTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
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

    /**
     * Devuelve los avisos cerrados de un usuario estándar.
     * @param myIdUsu El id del usuario estándar que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE cerrado = 1 AND cancelado = 0 AND idUsu = $idUsu;".
     */
    getUserClosedNotifies(myIdUsu, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
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
     * Devuelve los avisos cerrados de un técnico.
     * @param myIdTec El id del técnico que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE (cerrado = 1 OR cancelado = 1) AND idTec = $idTec;".
     */
    getTechnicianClosedNotifies(myIdTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
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

    /**
     * Devuelve los avisos de un usuario estándar.
     * @param myIdUsu El id del usuario estándar que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idUsu = $idUsu;".
     */
    getUserAllNotifies(myIdUsu, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
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
     * Devuelve los avisos de un técnico.
     * @param myIdTec El id del técnico que está usando la applicaión.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, [Aviso , ... , Aviso] result) .
     * Aviso = { idAvi: Number, tipo: String, categoria: String, subcategoria: String, fecha: Date, observaciones: String, comentario: String, cerrado: Boolean, cancelado: Boolean, idUsu: Number, idTec: Number } .
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idTec = $idTec;".
     */
    getTechnicianAllNotifies(myIdTec, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idTec = ?;", [myIdTec],
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