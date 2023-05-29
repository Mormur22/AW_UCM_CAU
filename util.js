"use strict";

const perfiles = ["alumno", "pas", "pdi", "aa"];
const perfiles_texto = ["Alumno", "PAS", "PDI", "Antiguo Alumno"];
const perfiles_texto_extendido = ["Alumno", "Personal de Administración y Servicios (PAS)", "Personal Docente e Investigador (PDI)", "Antiguo Alumno"];

const categoriasSug = ["administracion", "comunicaciones", "conectividad", "docencia", "web"];
const categoriasInc = ["administracion", "comunicaciones", "conectividad", "docencia", "web"];
const categoriasFel = ["archivo", "asesoria_juridica", "biblioteca", "centro_informacion", "departamentos_docentes", "inspeccion_servicios", "oficina_gestion", "administracion", "informatica", "documentacion", "imprenta", "cafeteria", "universidad"];
const categorias = ["administracion", "comunicaciones", "conectividad", "docencia", "web", "archivo", "asesoria_juridica", "biblioteca", "centro_informacion", "departamentos_docentes", "inspeccion_servicios", "oficina_gestion", "administracion", "informatica", "documentacion", "imprenta", "cafeteria", "universidad"];

const categoriasSug_texto = ["Administracion Digital", "Comunicaciones", "Conectividad", "Docencia e", "Web"];
const categoriasInc_texto = ["Administracion Digital", "Comunicaciones", "Conectividad", "Docencia e", "Web"];
const categoriasFel_texto = ["Archivo Universitario", "Asesoría Jurídica", "Biblioteca", "Centro de Información", "Departamentos docentes", "Inspección de Servicios", "Oficina de Gestión de Infraestructuras y Mantenimiento", "Servicio de Administración", "Servicios Informáticos", "Servicio de Documentación", "Servicio de Imprenta", "Servicio de Cafetería", "Toda la Universidad"];
const categorias_texto = ["Administracion Digital", "Comunicaciones", "Conectividad", "Docencia e", "Web", "Archivo Universitario", "Asesoría Jurídica", "Biblioteca", "Centro de Información", "Departamentos docentes", "Inspección de Servicios", "Oficina de Gestión de Infraestructuras y Mantenimiento", "Servicio de Administración", "Servicios Informáticos", "Servicio de Documentación", "Servicio de Imprenta", "Servicio de Cafetería", "Toda la Universidad"];

const subcategoriasSug = {
    administracion: ["certificado_digital", "certificado_electronico", "registro_electronico", "sede_electronica", "portafirmas"],
    comunicaciones: ["correo_electronico", "google_meet","cuenta_alumno", "cuenta_personal", "cuenta_generica"],
    conectividad: ["cuenta_sara", "conexion_cable", "cortafuegos", "dns", "vpn", "wifi_eduroam", "wifi_visitantes"],
    docencia: ["aula_virtual", "blackboard_collaborate", "listado_clase", "moodle", "cursos_online"],
    web: ["analitica_web", "certificado_ssl", "hosting", "portal_eventos", "redirecciones_web"]
};

const subcategoriasInc = {
    administracion: ["certificado_digital", "certificado_electronico", "registro_electronico", "sede_electronica", "portafirmas"],
    comunicaciones: ["correo_electronico", "google_meet","cuenta_alumno", "cuenta_personal", "cuenta_generica"],
    conectividad: ["cuenta_sara", "conexion_cable", "cortafuegos", "dns", "vpn", "wifi_eduroam", "wifi_visitantes"],
    docencia: ["aula_virtual", "blackboard_collaborate", "listado_clase", "moodle", "cursos_online"],
    web: ["analitica_web", "certificado_ssl", "hosting", "portal_eventos", "redirecciones_web"]
};

const subcategorias= ["certificado_digital", "certificado_electronico", "registro_electronico", "sede_electronica", "portafirmas", "correo_electronico", "google_meet","cuenta_alumno", "cuenta_personal", "cuenta_generica", "cuenta_sara", "conexion_cable", "cortafuegos", "dns", "vpn", "wifi_eduroam", "wifi_visitantes", "aula_virtual", "blackboard_collaborate", "listado_clase", "moodle", "cursos_online", "analitica_web", "certificado_ssl", "hosting", "portal_eventos", "redirecciones_web"];

