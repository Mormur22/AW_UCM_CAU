"use strict";

/**
 * Clase que implementa la funcionalidad relacionada con la gestión de la BD.
 */
class DAO_TECNICO {

    /**
     * Constrictor de la clase 'DAO'.
     * Crea un objeto con los métodos necesarios para realizar las operaciones de gestión en la BD.
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
                const existeName = "SELECT * FROM UCM_AW_CAU_TEC_Tecnicos where nombre = ?";
                connection.query(existeName,[nombre],
                function(err, result){
                    connection.release();
                    if(err){
                        
                        console.log("ERROR: "+err.message);
                        callback(new Error("Error de acceso a la base de datos"));
                    }
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
                    const existeName = "SELECT * FROM ucm_aw_cau_tec_tecnicos where email= ?";
                    connection.query(existeName,[correo],
                        function(err, result2){
                        connection.release();
                        if(err){
                            console.log("ERROR: "+err.message);
                            callback(new Error("Error de acceso a la base de datos"));
                        }
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
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                
                //El usuario no existe
                const existeName = "SELECT * FROM ucm_aw_cau_emp_empleados where numero= ?";
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

   
   
    
    registroTecnico(usuario,callback){
       
        this.pool.getConnection(function(err,connection){
            if(err){
                 callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                console.log("Datos registro usuario: "+usuario.nombre+" "+usuario.correo+" "+usuario.pass); 
                const valor="INSERT INTO ucm_aw_cau_tec_tecnicos (nombre, email, password,perfil,desactivado,numEmp) VALUES (?,?,?,?,?,?);";
                connection.query(valor,[usuario.username, usuario.correo, usuario.password2,usuario.perfil,false,usuario.numEmp],
                function(err2, result2){
                    connection.release(); //devolver el pool de conexiones.
                    if(err2){
                        console.log("ERROR: "+err.message);
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{     
                        if(result2.affectedRows) callback(null,result2.insertId);
                        else callback(new Error("Error en el registro de usuario"));
                    }
                });
                
            }
        });
    }

    

    loginTecnico(email, password,callback) {
            //console.log("DAO "+email+" "+password);
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    callback(new Error("Error de conexión a la base de datos"));
                }
                else {
                    connection.query("SELECT * FROM ucm_aw_cau_tec_tecnicos WHERE email = ? AND password= ?" ,
                        [email,password],
                        function(err, rows) {
                            connection.release(); // devolver al pool la conexión
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else {
                                if (rows.length === 0) {
                                    callback(null,false); //no está el usuario con el password proporcionado
                                }
                                else {
                                    // console.log("DATOS DAO: "+rows[0].id+"/"+rows[0].username+"/"+rows[0].email+"/"+rows[0].password);
                                    callback(null,rows[0]);
                                }
                            }
                        });
                }
            });
    }

}

module.exports = DAO_TECNICO;