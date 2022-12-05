"use strict";

/**
 * Clase que devuelve objetos con datos de ejemplo.
 */
class Hardcode {

    /**
     * Hard-code.
     * @returns Devuelve los datos del tecnico 1 (idTec) tal y como estarían en la BD.
     */
    tecnico1_BD() {
        return(
            {
                idTec: 1,
                email: "aortiz@ucm.es",
                password: "letmein",
                nombre: "Alexander Ortiz",
                perfil: "pas",
                imagen: "aortiz.jpg",
                desactivado: 0,
                numEmp: "4678-dfs"
            }
        );
    }

    /**
     * Hard-code.
     * id = Campo 'idTec'.
     * name = Campo 'nombre'.
     * profile = Campo 'perfil'.
     * imageURL = tecnico.imagen == undefined || tecnico.imagen == "null" ? "\\img\\avatars\\default.jpg" : "\\img\\avatars\\" + tecnico.imagen
     * isTechnician = true .
     * @returns Devuelve los datos de sesión que tendría el técnico 1 (idTec) al hacer login.
     */
    tecnico1_session() {
        return(
            {
                id: 1,
                name: "Alexander Ortiz",
                profile: "pas",
                imageURL: "\\img\\avatars\\aortiz.jpg",
                isTechnician: true
            }
        );
    }