const subcategoriasSug_texto = {
    administracion: ["Certificado digital de personal física", "Certificado electrónico de empleado público", "Registro electrónico", "Sede electrónica", "Portafirmas"],
    comunicaciones: ["Correo electrónico", "Google Meet", "Cuenta de Alumno", "Cuenta de personal", "Cuenta genérica"],
    conectividad: ["Cuenta de la Red SARA", "Conexión por cable en despachos", "Cortafuegos corporativo", "Resolución de nombres de dominio (DNS)", "VPN Acceso remoto", "Wifi Eduroam (ssid: eduroam)", "Wifi para visitantes (ssid: UCM-Visitantes)"],
    docencia: ["Aula Virtual", "Blackboard Collaborate", "Listados de clase", "Moodle: Aula Global", "Plataforma de cursos online Privados"],
    web: ["Analítica Web", "Emisión de certificados SSL", "Hosting: alojamiento de páginas web", "Portal de eventos", "Redirecciones web"]
};

const subcategoriasInc_texto = {
    administracion: ["Certificado digital de personal física", "Certificado electrónico de empleado público", "Registro electrónico", "Sede electrónica", "Portafirmas"],
    comunicaciones: ["Correo electrónico", "Google Meet", "Cuenta de Alumno", "Cuenta de personal", "Cuenta genérica"],
    conectividad: ["Cuenta de la Red SARA", "Conexión por cable en despachos", "Cortafuegos corporativo", "Resolución de nombres de dominio (DNS)", "VPN Acceso remoto", "Wifi Eduroam (ssid: eduroam)", "Wifi para visitantes (ssid: UCM-Visitantes)"],
    docencia: ["Aula Virtual", "Blackboard Collaborate", "Listados de clase", "Moodle: Aula Global", "Plataforma de cursos online Privados"],
    web: ["Analítica Web", "Emisión de certificados SSL", "Hosting: alojamiento de páginas web", "Portal de eventos", "Redirecciones web"]
};

const subcategorias_texto = ["Certificado digital de personal física", "Certificado electrónico de empleado público", "Registro electrónico", "Sede electrónica", "Portafirmas", "Correo electrónico", "Google Meet", "Cuenta de Alumno", "Cuenta de personal", "Cuenta genérica", "Cuenta de la Red SARA", "Conexión por cable en despachos", "Cortafuegos corporativo", "Resolución de nombres de dominio (DNS)", "VPN Acceso remoto", "Wifi Eduroam (ssid: eduroam)", "Wifi para visitantes (ssid: UCM-Visitantes)", "Aula Virtual", "Blackboard Collaborate", "Listados de clase", "Moodle: Aula Global", "Plataforma de cursos online Privados", "Analítica Web", "Emisión de certificados SSL", "Hosting: alojamiento de páginas web", "Portal de eventos", "Redirecciones web"];

const permisosCategoriaAlumno = [1,1,1,1,1];
const permisosCategoriaPAS = [1,1,1,1,1];
const permisosCategoriaPDI = [1,1,1,1,1];
const permisosCategoriaAA = [1,1,0,0,1];

const permisosSubCategoriaAlumno = {
    administracion: [1,0,1,1,0],
    comunicaciones: [1,1,1,0,0],
    conectividad: [0,0,1,0,1,1,0],
    docencia: [1,0,0,1,1],
    web: [0,0,0,1,0]
};

const permisosSubCategoriaPAS = {
    administracion: [1,1,1,1,1],
    comunicaciones: [1,1,0,1,1],
    conectividad: [1,1,1,1,1,1,1],
    docencia: [0,1,1,1,0],
    web: [1,1,1,1,1]
};

const permisosSubCategoriaPDI = {
    administracion: [1,1,1,1,1],
    comunicaciones: [1,1,0,1,1],
    conectividad: [0,1,1,0,1,1,1],
    docencia: [1,1,1,1,1],
    web: [1,1,1,1,1]
};

const permisosSubCategoriaAA= {
    administracion: [0,0,1,1,0],
    comunicaciones: [1,1,1,0,0],
    conectividad: [0,0,0,0,0,0,0],
    docencia: [0,0,0,0,0],
    web: [0,0,0,1,0]
};

