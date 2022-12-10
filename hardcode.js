"use strict";

/**
 * Devuelve un objeto Date a partir de una fecha en formato SQL.
 * @param sqldate Cadena de texto con la fecha en formato SQL.
 * @returns Objeto Date con la fecha indicada como parámetro.
 */
function dateSQL2JS(sqldate){
    return new Date(Date.parse(sqldate.replace(/-/g, '/')));
}

/**
 * Clase que devuelve objetos con datos de ejemplo.
 */
class Hardcode {

    /**
     * Constructor de la clase 'Hardcode'.
     * Crea un objeto con los métodos necesarios para devuelver objetos con datos de ejemplo.
     */
    constructor(pool) {
        this.nUsu = 24;
        this.nTec = 5;
        this.nAvi = 11;
    }

    /**
     * Hard-code.
     * @param idUsu Id del usuario estándar.
     * @returns Devuelve los datos de un usuario estándar tal y como se recuperarian de la BD, cuyo id (idUsu) se pasa por parámetro.
     */
    usuarioBD(idUsu) {
        switch(idUsu) {
            case 1:
                return(
                    {
                        idUsu: 1,
                        fecha: dateSQL2JS("2019-09-11 12:01:22"),
                        email: "anuñez@ucm.es",
                        password: "letmein",
                        nombre: "Alfredo Nuñez",
                        perfil: "alumno",
                        imagen: "anuñez.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 2:
                return(
                    {
                        idUsu: 2,
                        fecha: dateSQL2JS("2022-09-09 18:04:41"),
                        email: "alozano@ucm.es",
                        password: "letmein",
                        nombre: "Ana Lozano",
                        perfil: "alumno",
                        imagen: "alozano.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 3:
                return(
                    {
                        idUsu: 3,
                        fecha: dateSQL2JS("2022-09-15 21:53:22"),
                        email: "ctorres@ucm.es",
                        password: "letmein",
                        nombre: "Carlota Torres",
                        perfil: "alumno",
                        imagen: "ctorres.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 4:
                return(
                    {
                        idUsu: 4,
                        fecha: dateSQL2JS("2021-09-13 14:02:53"),
                        email: "msalas@ucm.es",
                        password: "letmein",
                        nombre: "Matias Salas",
                        perfil: "alumno",
                        imagen: "msalas.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 5:
                return(
                    {
                        idUsu: 5,
                        fecha: dateSQL2JS("2021-09-06 08:47:06"),
                        email: "nroca@ucm.es",
                        password: "letmein",
                        nombre: "Nuria Roca",
                        perfil: "alumno",
                        imagen: "nroca.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 6:
                return(
                    {
                        idUsu: 6,
                        fecha: dateSQL2JS("2022-09-06 13:07:20"),
                        email: "rcarrasco@ucm.es",
                        password: "letmein",
                        nombre: "Rebeca Carrasco",
                        perfil: "alumno",
                        imagen: "rcarrasco.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 7:
                return(
                    {
                        idUsu: 7,
                        fecha: dateSQL2JS("2022-09-07 14:02:53"),
                        email: "rcontreras@ucm.es",
                        password: "letmein",
                        nombre: "Ruben Contreras",
                        perfil: "alumno",
                        imagen: "rcontreras.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 8:
                return(
                    {
                        idUsu: 8,
                        fecha: dateSQL2JS("2021-09-03 10:31:32"),
                        email: "vramos@ucm.es",
                        password: "letmein",
                        nombre: "Vanesa Ramos",
                        perfil: "alumno",
                        imagen: "vramos.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 9:
                return(
                    {
                        idUsu: 9,
                        fecha: dateSQL2JS("2020-09-14 09:17:54"),
                        email: "vramirez@ucm.es",
                        password: "letmein",
                        nombre: "Victor Ramirez",
                        perfil: "alumno",
                        imagen: "vramirez.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 10:
                return(
                    {
                        idUsu: 10,
                        fecha: dateSQL2JS("2021-09-03 11:42:27"),
                        email: "bgerpe@ucm.es",
                        password: "letmein",
                        nombre: "Begoña Gerpe",
                        perfil: "pdi",
                        imagen: "bgerpe.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 11:
                return(
                    {
                        idUsu: 11,
                        fecha: dateSQL2JS("2020-09-04 13:09:16"),
                        email: "eporto@ucm.es",
                        password: "letmein",
                        nombre: "Eva Porto",
                        perfil: "pdi",
                        imagen: "eporto.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 12:
                return(
                    {
                        idUsu: 12,
                        fecha: dateSQL2JS("2020-09-02 10:25:14"),
                        email: "jsantaolalla@ucm.es",
                        password: "letmein",
                        nombre: "Javier Santaolalla",
                        perfil: "pdi",
                        imagen: "jsantaolalla.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 13:
                return(
                    {
                        idUsu: 13,
                        fecha: dateSQL2JS("2014-09-01 11:48:26"),
                        email: "maranda@ucm.es",
                        password: "letmein",
                        nombre: "Marcos Aranda",
                        perfil: "pdi",
                        imagen: "maranda.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 14:
                return(
                    {
                        idUsu: 14,
                        fecha: dateSQL2JS("1958-09-03 09:12:30"),
                        email: "rguzman@ucm.es",
                        password: "letmein",
                        nombre: "Roberto Guzman",
                        perfil: "pdi",
                        imagen: "rguzman.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 15:
                return(
                    {
                        idUsu: 15,
                        fecha: dateSQL2JS("2022-09-02 10:57:28"),
                        email: "smontes@ucm.es",
                        password: "letmein",
                        nombre: "Sabrina Montes",
                        perfil: "pdi",
                        imagen: "smontes.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 16:
                return(
                    {
                        idUsu: 16,
                        fecha: dateSQL2JS("1977-10-21 12:03:44"),
                        email: "agarrido@ucm.es",
                        password: "letmein",
                        nombre: "Ana Garrido",
                        perfil: "pas",
                        imagen: "agarrido.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 17:
                return(
                    {
                        idUsu: 17,
                        fecha: dateSQL2JS("1991-02-18 14:08:19"),
                        email: "csamper@ucm.es",
                        password: "letmein",
                        nombre: "Cristian Samper",
                        perfil: "pas",
                        imagen: "csamper.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 18:
                return(
                    {
                        idUsu: 18,
                        fecha: dateSQL2JS("2006-04-17 09:44:37"),
                        email: "mhall@ucm.es",
                        password: "letmein",
                        nombre: "Meredith Hall",
                        perfil: "pas",
                        imagen: "mhall.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 19:
                return(
                    {
                        idUsu: 19,
                        fecha: dateSQL2JS("1999-05-20 11:41:25"),
                        email: "rsantos@ucm.es",
                        password: "letmein",
                        nombre: "Rebeca Santos",
                        perfil: "pas",
                        imagen: "rsantos.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 20:
                return(
                    {
                        idUsu: 20,
                        fecha: dateSQL2JS("1997-06-13 10:59:07"),
                        email: "tbrown@ucm.es",
                        password: "letmein",
                        nombre: "Taylor Brown",
                        perfil: "pas",
                        imagen: "tbrown.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 21:
                return(
                    {
                        idUsu: 21,
                        fecha: dateSQL2JS("1978-07-05 12:41:16"),
                        email: "avillar@ucm.es",
                        password: "letmein",
                        nombre: "Andres Villar",
                        perfil: "aa",
                        imagen: "avillar.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 22:
                return(
                    {
                        idUsu: 22,
                        fecha: dateSQL2JS("1980-11-24 09:24:14"),
                        email: "jmolina@ucm.es",
                        password: "letmein",
                        nombre: "Julian Molina",
                        perfil: "aa",
                        imagen: "jmolina.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 23:
                return(
                    {
                        idUsu: 23,
                        fecha: dateSQL2JS("1985-12-16 08:48:53"),
                        email: "lmarin@ucm.es",
                        password: "letmein",
                        nombre: "Luisa Marin",
                        perfil: "aa",
                        imagen: "lmarin.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            case 24:
                return(
                    {
                        idUsu: 24,
                        fecha: dateSQL2JS("1987-05-11 12:28:39"),
                        email: "tmorgan@ucm.es",
                        password: "letmein",
                        nombre: "Tina Morgan",
                        perfil: "aa",
                        imagen: "tmorgan.jpg",
                        desactivado: 0,
                        reputacion: 50.00
                    }
                );
            default:
                return(
                    {
                        idUsu: 0,
                        fecha: dateSQL2JS("2022-01-01 00:00:00"),
                        email: "undefined",
                        password: "undefined",
                        nombre: "undefined",
                        perfil: "undefined",
                        imagen: "default.jpg",
                        desactivado: 0,
                        reputacion: 0.0
                    }
                );
        }
    }

    /**
     * Hard-code.
     * @returns Devuelve un array con todos los usuarios estándar tal y como se recuperarian de la BD.
     */
    usuariosBD() {
        let aUsu = [];
        for(let i=1; i<=this.nUsu; i++) {
            aUsu = [...aUsu, this.usuarioBD(i)];
        }
        return aUsu;
    }

    /**
     * Hard-code.
     * @param usu Id del usuario estándar.
     * @returns Devuelve los datos de sesión que tendría un usuario estándar al hacer login, introduciendo los datos recuperados de la BD por parámetro.
     */
    usuarioBDToSession(usu) {
        if(usu === undefined || usu === null || usu === "null" || typeof(usu) != "object" || Array.isArray(usu) ) return {};
        return {
            id: usu.idUsu,
            name: usu.nombre,
            profile: usu.perfil,
            imageURL: usu.imagen == undefined ||  usu.imagen == "null" ? "\\img\\avatars\\default.jpg" : "\\img\\avatars\\" + usu.imagen,
            isTechnician: false
        };
    }

    /**
     * Hard-code.
     * @param idUsu Id del usuario estándar.
     * @returns Devuelve los datos de sesión que tendría un usuario estándar al hacer login, cuyo id (idUsu) se pasa por parámetro.
     */
    usuarioSession(idUsu) {
        return this.usuarioBDToSession(this.usuarioBD(idUsu));
    }

    /**
     * Hard-code.
     * @param idTec Id del técnico.
     * @returns Devuelve los datos del técnico, tal y como se recuperarian de la BD, cuyo id (idTec) se pasa por parámetro.
     */
    tecnicoBD(idTec) {
        switch(idTec) {
            case 1:
                return(
                    {
                        idTec: 1,
                        fecha: dateSQL2JS("1991-09-02 11:55:19"),
                        email: "aortiz@ucm.es",
                        password: "letmein",
                        nombre: "Alexander Ortiz",
                        perfil: "pas",
                        imagen: "aortiz.jpg",
                        desactivado: 0,
                        numEmp: "4678-dfs"
                    }
                );
            case 2:
                return(
                    {
                        idTec: 2,
                        fecha: dateSQL2JS("2002-06-05 12:24:33"),
                        email: "csolis@ucm.es",
                        password: "letmein",
                        nombre: "Carolina Solis",
                        perfil: "pas",
                        imagen: "csolis.jpg",
                        desactivado: 0,
                        numEmp: "5102-gev"
                    }
                );
            case 3:
                return(
                    {
                        idTec: 3,
                        fecha: dateSQL2JS("2015-03-15 08:49:56"),
                        email: "hsmith@ucm.es",
                        password: "letmein",
                        nombre: "Harold Smith",
                        perfil: "pas",
                        imagen: "hsmith.jpg",
                        desactivado: 0,
                        numEmp: "6884-hnx"
                    }
                );
            case 4:
                return(
                    {
                        idTec: 4,
                        fecha: dateSQL2JS("2020-01-05 10:25:08"),
                        email: "pjuarez@ucm.es",
                        password: "letmein",
                        nombre: "Pablo Juarez",
                        perfil: "pas",
                        imagen: "pjuarez.jpg",
                        desactivado: 0,
                        numEmp: "7039-con"
                    }
                );
            case 5:
                return(
                    {
                        idTec: 5,
                        fecha: dateSQL2JS("2022-09-01 09:10:40"),
                        email: "lmoreno@ucm.es",
                        password: "letmein",
                        nombre: "Lucas Moreno",
                        perfil: "pas",
                        imagen: "lmoreno.jpg",
                        desactivado: 0,
                        numEmp: "8959-azy"
                    }
                );
            default:
                return(
                    {
                        idTec: 0,
                        fecha: dateSQL2JS("2022-01-01"),
                        email: "undefined",
                        password: "undefined",
                        nombre: "undefined",
                        perfil: "undefined",
                        imagen: "default.jpg",
                        desactivado: 0,
                        numEmp: "undefined"
                    }
                );
        }
    }

    /**
     * Hard-code.
     * @returns Devuelve un array con todos los técnicos tal y como se recuperarian de la BD.
     */
    tecnicosBD() {
        let aTec = [];
        for(let i=1; i<=this.nTec; i++) {
            aTec = [...aTec, this.tecnicoBD(i)];
        }
        return aTec;
    }

    /**
     * Hard-code.
     * @param idTec Id del técnico.
     * @returns Devuelve los datos de sesión que tendría un técnico al hacer login, introduciendo los datos recuperados de la BD por parámetro.
     */
    tecnicoBDToSession(tec) {
        if(tec === undefined || tec === null || tec === "null" || typeof(tec) != "object" || Array.isArray(tec) ) return {};
        return {
            id: tec.idTec,
            name: tec.nombre,
            profile: tec.perfil,
            imageURL: tec.imagen == undefined ||  tec.imagen == "null" ? "\\img\\avatars\\default.jpg" : "\\img\\avatars\\" + tec.imagen,
            isTechnician: true
        };
    }

    /**
     * Hard-code.
     * @param idTec Id del técnico.
     * @returns Devuelve los datos de sesión que tendría un técnico al hacer login, cuyo id (idTec) se pasa por parámetro.
     */
    tecnicoSession(idTec) {
        return this.tecnicoBDToSession(this.tecnicoBD(idTec));
    }

    /**
     * Hard-code.
     * @param idAvi Id del aviso.
     * @returns Devuelve los datos de un aviso tal y como se recuperarian de la BD, cuyo id (idAvi) se pasa por parámetro.
     */
    avisoBD(idAvi) {
        switch(idAvi) {
            case 1:
                return(
                    {
                        idAvi: 1,
                        tipo: 'incidencia',
                        categoria: 'comunicaciones', 
                        subcategoria: 'correo_electronico',
                        fecha: dateSQL2JS('2022-09-14'),
                        observaciones: 'Después de haber solicitado la migración de mi cuenta puedo acceder al nuevo correo, pero no encuentro los correos antiguos y me faltan carpetas.',
                        comentario: 'Lo hemos revisado y por lo visto no se realizó correctamente la migración. Lo más probable es que no se seleccionasen las opciones adecuadas en el momento de hacer la copia. Somos humanos y a veces metemos la pata. Afortunadamente, tu antigua cuenta aún no había sido eliminada y hemos podido recuperar lo que faltaba. Ya deberías tenerlo todo disponible en tu nueva cuenta.', 
                        cerrado: 1,
                        cancelado: 0, 
                        idUsu: 12,
                        idTec: 2
                    }
                );
            case 2:
                return(
                    {
                        idAvi: 2,
                        tipo: 'incidencia',
                        categoria: 'docencia',
                        subcategoria: 'aula_virtual',
                        fecha: dateSQL2JS('2022-09-20'),
                        observaciones: 'He solicitado un cambio de matrícula pero en el Campus Virtual me siguen apareciendo las asignaturas del la carrera en la que estaba antes.',
                        comentario: 'Las notificaciones de traspasos tardan unos días en llegar al servicio de informática. Estamos trabajando para acelerar el proceso. Si dentro de unos 10 días sigue sin haberse actualizado el listado de asignaturas, vuelve a contactar con nosotros.',
                        cerrado: 1,
                        cancelado: 0,
                        idUsu: 1,
                        idTec: 3
                    }
                );
            case 3:
                return(
                    {
                        idAvi: 3,
                        tipo: 'incidencia',
                        categoria: 'comunicaciones',
                        subcategoria: 'correo_electronico',
                        fecha: dateSQL2JS('2022-09-21'),
                        observaciones: 'Me están llegando correos en los que el remitente soy yo mismo.',
                        comentario: 'Márcalos como "correo no deseado". Una vez que se hayan movido a la carpeta de "Spam" puedes indicar el motivo en el apartado de categorización de correo. Indica en el primer desplegable "mensaje fraudulento" y en el segundo "suplantación de identidad".',
                        cerrado: 1,
                        cancelado: 0,
                        idUsu: 17,
                        idTec: 4
                    }
                );
            case 4:
                return(
                    {
                        idAvi: 4,
                        tipo: 'incidencia',
                        categoria: 'comunicaciones',
                        subcategoria: 'cuenta_alumno',
                        fecha: dateSQL2JS('2022-09-23'),
                        observaciones: 'No me gusta como queda mi foto de perfil, ¿se le puede poner algún filtro?',
                        comentario: 'No, y te recomiendo que no lo hagas con otras aplicaciones. Esto no es una red social sino una institución académica.',
                        cerrado: 1,
                        cancelado: 0,
                        idUsu: 8,
                        idTec: 2
                    }
                );
            case 5:
                return(
                    {
                        idAvi: 5,
                        tipo: 'sugerencia',
                        categoria: 'docencia',
                        subcategoria: 'aula_virtual',
                        fecha: dateSQL2JS('2022-10-06'),
                        observaciones: '¿No podrías hacer una aplicación para votaciones? Hay compañeros que no han podido votarme en la elección de delegado por no haber ido ese día a clase.',
                        comentario: 'No es que no se pueda, se trata más bien un tema de confianza en la organización que gestione el sistema.',
                        cerrado: 1,
                        cancelado: 0,
                        idUsu: 7,
                        idTec: 1
                    }
                );
            case 6:
                return(
                    {
                        idAvi:6,
                        tipo: 'incidencia',
                        categoria: 'docencia',
                        subcategoria: 'aula_virtual',
                        fecha: dateSQL2JS('2022-10-11'),
                        observaciones: '¿Hay alguna manera de recibir avisos en el correo electrónico cuando el profesor pone una nueva tarea en el Campus Virtual?',
                        comentario: 'Claro que sí. En el menú de configuración, ve al apartado de "Notificaciones", pincha en el botón con el símbolo [+] para añadir una nueva, y elije en el desplegable la asignatura que te interese (o "Todas") y más abajo marca "tareas". Te recomiendo que también marques "cambios de fechas de entrega". Para comprobar, si todo ha ido bien ve al apartado de "Mis notificaciones", te aparecerá un listado desde el que puedes activarlas o desactivarlas a conveniencia sin necesidad de borrarlas. Verifica, entonces, que el check box de la columna "act." esté marcado.',
                        cerrado: 1,
                        cancelado: 0,
                        idUsu: 3,
                        idTec: 1
                    }
                );
            case 7:
                return(
                    {
                        idAvi: 7,
                        tipo: 'sugerencia',
                        categoria: 'comunicaciones',
                        subcategoria: 'cuenta_alumno',
                        fecha: dateSQL2JS('2022-10-29'),
                        observaciones: '¿Para cuándo un Tinder UCM?',
                        comentario: 'XD',
                        cerrado: 1,
                        cancelado: 1,
                        idUsu: 7,
                        idTec: 2
                    }
                );
            case 8:
                return(
                    {
                        idAvi: 8,
                        tipo: 'felicitacion',
                        categoria: 'informatica',
                        subcategoria: 'null',
                        fecha: dateSQL2JS('2022-11-15'),
                        observaciones: 'Hola, quiero daros la enhorabuena por la gran labor de mantenimiento que hacéis con los equipos de los laboratorios. ¡Buen trabajo!',
                        comentario: 'Muchas gracias. Resulta reconfortante saber que se valora el esfuerzo que hacemos.',
                        cerrado: 1,
                        cancelado: 0,
                        idUsu: 11,
                        idTec: 1
                    }
                );
            case 9:
                return(
                    {
                        idAvi: 9,
                        tipo: 'incidencia',
                        categoria: 'docencia',
                        subcategoria: 'aula_virtual',
                        fecha: dateSQL2JS('2022-11-28'),
                        observaciones: 'La calefacción está muy alta en el Aula 2.09 ¿podéis bajarla unos grados?',
                        comentario: 'Lo siento, nosotros no llevamos eso. Pregunta en conserjería.',
                        cerrado: 1,
                        cancelado: 1,
                        idUsu: 7,
                        idTec: 3
                    }
                );
            case 10:
                return(
                    {
                        idAvi: 10,
                        tipo: 'incidencia',
                        categoria: 'comunicaciones',
                        subcategoria: 'correo_electronico',
                        fecha: dateSQL2JS('2022-12-02'),
                        observaciones: 'Este curso es mi último año en la universidad y me gustaría conservar copia de mis correos electrónicos ¿Podéis hacerme una?',
                        comentario: 'Si solo te interesa conservar unos cuantos emails te recomiendo que uses la opción de exportar correos. Crea una nueva carpeta con todos los correos que te interesen y desde las opciones de carpeta elije "exportar".<br/><br/>Si los quieres todos, podemos proporcionarte una copia, pero primero deberás realizar una solicitud de entrega de datos desde la página de administración electrónica. No se te olvide marcar la casilla de "correos electrónicos".',
                        cerrado: 1,
                        cancelado: 0,
                        idUsu: 14,
                        idTec: 5
                    }
                );
            case 11:
                return(
                    {
                        idAvi: 11,
                        tipo: 'incidencia',
                        categoria: 'comunicaciones',
                        subcategoria: 'correo_electronico',
                        fecha: dateSQL2JS('2022-12-12'),
                        observaciones: 'Voy a estar ausente un tiempo y deseo que otra persona pueda acceder a la cuenta institucional para poder contestar a los correos nuevos.',
                        comentario: 'Lo siento, pero por motivos de privacidad de datos no se permite esa posibilidad. Sin embargo siempre puedes activar la opción de reenvío automático para correos entrantes. Cuando la marques se te habilitará el campo "cuenta de destino", en el que deberás escribir la dirección de correo electrónico de la persona que quieres que los reciba. Otra opción es la de "respuesta automática", en la que puedes poner un texto como "estoy de vacaciones y no puedo atenderte". Pero acuérdate de desactívala cuando vuelvas.',
                        cerrado: 1,
                        cancelado: 0,
                        idUsu: 13,
                        idTec: 4
                    }
                );
            default:
                return(
                    {
                        idAvi: 0,
                        tipo: "undefined",
                        categoria: "undefined",
                        subcategoria: "undefined",
                        fecha: dateSQL2JS('2022-12-01'),
                        observaciones: "undefined",
                        comentario: "undefined",
                        cerrado: 0,
                        cancelado: 0,
                        idUsu: 0,
                        idTec: 0
                    }
                );
        }
    }

    /**
     * Hard-code.
     * @returns Devuelve un array con todos los avisos tal y como se recuperarian de la BD.
     */
    avisosBD() {
        let aAvi = [];
        for(let i=1; i<=this.nAvi; i++) {
            aAvi = [...aAvi, this.avisoBD(i)];
        }
        return aAvi;
    }

    /**
     * Hard-code.
     * id = Campo 'idAvi'.
     * htmlClass = "table-danger" / "table-warning" / "table-success" .
     * imageURL = "img\\icons\\incidencia.png" / "img\\icons\\sugerencia.png" / "img\\icons\\felicitacion.png" .
     * date = Fecha con formato 'dd/mm/aaaa'.
     * resume = Campo 'observaciones' con 80 caracteres como máximo (incuidos los puntos suspensivos).
     * state = 1 (open)  / 2 (assigned) / 3 (closed) / 4 (cancelled) .
     * actions = [view, assign, cancel]. Cada una con valores: -1 (not present) / 0 (disable) / 1 (enable) .
     * @returns Devuelve un array con todos los los avisos, cada uno con los datos necesarios para mostrarse en una tabla HTML.
     */
    avisosHTML() {
        return(
            [
                {
                    id: 1,
                    htmlClass: "table-danger",
                    imageURL: "img\\icons\\incidencia.png",
                    date: "14/09/2022",
                    resume: "Después de haber solicitado la migración de mi cuenta puedo acceder al nuevo ...",
                    state: 3,
                    actions: [1, -1, 1]
                },
                {
                    id: 2,
                    htmlClass: "table-danger",
                    imageURL: "img\\icons\\incidencia.png",
                    date: "20/09/2022",
                    resume: "He solicitado un cambio de matrícula pero en el Campus Virtual me siguen apa...",
                    state: 3,
                    actions: [1, -1, 1]
                },
                {
                    id: 3,
                    htmlClass: "table-danger",
                    imageURL: "img\\icons\\incidencia.png",
                    date: "21/09/2022",
                    resume: "Me están llegando correos en los que el remitente soy yo mismo.",
                    state: 3,
                    actions: [1, -1, 1]
                },
                {
                    id: 4,
                    htmlClass: "table-danger",
                    imageURL: "img\\icons\\incidencia.png",
                    date: "23/09/2022",
                    resume: "No me gusta como queda mi foto de perfil, ¿se le puede poner algún filtro?",
                    state: 3,
                    actions: [1, -1, 1]
                },
                {
                    id: 5,
                    htmlClass: "table-warning",
                    imageURL: "img\\icons\\sugerencia.png",
                    date: "06/10/2022",
                    resume: "¿No podrías hacer una aplicación para votaciones? Hay compañeros que no han p...",
                    state: 3,
                    actions: [1, -1, 1]
                },
                {
                    id: 6,
                    htmlClass: "table-danger",
                    imageURL: "img\\icons\\incidencia.png",
                    date: "11/10/2022",
                    resume: "¿Hay alguna manera de recibir avisos en el correo electrónico cuando el profe...",
                    state: 3,
                    actions: [1, -1, 1]
                },
                {
                    id: 7,
                    htmlClass: "table-warning",
                    imageURL: "img\\icons\\sugerencia.png",
                    date: "29/10/2022",
                    resume: "¿Para cuándo un Tinder UCM?",
                    state: 4,
                    actions: [1, -1, 0]
                },
                {
                    id: 8,
                    htmlClass: "table-success",
                    imageURL: "img\\icons\\felicitacion.png",
                    date: "15/11/2022",
                    resume: "Hola, quiero daros la enhorabuena por la gran labor de mantenimiento que hacé...",
                    actions: [1, -1, 1]
                },
                {
                    id: 9,
                    htmlClass: "table-danger",
                    imageURL: "img\\icons\\incidencia.png",
                    date: "28/11/2022",
                    resume: "La calefacción está muy alta en el Aula 2.09 ¿podéis bajarla unos grados?",
                    state: 4,
                    actions: [1, -1, 0]
                },
                {
                    id: 10,
                    htmlClass: "table-danger",
                    imageURL: "img\\icons\\incidencia.png",
                    date: "02/12/2022",
                    resume: "Este curso es mi último año en la universidad y me gustaría conservar copia d...",
                    state: 3,
                    actions: [1, -1, 1]
                },
                {
                    id: 11,
                    htmlClass: "table-danger",
                    imageURL: "img\\icons\\incidencia.png",
                    date: "12/12/2022",
                    resume: "Voy a estar ausente un tiempo y deseo que otra persona pueda acceder a la cue...",
                    state: 3,
                    actions: [1, -1, 1]
                }
            ]
        );
    }

}

module.exports = Hardcode;