    /**
     * Hard-code.
     * @returns Devuelve un array con todos los los avisos tal y como estarían en la BD.
     */
    avisos_DB() {
        return(
            [
                {
                    idAvi: 1,
                    tipo: 'incidencia',
                    categoria: 'comunicaciones', 
                    subcategoria: 'correo_electronico',
                    fecha: '2022-09-14',
                    observaciones: 'Después de haber solicitado la migración de mi cuenta puedo acceder al nuevo correo, pero no encuentro los correos antiguos y me faltan carpetas.',
                    comentario: 'Lo hemos revisado y por lo visto no se realizó correctamente la migración. Lo más probable es que no se seleccionasen las opciones adecuadas en el momento de hacer la copia. Somos humanos y a veces metemos la pata. Afortunadamente, tu antigua cuenta aún no había sido eliminada y hemos podido recuperar lo que faltaba. Ya deberías tenerlo todo disponible en tu nueva cuenta.', 
                    cerrado: 1,
                    cancelado: 0, 
                    idUsu: 12,
                    idTec: 2
                },
                {
                    idAvi: 2,
                    tipo: 'incidencia',
                    categoria: 'docencia',
                    subcategoria: 'aula_virtual',
                    fecha: '2022-09-20',
                    observaciones: 'He solicitado un cambio de matrícula pero en el Campus Virtual me siguen apareciendo las asignaturas del la carrera en la que estaba antes.',
                    comentario: 'Las notificaciones de traspasos tardan unos días en llegar al servicio de informática. Estamos trabajando para acelerar el proceso. Si dentro de unos 10 días sigue sin haberse actualizado el listado de asignaturas, vuelve a contactar con nosotros.',
                    cerrado: 1,
                    cancelado: 0,
                    idUsu: 1,
                    idTec: 3
                },
                {
                    idAvi: 3,
                    tipo: 'incidencia',
                    categoria: 'comunicaciones',
                    subcategoria: 'correo_electronico',
                    fecha: '2022-09-21',
                    observaciones: 'Me están llegando correos en los que el remitente soy yo mismo.',
                    comentario: 'Márcalos como "correo no deseado". Una vez que se hayan movido a la carpeta de "Spam" puedes indicar el motivo en el apartado de categorización de correo. Indica en el primer desplegable "mensaje fraudulento" y en el segundo "suplantación de identidad".',
                    cerrado: 1,
                    cancelado: 0,
                    idUsu: 17,
                    idTec: 4
                },
                {
                    idAvi: 4,
                    tipo: 'incidencia',
                    categoria: 'comunicaciones',
                    subcategoria: 'cuenta_alumno',
                    fecha: '2022-09-23',
                    observaciones: 'No me gusta como queda mi foto de perfil, ¿se le puede poner algún filtro?',
                    comentario: 'No, y te recomiendo que no lo hagas con otras aplicaciones. Esto no es una red social sino una institución académica.',
                    cerrado: 1,
                    cancelado: 0,
                    idUsu: 8,
                    idTec: 2
                },
                {
                    idAvi: 5,
                    tipo: 'sugerencia',
                    categoria: 'docencia',
                    subcategoria: 'aula_virtual',
                    fecha: '2022-10-06',
                    observaciones: '¿No podrías hacer una aplicación para votaciones? Hay compañeros que no han podido votarme en la elección de delegado por no haber ido ese día a clase.',
                    comentario: 'No es que no se pueda, se trata más bien un tema de confianza en la organización que gestione el sistema.',
                    cerrado: 1,
                    cancelado: 0,
                    idUsu: 7,
                    idTec: 1
                },
                {
                    idAvi:6,
                    tipo: 'incidencia',
                    categoria: 'docencia',
                    subcategoria: 'aula_virtual',
                    fecha: '2022-10-11',
                    observaciones: '¿Hay alguna manera de recibir avisos en el correo electrónico cuando el profesor pone una nueva tarea en el Campus Virtual?',
                    comentario: 'Claro que sí. En el menú de configuración, ve al apartado de "Notificaciones", pincha en el botón con el símbolo [+] para añadir una nueva, y elije en el desplegable la asignatura que te interese (o "Todas") y más abajo marca "tareas". Te recomiendo que también marques "cambios de fechas de entrega". Para comprobar, si todo ha ido bien ve al apartado de "Mis notificaciones", te aparecerá un listado desde el que puedes activarlas o desactivarlas a conveniencia sin necesidad de borrarlas. Verifica, entonces, que el check box de la columna "act." esté marcado.',
                    cerrado: 1,
                    cancelado: 0,
                    idUsu: 3,
                    idTec: 1
                },
                {
                    idAvi: 7,
                    tipo: 'sugerencia',
                    categoria: 'comunicaciones',
                    subcategoria: 'cuenta_alumno',
                    fecha: '2022-10-29',
                    observaciones: '¿Para cuándo un Tinder UCM?',
                    comentario: 'XD',
                    cerrado: 1,
                    cancelado: 1,
                    idUsu: 7,
                    idTec: 2
                },
                {
                    idAvi: 8,
                    tipo: 'felicitacion',
                    categoria: 'informatica',
                    subcategoria: 'null',
                    fecha: '2022-11-15',
                    observaciones: 'Hola, quiero daros la enhorabuena por la gran labor de mantenimiento que hacéis con los equipos de los laboratorios. ¡Buen trabajo!',
                    comentario: 'Muchas gracias. Resulta reconfortante saber que se valora el esfuerzo que hacemos.',
                    cerrado: 1,
                    cancelado: 0,
                    idUsu: 11,
                    idTec: 1
                },
                {
                    idAvi: 9,
                    tipo: 'incidencia',
                    categoria: 'docencia',
                    subcategoria: 'aula_virtual',
                    fecha: '2022-11-28',
                    observaciones: 'La calefacción está muy alta en el Aula 2.09 ¿podéis bajarla unos grados?',
                    comentario: 'Lo siento, nosotros no llevamos eso. Pregunta en conserjería.',
                    cerrado: 1,
                    cancelado: 1,
                    idUsu: 7,
                    idTec: 3
                },
                {
                    idAvi: 10,
                    tipo: 'incidencia',
                    categoria: 'comunicaciones',
                    subcategoria: 'correo_electronico',
                    fecha:  '2022-12-02',
                    observaciones: 'Este curso es mi último año en la universidad y me gustaría conservar copia de mis correos electrónicos ¿Podéis hacerme una?',
                    comentario: 'Si solo te interesa conservar unos cuantos emails te recomiendo que uses la opción de exportar correos. Crea una nueva carpeta con todos los correos que te interesen y desde las opciones de carpeta elije "exportar".<br/><br/>Si los quieres todos, podemos proporcionarte una copia, pero primero deberás realizar una solicitud de entrega de datos desde la página de administración electrónica. No se te olvide marcar la casilla de "correos electrónicos".',
                    cerrado: 1,
                    cancelado: 0,
                    idUsu: 14,
                    idTec: 5
                },
                {
                    idAvi: 11,
                    tipo: 'incidencia',
                    categoria: 'comunicaciones',
                    subcategoria: 'correo_electronico',
                    fecha: '2022-12-12',
                    observaciones: 'Voy a estar ausente un tiempo y deseo que otra persona pueda acceder a la cuenta institucional para poder contestar a los correos nuevos.',
                    comentario: 'Lo siento, pero por motivos de privacidad de datos no se permite esa posibilidad. Sin embargo siempre puedes activar la opción de reenvío automático para correos entrantes. Cuando la marques se te habilitará el campo "cuenta de destino", en el que deberás escribir la dirección de correo electrónico de la persona que quieres que los reciba. Otra opción es la de "respuesta automática", en la que puedes poner un texto como "estoy de vacaciones y no puedo atenderte". Pero acuérdate de desactívala cuando vuelvas.',
                    cerrado: 1,
                    cancelado: 0,
                    idUsu: 13,
                    idTec: 4
                }
            ]
        );
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
    avisos_HTML() {
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