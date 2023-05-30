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
     * Asigna el comentario del técnico a un aviso y lo cierra.
     * @param idAvi El id del aviso al que se le quiere asignar el comentario del técnico y cerrar.
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
                                                                if(rows.affectedRows == 0) callback(new Error("Error al intentar asignar el comentario dal técnico y cerrar el aviso solicitado (idAvi=" + idAvi + " no encontrado)."), false);
                                                                else callback(new Error("Error al intentar asignar el comentario dal técnico y cerrar el aviso solicitado (" + rows.affectedRows  +" filas modificadas)."), false);
                                                            }
                                                            else{
                                                                if(err) callback(new Error("No se ha podido asignar el comentario del técnico y cerrar el aviso solicitado (idAvi=" + idAvi + ", idTec=" + idTec + ")."), false);
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
     * Asigna el comentario del técnico a un aviso y lo cancela.
     * @param idAvi El id del aviso al que se le quiere asignar el comentario del técnico y cancelar.
     * @param idTec El id del técnico cuyo comentario se quiere asignar al aviso.
     * @param comment El comentario que se quiere asignar al aviso.
     * @param callback Función de callback que gestiona los casos de error y éxito. Parámetros de entrada: (Error err, Boolean result).
     * Ejecuta la consulta "UPDATE UCM_AW_CAU_AVI_Avisos SET comentario = $comentario, cancelado = 1, idTec = $idTec WHERE idAvi = &idAvi;".
     */
    cancelNotify(idAvi, idTec, comment, callback) {
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
                                    if(aviso.idTec !== null && aviso.idTec !== idTec) {
                                        connection.release();
                                        callback(new Error("El aviso con idAvi = " + idAvi + " está asignado a otro técnico con idTec = " + aviso.idTec + ", sin embargo la solicitud se ha hecho para el técnico con idTec = " + idTec), false);
                                    }
                                    else {
                                        if(aviso.cerrado === 1) {
                                            connection.release();
                                            callback(new Error("El aviso con idAvi = " + idAvi + " está cerrado"), false);
                                        }
                                        else {
                                            if(aviso.cancelado === 1) {
                                                connection.release();
                                                callback(new Error("El aviso con idAvi = " + idAvi + " ya está cancelado"), false);
                                            }
                                            else {
                                                connection.query("SELECT nombre FROM UCM_AW_CAU_TEC_Tecnicos WHERE idTec = ?;", [idTec],
                                                    function(err, rows) {
                                                        if(err) callback(new Error("No se ha podido recuperar los datos del técnico de la tabla UCM_AW_CAU_TEC_Tecnicos"), null);
                                                        else{
                                                            if(rows.length === 0) callback(new Error("No se ha encontrado ningún técnico con idTec = " + idTec), null);
                                                            else{
                                                                const nombre = rows[0].nombre;
                                                                const comentario = "Este aviso ha sido eliminado por el técnico " + nombre + " debido a:\n\n" + comment;
                                                                connection.query("UPDATE UCM_AW_CAU_AVI_Avisos SET comentario = ?, cancelado = 1, idTec = ? WHERE idAvi = ?;", [comentario, idTec, idAvi],
                                                                function(err, rows) {
                                                                        connection.release();
                                                                        if(rows.affectedRows != 1) {
                                                                            if(rows.affectedRows == 0) callback(new Error("Error al intentar asignar el comentario dal técnico y cancelar el aviso solicitado (idAvi=" + idAvi + " no encontrado)."), false);
                                                                            else callback(new Error("Error al intentar asignar el comentario dal técnico y cancelar el aviso solicitado (" + rows.affectedRows  +" filas modificadas)."), false);
                                                                        }
                                                                        else{
                                                                            if(err) callback(new Error("No se ha podido asignar el comentario del técnico y cancelar el aviso solicitado (idAvi=" + idAvi + ", idTec=" + idTec + ")."), false);
                                                                            else callback(null, true);
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        }
                                                    }
                                                );

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
     * Ejecuta la consulta "SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE (cerrado = 1 OR cancelado = 1) AND idUsu = $idUsu;".
     */
    getUserClosedNotifies(myIdUsu, callback) {
        this.pool.getConnection(
            function(err, connection) {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE (cerrado = 1 OR cancelado = 1) AND idUsu = ?;", [myIdUsu],
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

    //busca avisos entrantes por descripción
    buscarAvisoPorDescripcion(descripcion, callback) {
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"), null);
            else {
                connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE observaciones LIKE ? AND cerrado = 0 AND cancelado = 0", ['%' + descripcion + '%'],
                    (err, rows) => {
                        connection.release();
                        if(err) callback(new Error("Error en la consulta"), null);
                        else callback(null, rows);
                    }
                );
            }
        });
    }

    //busca los avisos abiertos del usuario o tecnico asociado al id que se pasa por parámetro por descripción
    buscarMisAvisosUsuarioPorDescripcion(idUsu, descripcion, callback) {
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"), null);
            else {
                connection.query("SELECT AVI.idAvi, AVI.tipo, AVI.categoria, AVI.subcategoria, AVI.fecha, AVI.observaciones, AVI.comentario, AVI.cerrado, AVI.cancelado, AVI.idUsu, AVI.idTec, TEC.nombre FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN UCM_AW_CAU_TEC_Tecnicos TEC ON AVI.idTec = TEC.idTec WHERE AVI.cerrado = 0 AND AVI.cancelado = 0 AND AVI.idUsu = ? AND AVI.observaciones LIKE ?;", [idUsu, '%' + descripcion + '%'],
                    (err, rows) => {
                        connection.release();
                        if(err) callback(new Error("Error en la consulta"), null);
                        else callback(null, rows);
                    }
                );
            }
        });
    }


    // Busca los avisos abiertos del usuario o tecnico asociado al id que se pasa por parámetro por descripción
    buscarMisAvisosTecnicoPorDescripcion(idTec, descripcion, callback) {
         this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"), null);
            else {
                connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idTec = ? AND observaciones LIKE ? AND cerrado = 0 AND cancelado = 0", [idTec, '%' + descripcion + '%'],
                    (err, rows) => {
                        connection.release();
                        if(err) callback(new Error("Error en la consulta"), null);
                        else callback(null, rows);
                    }
                );
            }
        });
    }

    // Busca los avisos cerrados del historico por descripción
    buscarHistoricoAvisosUsuarioPorDescripcion(idUsu, descripcion, callback) {
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"), null);
            else {
                connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idUsu = ? AND observaciones LIKE ? AND (cerrado = 1 OR cancelado = 1)", [idUsu, '%' + descripcion + '%'],
                    (err, rows) => {
                        connection.release();
                        if(err) callback(new Error("Error en la consulta"), null);
                        else callback(null, rows);
                    }
                );
            }
        });
    }

    buscarHistoricoAvisostecnicoPorDescripcion(idTec, descripcion, callback) {
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"), null);
            else {
                connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idTec = ? AND observaciones LIKE ? AND (cerrado = 1 OR cancelado = 1)", [idTec, '%' + descripcion + '%'],
                    (err, rows) => {
                        connection.release();
                        if(err) callback(new Error("Error en la consulta"), null);
                        else callback(null, rows);
                    }
                );
            }
        });
    }

        // Busca los avisos cerrados del historico por descripción
        buscarTodosAvisosUsuarioPorDescripcion(idUsu, descripcion, callback) {
            this.pool.getConnection((err, connection) => {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idUsu = ? AND observaciones LIKE ?", [idUsu, '%' + descripcion + '%'],
                        (err, rows) => {
                            connection.release();
                            if(err) callback(new Error("Error en la consulta"), null);
                            else callback(null, rows);
                        }
                    );
                }
            });
        }
    
        buscarTodosAvisostecnicoPorDescripcion(descripcion, callback) {
            this.pool.getConnection((err, connection) => {
                if(err) callback(new Error("Error de conexión a la base de datos"), null);
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE observaciones LIKE ?", ['%' + descripcion + '%'],
                        (err, rows) => {
                            connection.release();
                            if(err) callback(new Error("Error en la consulta"), null);
                            else callback(null, rows);
                        }
                    );
                }
            });
        }

}

module.exports = DAO_Aviso;