/**
 * Clase que implementa metodos de utilidad.
 */
class Util {

    /**
     * Devuelve una lista con los posibles valores que puede tomar el campo 'perfil' de la tabla 'UCM_AW_CAU_USU_Usuarios' de la BD.
     * @returns Lista con los posibles perfiles que puede tener un usuario.
     */
    static profiles() {
        return(perfiles)
    }

    /**
     * Devuelve una lista con los posibles perfiles en texto plano que puede tener un usuario.
     * @param extended OPCIONAL. Si se establece a 'true' se devuelven los perfiles de forma completa, en vez de solo las siglas.
     * @returns Lista con los posibles perfiles en texto plano que puede tener un usuario.
     */
    static profilesText(extended=false) {
        if(extended) return(perfiles_texto);
        else return(perfiles_texto_extendido);
    }
    
    /**
     * Devuelve el texto plano de un perfil.
     * @param perfil Valor del campo 'perfil' de la tabla 'UCM_AW_CAU_USU_Usuarios' de la BD.
     * @param extended OPCIONAL. Si se establece a 'true' se devuelve el perfile de forma completa, en vez de solo las siglas.
     * @returns Texto plano del perfil introducido. Si no existe se devuelve 'null'.
     */
    toProfileText(perfil, extended=false) {
        for(let i = 0; i < Math.max(perfiles.length, perfiles_texto.length, perfiles_texto_extendido.length); i++) {
            if(perfiles[i] === perfil){
                if(extended) return(perfiles_texto_extendido[i]);
                else return(perfiles_texto[i]);
            }
        }
        return(null)
    }

    /**
     * Devuelve una lista con los posibles valores que puede tomar el campo "categoria" de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @param tipo Valor del campo 'tipo' ( "incidencia" / "sugerencia" / "felicitacion" ) de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @param textMode Si vale 'true' se devuelven las categorias en texto plano. Si vale 'false' (valor por defecto) se devuelven los valores que puede tomar el campo "categoria" de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @returns Lista con las posibles categorias que puede tener un aviso para el tipo indicado. Si no se indica el tipo se devuelven todas (opción por defecto).
     */
    static categories(tipo=null, textMode=false) {
        switch(tipo) {
            case "sugerencia":
                if(textMode) return(categoriasSug_texto);
                else return(categoriasSug);
            case "incidencia":
                if(textMode) return(categoriasInc_texto);
                else return(categoriasInc);
            case "felicitacion":
                if(textMode) return(categoriasFel_texto);
                else return(categoriasFel);
            default:
                if(textMode) return(categorias_texto);
                else return(categorias);
        }
    }

    /**
     * Devuelve el texto plano de una categoria.
     * @param categoria Valor del campo 'categoria' de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @returns Texto plano de la categoria introducida. Si no existe se devuelve 'null'.
     */
    toCategoryText(categoria) {
        for(let i = 0; i < Math.max(categorias.length, categorias_texto.length); i++) {
            if(categorias[i] === categoria) return(categorias_texto[i])
        }
        return(null)
    }

    /**
     * Devuelve una lista con los posibles valores que puede tomar el campo "subcategoria" de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @param tipo Valor del campo 'tipo' ( "incidencia" / "sugerencia" / "felicitacion" ) de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @param categoria Valor del campo 'categoria' de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @param textMode Si vale 'true' se devuelven las subcategorias en texto plano. Si vale 'false' (valor por defecto) se devuelven los valores que puede tomar el campo "subcategoria" de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @returns Lista con las posibles suncategorias que puede tener un aviso para el tipo y categoria indicado. Si no se indica el tipo o categoria se devuelven todas.
     */
    static subcategories(tipo=null, categoria=null, textMode=false) {
        switch(tipo) {
            case "sugerencia":
                if(subcategoriasSug[categoria] === undefined || subcategoriasSug[categoria] === null) {
                    if(textMode) return(subcategoriasSug_texto);
                    else return(subcategoriasSug);
                }
                else {
                    if(textMode) return(subcategoriasSug_texto[categoria]);
                    else return(subcategoriasSug[categoria]);
                }
            case "incidencia":
                if(subcategoriasInc[categoria] === undefined || subcategoriasInc[categoria] === null) {
                    if(textMode) return(subcategoriasInc_texto);
                    else return(subcategoriasInc);
                }
                else {
                    if(textMode) return(subcategoriasInc_texto[categoria]);
                    else return(subcategoriasInc[categoria]);
                }
            case "felicitacion":
                return([]);
            default:
                if(textMode) return(subcategorias_texto);
                else return(subcategorias);
        }
    }

