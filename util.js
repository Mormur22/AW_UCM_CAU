"use strict";

/**
 * Clase que implementa metodos de utilidad.
 */
class Util {

    /**
     * Devuelve la clase BootStrap asociada a un aviso.
     * @param tipo Valor del campo 'tipo' ( "incidencia" / "sugerencia" / "felicitacion" ) de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @returns Devuelve la clase (atributo HTML 'class') de la fila de una tabla BootStrap que le corresponde a un aviso según de qué tipo sea.
     */
    getHtmLClass(tipo) {
        if(tipo === undefined || tipo === null || tipo === "null" || typeof(tipo) !== "string" ) return("table-light");
        switch(tipo){
            case "incidencia":
                return("table-danger");
            case "sugerencia":
                return("table-warning");
            case "felicitacion":
                return("table-success");
            default:
                return("table-light");
        }
    }

    /**
     * Devuelve la URL de la imagen asociada a un aviso.
     * @param tipo Valor del campo 'tipo' ( "incidencia" / "sugerencia" / "felicitacion" ) de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @returns Devuelve la URL de la imagen (atributo HTML 'src' de la etiqueta 'img') que le corresponde a un aviso según de qué tipo sea.
     */
    getImageURL(tipo) {
        if(tipo === undefined || tipo === null || tipo === "null" || typeof(tipo) !== "string" ) return("img\\icons\\desconocido.png");
        switch(tipo){
            case "incidencia":
                return("img\\icons\\incidencia.png");
            case "sugerencia":
                return("img\\icons\\sugerencia.png");
            case "felicitacion":
                return("img\\icons\\felicitacion.png");
            default:
                return("img\\icons\\desconocido.png");
        }
    }

    /**
     * Cambia el formato de una fecha.
     * @param fecha Fecha en formato 'yyyy-mm-dd'
     * @returns Fecha en formato 'dd/mm/yyyy'.
     */
    toSpanishDate(fecha) {
        if(fecha === undefined || fecha === null || fecha === "null" || typeof(fecha) !== "string") return("??/??/????");
        if(fecha.length > 10) fecha = fecha.substring(0,10);
        const p=fecha.substring(0,10).split("-");
        if(p.length > 3) return("??/??/????");
        let espfecha;
        if(p.length > 0 && p[0].length === 4 && Number.isInteger(Number(p[0])) ) espfecha = p[0];
        else espfecha = "????";
        if(p.length > 1 && p[1].length === 2 && Number.isInteger(Number(p[1])) ) espfecha = p[1] + "/" + espfecha;
        else espfecha = "??/" + espfecha;
        if(p.length > 2 && p[2].length === 2 && Number.isInteger(Number(p[2])) ) espfecha = p[2] + "/" + espfecha;
        else espfecha = "??/" + espfecha;
        return espfecha;
    }

    /**
     * Devuelve el resumen de un texto (como máximo 80 caracteres).
     * @param observaciones Cadena de texto de la que se quiere obtener el resumen.
     * @returns Devuelve la misma cadena si tiene menos de 81 caracteres y si no los primeros 77 caracteres seguidos de 3 puntos suspensivos (...) .
     */
    getResume(observaciones) {
        if(observaciones == undefined || observaciones == null || typeof(observaciones) != "string") return("?");
        if(observaciones.length <= 80 ) return(observaciones);
        else return(observaciones.substring(0,77) + "..." );
    }

    /**
     * Devuelve el estado de un aviso.
     * @param aviso objeto con los datos de un aviso recuperado de la BD.
     * @returns Estado del aviso: 1 (open)  / 2 (assigned) / 3 (closed) / 4 (cancelled) .
     */
    getState(aviso) {
        if(aviso === undefined || aviso === null || aviso === "null" || typeof(aviso) != "object" || Array.isArray(aviso) ) return -1;
        if(aviso.cancelado === undefined || aviso.cancelado === null || aviso.cancelado === "null") return -1;
        if(aviso.cancelado == 1) return 4;
        if(aviso.cancelado != 0) return -1;
        if(aviso.cerrado === undefined || aviso.cerrado === null || aviso.cerrado === "null") return -1;
        if(aviso.cerrado == 1) return 3;
        if(aviso.cerrado != 0) return -1;
        if(aviso.idTec === undefined) return -1;
        if(aviso.idTec === null || aviso.idTec === "null") return 1;
        return 2;
    }

