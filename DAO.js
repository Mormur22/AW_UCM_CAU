"use strict";

/**
 * Clase que implementa la funcionalidad relacionada con la gestión de la BD.
 */
class DAO {

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
    testTables(callback) {
        let str = "Comprobación del estado de la BD:\n";
        this.pool.getConnection(
            function(err, connection) {
                if(err) {
                    callback(new Error("Error de conexión a la base de datos"), false);
                }
                else {
                    connection.query("SELECT * FROM UCM_AW_CAU_EMP_Empleados", [],
                        function(err, rows) {
                            if(err) {
                                connection.release();
                                callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_EMP_Empleados"));
                            }
                            else{
                                str = str + " · " + rows.length + " filas en la tabla UCM_AW_CAU_EMP_Empleados.\n";
                                connection.query("SELECT * FROM UCM_AW_CAU_USU_Usuarios", [],
                                    function(err, rows) {
                                        if(err) {
                                            connection.release();
                                            callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_USU_Usuarios"));
                                        }
                                        else{
                                            str = str + " · " + rows.length + " filas en la tabla UCM_AW_CAU_USU_Usuarios.\n";
                                            connection.query("SELECT * FROM UCM_AW_CAU_TEC_Tecnicos", [],
                                                function(err, rows) {
                                                    if(err) {
                                                        connection.release();
                                                        callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_TEC_Tecnicos"));
                                                    }
                                                    else{
                                                        str = str + " · " + rows.length + " filas en la tabla UCM_AW_CAU_TEC_Tecnicos.\n";
                                                        connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos", [],
                                                            function(err, rows) {
                                                                if(err) {
                                                                    connection.release();
                                                                    callback(new Error("No se ha podido recuperar datos de la tabla UCM_AW_CAU_AVI_Avisos"));
                                                                }
                                                                else{
                                                                    str = str + " · " + rows.length + " filas en la tabla UCM_AW_CAU_AVI_Avisos.\n";
                                                                    // Devolver la conexión al pool y llamar a la función de callback cone éxito
                                                                    connection.release();
                                                                    callback(null, str);
                                                                }
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
                    );
                }
            }
        );     
    }

    /**
     * Método que comprueba la base de datos.
     * Imprime por consola el resultado del test.
     */
    testDB() {
        const thisObj = this;
        thisObj.testConnection(
            function(err, result) {
                if(err) {
                    console.log(err.message);
                } else if(result) {
                    console.log("Conexión a la BD correcta");
                    thisObj.testTables(
                        function(err, result){
                            if(err) {
                                console.log(err.message);
                            } else {
                                console.log(result);
                            }    
                        }
                    );
                }
            }
        );
    }

}

module.exports = DAO;