    /**
     * Devuelve el texto plano de una subcategoria.
     * @param subcategoria Valor del campo 'subcategoria' de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @returns Texto plano de la subcategoria introducida. Si no existe se devuelve 'null'.
     */
    toSubcategoryText(subcategoria) {
        for(let i = 0; i < Math.max(subcategorias.length, subcategorias_texto.length); i++) {
            if(subcategorias[i] === subcategoria) return(subcategorias_texto[i])
        }
        return(null)
    }

    /**
     * Devuelve una lista con las categorias que puede tener un aviso según el tipo de aviso y de usuario.
     * @param perfil Tipo del usuario. Valor del campo 'perfil' de la tabla 'UCM_AW_CAU_USU_Usuarios' de la BD ( "alumno" / "pas" / "pdi" / "aa" ).
     * @param tipo Tipo de aviso. Valor del campo 'tipo' la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD ( "incidencia" / "sugerencia" / "felicitacion" ).
     * @returns Lista con las posibles categorias que puede tener un aviso del tipo indicado puesto por un usuario del tipo especificado.
     */
    getProfileCategories(perfil, tipo, textMode=false) {
        switch(tipo) {
            case "sugerencia":
                switch(perfil) {
                    case "alumno":
                        if(textMode) return categoriasSug_texto.filter( (c,i) => permisosCategoriaAlumno[i] ? true : false );
                        else return categoriasSug.filter( (c,i) => permisosCategoriaAlumno[i] ? true : false );
                    case "pas":
                        if(textMode) return categoriasSug_texto.filter( (c,i) => permisosCategoriaPAS[i] ? true : false );
                        else return categoriasSug.filter( (c,i) => permisosCategoriaPAS[i] ? true : false );
                    case "pdi":
                        if(textMode) return categoriasSug_texto.filter( (c,i) => permisosCategoriaPDI[i] ? true : false );
                        else return categoriasSug.filter( (c,i) => permisosCategoriaPDI[i] ? true : false );
                    case "aa":
                        if(textMode) return categoriasSug_texto.filter( (c,i) => permisosCategoriaAA[i] ? true : false );
                        else return categoriasSug.filter( (c,i) => permisosCategoriaAA[i] ? true : false );
                    default:
                        return [];
                }
            case "incidencia":
                switch(perfil) {
                    case "alumno":
                        if(textMode) return categoriasInc_texto.filter( (c,i) => permisosCategoriaAlumno[i] ? true : false );
                        else return categoriasInc.filter( (c,i) => permisosCategoriaAlumno[i] ? true : false );
                    case "pas":
                        if(textMode) categoriasInc_texto.filter( (c,i) => permisosCategoriaPAS[i] ? true : false );
                        else return categoriasInc.filter( (c,i) => permisosCategoriaPAS[i] ? true : false );
                    case "pdi":
                        if(textMode) categoriasInc_texto.filter( (c,i) => permisosCategoriaPDI[i] ? true : false );
                        else return categoriasInc.filter( (c,i) => permisosCategoriaPDI[i] ? true : false );
                    case "aa":
                        if(textMode) categoriasInc_texto.filter( (c,i) => permisosCategoriaAA[i] ? true : false );
                        else return categoriasInc.filter( (c,i) => permisosCategoriaAA[i] ? true : false );
                    default:
                        return [];
                }
            case "felicitacion":
                if(perfil === "alumno" || perfil === "pas" || perfil === "pdi" || perfil === "aa") {
                    if(textMode) return categoriasFel_texto;
                    else return categoriasFel;
                }
                else return [];
            default:
                return [];
        }
    }