    /**
     * Devuelve las acciones que un técnico puede realizar con los avisos dependiendo del estado en el que estén.
     * @param state Estado del aviso: 1 (open)  / 2 (assigned) / 3 (closed) / 4 (cancelled) .
     * @param idTec Id del técnico que tiene asignado el aviso.
     * @param myIdTec El id del técnico que está usando la applicaión.
     * @returns Devuelve un array con las posibles acciones que se pueden realizar sobre un aviso.
     * actions = [view, assign, cancel]. Cada una con valores: -1 (not present) / 0 (disable) / 1 (enable) .
     */
    getTechnicianActions(state, idTec, myIdTec) {
        if(state === undefined || state === null || state === "null" || typeof(state) !== "number") return([-1,-1,-1]);
        switch(state){
            case 1:
                return([-1, 1, 1]);
            case 2:
                if(idTec === myIdTec) return([1, -1, 1]);
                else return([-1, 0, 1]);
            case 3:
                return([1, -1, 1]);
            case 4:
                return([1, -1, 0]);
            default:
                return([-1,-1,-1])
        }
    }
    
    /**
     * Devuelve las acciones que un usario normal puede realizar con sus avisos (solo verlos).
     * @returns Devuelve un array con las posibles acciones que se pueden realizar sobre un aviso propio.
     * actions = [view, assign, cancel]. Cada una con valores: -1 (not present) / 0 (disable) / 1 (enable) .
     */
    getUserActions() {
        return([1, -1, -1]);
    }

    /**
     * Devuelve la información necesaria para mostrarle un aviso a técnico.
     * @param aviso Los datos del aviso sacados de la BD
     * @param myIdTec El id del técnico que está usando la applicaión.
     * @returns Devuelve un objeto con la información necesaria para mostrar un aviso en la tabla de avisos de la página principal de un técnico.
     */
    toTechnicianHtmlNotify(aviso, myIdTec) {
        if(aviso === undefined || aviso === null || aviso === "null" || typeof(aviso) != "object" || Array.isArray(aviso) ) return {};
        const estado = this.getState(aviso);
        const htmlNotify = {
            id: aviso.idAvi,
            htmlClass: this.getHtmLClass(aviso.tipo),
            imageURL: this.getImageURL(aviso.tipo),
            date: aviso.fecha.toLocaleDateString(),
            resume: this.getResume(aviso.observaciones),
            state: estado,
            actions: this.getTechnicianActions(estado, aviso.idTec, myIdTec)
        }
        return htmlNotify;
    }

    /**
     * Devuelve la información necesaria para mostrar un usuario, ya sea técnico o usuario estándar.
     * @param usutec Los datos comunes de un usuario estándar o un técnico más las propiedades 'isTechnician' (Boolean) e 'i' (Number).
     * @returns Devuelve un objeto con la información necesaria para mostrar un usuario en la tabla de usuarios de la página principal de un técnico.
     */
    toHtmlUser(usutec) {
        if(usutec === undefined || usutec === null || usutec === "null" || typeof(usutec) != "object" || Array.isArray(usutec) ) return {};
        const htmlUser = {
            i: usutec.i,
            id: usutec.id,
            date: "??/??/????",
            name: usutec.nombre,
            role: ( usutec.isTechnician ? "técnico" : "usuario" ),
            type: ( usutec.isTechnician ? "tec" : "std" ),
            viewFunction: ( usutec.isTechnician ? "viewTechnician" : "viewStandardUser" ),
            cancelFunction: ( usutec.isTechnician ? "cancelTechnician" : "cancelStandardUser" )
        }
        return htmlUser;
    }

}

module.exports = Util;