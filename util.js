"use strict";

/**
 * Clase que implementa metodos de utilidad.
 */
class Util {

    /**
     * Devuelve un objeto Date a partir de una fecha en formato SQL.
     * @param sqldate Cadena de texto con la fecha en formato SQL.
     * @returns Objeto Date con la fecha indicada como parámetro.
     */
    dateSQL2JS(sqldate) {
        return new Date(Date.parse(sqldate.replace(/-/g, '/')));
    }

    /**
     * Devuelve la clase BootStrap asociada a un aviso.
     * @param tipo Valor del campo 'tipo' ( "incidencia" / "sugerencia" / "felicitacion" ) de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @returns Devuelve la clase (atributo HTML 'class') de la fila de una tabla BootStrap que le corresponde a un aviso según de qué tipo sea.
     */
    getNotifyHtmlClass(tipo) {
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
    getNotifyImageURL(tipo) {
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
    getNotifyResume(observaciones) {
        if(observaciones == undefined || observaciones == null || typeof(observaciones) != "string") return("?");
        if(observaciones.length <= 80 ) return(observaciones);
        else return(observaciones.substring(0,77) + "..." );
    }

    /**
     * Devuelve el estado de un aviso.
     * @param aviso objeto con los datos de un aviso recuperado de la BD.
     * @returns Estado del aviso: 1 (open)  / 2 (assigned) / 3 (closed) / 4 (cancelled) .
     */
    getNotifyState(aviso) {
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
    getNotifyTechnicianActions(state, idTec, myIdTec) {
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
    getUserTechnicianActions() {
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
        const estado = this.getNotifyState(aviso);
        const htmlNotify = {
            id: aviso.idAvi,
            htmlClass: this.getNotifyHtmlClass(aviso.tipo),
            imageURL: this.getNotifyImageURL(aviso.tipo),
            date: aviso.fecha.toLocaleDateString(),
            resume: this.getNotifyResume(aviso.observaciones),
            state: estado,
            actions: this.getNotifyTechnicianActions(estado, aviso.idTec, myIdTec)
        }
        return htmlNotify;
    }

    /**
     * Devuelve los datos comunes de un usuario estándar o un técnico.
     * @param usutec Usuario o técnico. Obejto con los datos de un usuario estándar o técnico recuperados de la base de datos.
     * @returns Objeto 'Common' con los datos comunes de un usuario estándar o un técnico más las propiedades 'isTechnician' (Boolean).
     * Common = { id: Number, fecha: Date, email: String, password: String, nombre: String, perfil: String, imagen: String, desactivado: Boolean, isTechnician: Boolean } .
     */
    getCommon(usutec) {
        if(usutec === undefined || usutec === null || usutec === "null" || typeof(usutec) != "object" || Array.isArray(usutec) ) return {};
        const isTechnician = usutec.idTec === undefined ? false : true;
        return {
            id: isTechnician ? usutec.idTec : usutec.idUsu,
            fecha: usutec.fecha,
            email: usutec.email,
            password: usutec.password,
            nombre: usutec.nombre,
            perfil: usutec.perfil,
            imagen: usutec.imagen,
            desactivado: usutec.desactivado,
            isTechnician: isTechnician
        };
    }

    /**
     * Devuelve un array de datos comunes de usuario estándar o técnico.
     * @param  args Array de objetos, o un solo objeto, con los datos de un usuario estándar o técnico recuperados de la BD.
     * @returns Array de objetos 'Common' con los datos comunes de un usuario estándar o un técnico más las propiedades 'isTechnician' (Boolean) e 'i' (Number) .
     * Common = { id: Number, fecha: Date, email: String, password: String, nombre: String, perfil: String, imagen: String, desactivado: Boolean, isTechnician: Boolean, i: Number } .
     */
    toComonArray(...args) {
        let n = 1;
        let ca = [];
        const thisObj = this;
        for(const arg of args) {
            if(arg !== undefined || arg !== null ||arg !== "null") {
                if(typeof(arg) === "object") {
                    if(Array.isArray(arg)) ca = ca.concat( arg.map( o => { return {...thisObj.getCommon(o), i: n++ }; } ) );
                    else ca = [...ca, {...thisObj.getCommon(arg), i: n++ } ];
                }
            }
        }
        return ca;
    }

    /**
     * Devuelve la información necesaria para mostrar un usuario, ya sea técnico o usuario estándar.
     * @param common Los datos comunes de un usuario estándar o un técnico más las propiedades 'isTechnician' (Boolean) e 'i' (Number).
     * @returns Devuelve un objeto con la información necesaria para mostrar un usuario en la tabla de usuarios de la página principal de un técnico.
     */
    toHtmlCommon(common) {
        if(common === undefined || common === null || common === "null" || typeof(common) != "object" || Array.isArray(common) ) return {};
        const htmlUser = {
            i: common.i,
            id: common.id,
            date: common.fecha.toLocaleDateString(),
            name: common.nombre,
            role: ( common.isTechnician ? "técnico" : "usuario" ),
            type: ( common.isTechnician ? "tec" : "std" ),
            viewFunction: ( common.isTechnician ? "viewTechnician" : "viewStandardUser" ),
            cancelFunction: ( common.isTechnician ? "cancelTechnician" : "cancelStandardUser" ),
            actions: ( common.desactivado ? [1, 0] : [1, 1] )
        }
        return htmlUser;
    }

}

module.exports = Util;