    /**
     * Devuelve una lista con las subcategorias que puede tener un aviso según el tipo de aviso, la categoria del aviso y el tipo de usuario.
     * @param perfil Tipo del usuario. Valor del campo 'perfil' de la tabla 'UCM_AW_CAU_USU_Usuarios' de la BD ( "alumno" / "pas" / "pdi" / "aa" ).
     * @param tipo Tipo de aviso. Valor del campo 'tipo' la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD ( "incidencia" / "sugerencia" / "felicitacion" ).
     * @param categoria Valor del campo 'categoria' de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @returns Lista con las posibles subcategorias que puede tener un aviso del tipo y categoria indicados puesto por un usuario del tipo especificado.
     */
    getProfileSubcategories(perfil, tipo, categoria=null, textMode=false) {
        switch(tipo) {
            case "sugerencia":
                switch(perfil) {
                    case "alumno":
                        if(textMode) return subcategoriasSug_texto[categoria].filter( (c,i) => permisosSubCategoriaAlumno[categoria][i] ? true : false );
                        else return subcategoriasSug[categoria].filter( (c,i) => permisosSubCategoriaAlumno[categoria][i] ? true : false );
                    case "pas":
                        if(textMode) return subcategoriasSug_texto[categoria].filter( (c,i) => permisosSubCategoriaPAS[categoria][i] ? true : false );
                        else return subcategoriasSug[categoria].filter( (c,i) => permisosSubCategoriaPAS[categoria][i] ? true : false );
                    case "pdi":
                        if(textMode) return subcategoriasSug_texto[categoria].filter( (c,i) => permisosSubCategoriaPDI[categoria][i] ? true : false );
                        else return subcategoriasSug[categoria].filter( (c,i) => permisosSubCategoriaPDI[categoria][i] ? true : false );
                    case "aa":
                        if(textMode) return subcategoriasSug_texto[categoria].filter( (c,i) => permisosSubCategoriaAA[categoria][i] ? true : false );
                        else return subcategoriasSug[categoria].filter( (c,i) => permisosSubCategoriaAA[categoria][i] ? true : false );
                    default:
                        return [];
                }
            case "incidencia":
                switch(perfil) {
                    case "alumno":
                        if(textMode) return subcategoriasInc_texto[categoria].filter( (c,i) => permisosSubCategoriaAlumno[categoria][i] ? true : false );
                        else return subcategoriasInc[categoria].filter( (c,i) => permisosSubCategoriaAlumno[categoria][i] ? true : false );
                    case "pas":
                        if(textMode) return subcategoriasInc_texto[categoria].filter( (c,i) => permisosSubCategoriaPAS[categoria][i] ? true : false );
                        else return subcategoriasInc[categoria].filter( (c,i) => permisosSubCategoriaPAS[categoria][i] ? true : false );
                    case "pdi":
                        if(textMode) return subcategoriasInc_texto[categoria].filter( (c,i) => permisosSubCategoriaPDI[categoria][i] ? true : false );
                        else return subcategoriasInc[categoria].filter( (c,i) => permisosSubCategoriaPDI[categoria][i] ? true : false );
                    case "aa":
                        if(textMode) return subcategoriasInc_texto[categoria].filter( (c,i) => permisosSubCategoriaAA[categoria][i] ? true : false );
                        else return subcategoriasInc[categoria].filter( (c,i) => permisosSubCategoriaAA[categoria][i] ? true : false );
                    default:
                        return [];
                }
            case "felicitacion":
                return [];
            default:
                return [];
        }
    }

    /**
     * Devuelve el tipo de un aviso en texto plano.
     * @param tipo Valor del campo 'tipo' ( "incidencia" / "sugerencia" / "felicitacion" ) de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @returns Cadena de texto con el tipo de un aviso en texto plano. En caso de que no se introduzca un tipo correcto se devuelve "Error".
     */
    getNotifyType(tipo) {
        switch(tipo) {
            case "sugerencia":
                return("Sugerencia");
            case "incidencia":
                return("Incidencia");
            case "felicitacion":
                return("Felicitación");
            default:
                return("Error");
        }
    }

    /**
     * Devuelve la clase BootStrap asociada a un aviso.
     * @param tipo Valor del campo 'tipo' ( "incidencia" / "sugerencia" / "felicitacion" ) de la tabla 'UCM_AW_CAU_AVI_Avisos' de la BD.
     * @param classType OPCIONAL. Indica qué tipo concreto de la clase (atributo HTML 'class') BootStrap se quiere obtener (general, border, bg, table).
     * @returns Devuelve la clase (atributo HTML 'class') BootStrap que le corresponde a un aviso según el tipo de aviso que sea. Si no se especifica un clase Bootstrap comcreta con 'classType' se devuelve un objeto con todas las clases BootStrap.
     */
    getNotifyHtmlClass(tipo, classType = null) {
        let htmlClasses = {};
        switch(tipo) {
            case "sugerencia":
                htmlClasses = { color: "warning", border: "border-warning", bg: "bg-warning", table: "table-warning"};
                break;
            case "incidencia":
                htmlClasses = { color: "danger", border: "border-danger", bg: "bg-danger", table: "table-danger"};
                break;
            case "felicitacion":
                htmlClasses = { color: "success", border: "border-success", bg: "bg-success", table: "table-success"};
                break;
            default:
                htmlClasses = { color: "light", border: "border-black", bg: "bg-light", table: "table-light"};
                break;
        }
        if(classType === undefined || classType === null || classType === "null" || typeof(classType) !== "string") return(htmlClasses);
        else{
            if(htmlClasses[classType] === undefined) return(htmlClasses.color);
            else return(htmlClasses[classType]);
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
            case "sugerencia":
                return("img\\icons\\sugerencia.png");
            case "incidencia":
                return("img\\icons\\incidencia.png");
            case "felicitacion":
                return("img\\icons\\felicitacion.png");
            default:
                return("img\\icons\\desconocido.png");
        }
    }

    /**
     * Convert newlines ('\n') into line break (<br>).
     * @param str String to parse.
     * @param isXhtml If 'true' use XHTML way: changes '\n' into '<br />'. If 'false' changes '\n' into '<br>'
     * @returns Parsed string.
     * Source: https://www.npmjs.com/package/nl2br
     */
    nl2br(str, isXhtml) {
        if(str === undefined || str === null || str === "null" || typeof(str) !== "string") return str;
        var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    };

    /**
     * Devuelve un objeto Date a partir de una fecha en formato SQL.
     * @param sqldate Cadena de texto con la fecha en formato SQL.
     * @returns Objeto Date con la fecha indicada como parámetro.
     */
    dateSQL2JS(sqldate) {
        return new Date(Date.parse(sqldate.replace(/-/g, '/')));
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
     * Devuelve el nombre del estado de un aviso.
     * @param state Estado del aviso (1-4).
     * @returns Nombre del estado del aviso: 1 ('Abierto')  / 2 ('Asignado') / 3 ('Cerrado') / 4 ('Borrado') / otro ('Desconocido') .
     */
    getStateName(state) {
        switch(state){
            case 1:
                return("Abierto");
            case 2:
                return("Asignado");
            case 3:
                return("Cerrado");
            case 4:
                return("Borrado");
            default:
                return("Desconocido");
        }
    }

    /**
     * Devuelve las acciones que un técnico puede realizar con los avisos dependiendo del estado en el que estén.
     * @param state Estado del aviso: 1 (open)  / 2 (assigned) / 3 (closed) / 4 (cancelled) .
     * @param idTec Id del técnico que tiene asignado el aviso.
     * @param myIdTec El id del técnico que está usando la applicaión.
     * @returns Devuelve un array con las posibles acciones que se pueden realizar sobre un aviso.
     * actions = [view, assign, close, cancel]. Cada una con valores: -1 (not present) / 0 (disable) / 1 (enable) .
     */
    getNotifyTechnicianActions(state, idTec, myIdTec) {
        if(state === undefined || state === null || state === "null" || typeof(state) !== "number") return([-1, -1, -1, -1]);
        switch(state){
            case 1:
                return([-1, 1, -1, 1]);
            case 2:
                if(idTec === myIdTec) return([-1, -1, 1, 1]);
                else return([-1, 0, -1, 0]);
            case 3:
                return([1, -1, -1, -1]);
            case 4:
                return([1, -1, -1, -1]);
            default:
                return([-1, -1, -1, -1]);
        }
    }
    
    /**
     * Devuelve las acciones que un usario normal puede realizar con sus avisos (solo verlos).
     * @returns Devuelve un array con las posibles acciones que se pueden realizar sobre un aviso propio.
     * actions = [view, assign, close, cancel]. Cada una con valores: -1 (not present) / 0 (disable) / 1 (enable) .
     */
    getNotifyUserActions() {
        return([1, -1, -1, -1]);
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
            htmlClass: this.getNotifyHtmlClass(aviso.tipo, "table"),
            imageURL: this.getNotifyImageURL(aviso.tipo),
            date: aviso.fecha.toLocaleDateString(),
            resume: this.getNotifyResume(aviso.observaciones),
            state: estado,
            actions: this.getNotifyTechnicianActions(estado, aviso.idTec, myIdTec)
        }
        return htmlNotify;
    }
    
    /**
     * Devuelve la información necesaria para mostrarle un aviso abierto a un usuario estándar.
     * @param aviso Los datos del aviso sacados de la BD
     * @returns Devuelve un objeto con la información necesaria para mostrar un aviso en la tabla de mis avisos de la página principal de un usuario estándar.
     */
    toUserHtmlOpenNotify(aviso) {
        if(aviso === undefined || aviso === null || aviso === "null" || typeof(aviso) != "object" || Array.isArray(aviso) ) return {};
        const htmlNotify = {
            id: aviso.idAvi,
            htmlClass: this.getNotifyHtmlClass(aviso.tipo, "table"),
            imageURL: this.getNotifyImageURL(aviso.tipo),
            date: aviso.fecha.toLocaleDateString(),
            resume: this.getNotifyResume(aviso.observaciones),
            state: this.getNotifyState(aviso),
            name: aviso.nombre,
            actions: this.getNotifyUserActions()
        }
        return htmlNotify;
    }

    /**
     * Devuelve la información necesaria para mostrarle un aviso cerrado a un usuario estándar.
     * @param aviso Los datos del aviso sacados de la BD
     * @returns Devuelve un objeto con la información necesaria para mostrar un aviso en la tablade historico de avisos de la página principal de un usuario estándar.
     */
    toUserHtmlClosedNotify(aviso) {
        if(aviso === undefined || aviso === null || aviso === "null" || typeof(aviso) != "object" || Array.isArray(aviso) ) return {};
        const htmlNotify = {
            id: aviso.idAvi,
            htmlClass: this.getNotifyHtmlClass(aviso.tipo, "table"),
            imageURL: this.getNotifyImageURL(aviso.tipo),
            date: aviso.fecha.toLocaleDateString(),
            resume: this.getNotifyResume(aviso.observaciones),
            state: this.getNotifyState(aviso),
            actions: this.getNotifyUserActions()
        }
        return htmlNotify;
    }

    /**
     * Devuelve la información necesaria para mostrar un aviso.
     * @param aviso Los datos del aviso sacados de la BD
     * @returns Devuelve un objeto con la información necesaria para mostrar un aviso en el modal de aviso.
     */
    toModalHtmlNotify(aviso) {
        if(aviso === undefined || aviso === null || aviso === "null" || typeof(aviso) != "object" || Array.isArray(aviso) ) return {};
        const estado = this.getNotifyState(aviso);
        const htmlNotify = {
            id: aviso.idAvi,
            type: this.getNotifyType(aviso.tipo),
            htmlClasses: this.getNotifyHtmlClass(aviso.tipo),
            imageURL: this.getNotifyImageURL(aviso.tipo),
            category: this.toCategoryText(aviso.categoria),
            subcategory: this.toSubcategoryText(aviso.subcategoria),
            date: aviso.fecha.toLocaleDateString(),
            observation: this.nl2br(aviso.observaciones),
            comment: this.nl2br(aviso.comentario),
            state: estado,
            stateName: this.getStateName(estado),
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
     * @param args Array de objetos, o un solo objeto, con los datos de un usuario estándar o técnico recuperados de la BD.
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

    getAvisosNumbers(avisos) {
        const avisosData ={
            numAvisos : avisos.length,
            numInc : avisos.filter( obj =>{ return obj.tipo==="incidencia"}).length,
            numSug : avisos.filter( obj =>{ return obj.tipo==="sugerencia"}).length,
            numFel : avisos.filter( obj =>{ return obj.tipo==="felicitacion"}).length,
        }
        return avisosData;
    }

}

module.exports = Util;