const permisosCategoriaAlumno = [1,1,1,1,1];
const permisosCategoriaPAS = [1,1,1,1,1];
const permisosCategoriaPDI = [1,1,1,1,1];
const permisosCategoriaAA = [1,1,0,0,1];


const categoriasInc = ["administracion", "comunicaciones", "conectividad", "docencia", "web"];
const categoriasInc_texto = ["Administracion Digital", "Comunicaciones", "Conectividad", "Docencia e","Web"];

const categoriasFel = ["archivo", "asesoria_juridica", "biblioteca", "centro_informacion", "departamentos_docentes", "inspeccion_servicios", "oficina_gestion", "administracion", "informatica", "documentacion", "imprenta", "cafeteria", "universidad"];
const categoriasFel_texto = ["Archivo Universitario", "Asesoría Jurídica", "Biblioteca", "Centro de Información", "Departamentos docentes", "Inspección de Servicios", "Oficina de Gestión de Infraestructuras y Mantenimiento", "Servicio de Administración", "Servicios Informáticos", "Servicio de Documentación", "Servicio de Imprenta", "Servicio de Cafetería", "Toda la Universidad"];

const subcategoriasInc = {
    administracion: ["certificado_digital", "certificado_electronico", "registro_electronico", "sede_electronica", "portafirmas"],
    comunicaciones: ["correo_electronico", "google_meet","cuenta_alumno", "cuenta_personal", "cuenta_generica"],
    conectividad: ["cuenta_sara", "conexion_cable", "cortafuegos", "dns", "vpn", "wifi_eduroam", "wifi_visitantes"],
    docencia: ["aula_virtual", "blackboard_collaborate", "listado_clase", "moodle", "cursos_online"],
    web: ["analitica_web", "certificado_ssl", "hosting", "portal_eventos", "redirecciones_web"]
};

const subcategoriasInc_texto = {
    administracion: ["Certificado digital de personal física", "Certificado electrónico de empleado público", "Registro electrónico", "Sede electrónica", "Portafirmas"],
    comunicaciones: ["Correo electrónico", "Google Meet", "Cuenta de Alumno", "Cuenta de personal", "Cuenta genérica"],
    conectividad: ["Cuenta de la Red SARA", "Conexión por cable en despachos", "Cortafuegos corporativo", "Resolución de nombres de dominio (DNS)", "VPN Acceso remoto", "Wifi Eduroam (ssid: eduroam)", "Wifi para visitantes (ssid: UCM-Visitantes)"],
    docencia: ["Aula Virtual", "Blackboard Collaborate", "Listados de clase", "Moodle: Aula Global", "Plataforma de cursos online Privados"],
    web: ["Analítica Web", "Emisión de certificados SSL", "Hosting: alojamiento de páginas web", "Portal de eventos", "Redirecciones web"]
};

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

if(!parseCookie){
    var parseCookie = str =>
        str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
}

function getCategorias(perfil) {
    switch(perfil){
        case "alumno":
            return categoriasInc.filter( (c,i) => permisosCategoriaAlumno[i] ? true : false );
        case "pas":
            return categoriasInc.filter( (c,i) => permisosCategoriaPAS[i] ? true : false );
        case "pdi":
            return categoriasInc.filter( (c,i) => permisosCategoriaPDI[i] ? true : false );
        case "aa":
            return categoriasInc.filter( (c,i) => permisosCategoriaAA[i] ? true : false );
        default:
            return [];
    }
}

function getCategoriasTexto(perfil) {
    switch(perfil){
        case "alumno":
            return categoriasInc_texto.filter( (c,i) => permisosCategoriaAlumno[i] ? true : false );
        case "pas":
            return categoriasInc_texto.filter( (c,i) => permisosCategoriaPAS[i] ? true : false );
        case "pdi":
            return categoriasInc_texto.filter( (c,i) => permisosCategoriaPDI[i] ? true : false );
        case "aa":
            return categoriasInc_texto.filter( (c,i) => permisosCategoriaAA[i] ? true : false );
        default:
            return [];
    }
}

function getSubCategorias(perfil, categoria) {
    switch(perfil){
        case "alumno":
            return subcategoriasInc[categoria].filter( (c,i) => permisosSubCategoriaAlumno[categoria][i] ? true : false );
        case "pas":
            return subcategoriasInc[categoria].filter( (c,i) => permisosSubCategoriaPAS[categoria][i] ? true : false );
        case "pdi":
            return subcategoriasInc[categoria].filter( (c,i) => permisosSubCategoriaPDI[categoria][i] ? true : false );
        case "aa":
            return subcategoriasInc[categoria].filter( (c,i) => permisosSubCategoriaAA[categoria][i] ? true : false );
        default:
            return [];
    }
}

function getSubCategoriasTexto(perfil, categoria) {
    switch(perfil){
        case "alumno":
            return subcategoriasInc_texto[categoria].filter( (c,i) => permisosSubCategoriaAlumno[categoria][i] ? true : false );
        case "pas":
            return subcategoriasInc_texto[categoria].filter( (c,i) => permisosSubCategoriaPAS[categoria][i] ? true : false );
        case "pdi":
            return subcategoriasInc_texto[categoria].filter( (c,i) => permisosSubCategoriaPDI[categoria][i] ? true : false );
        case "aa":
            return subcategoriasInc_texto[categoria].filter( (c,i) => permisosSubCategoriaAA[categoria][i] ? true : false );
        default:
            return [];
    }
}

window.onload = function () {
    try{
        const cookies = parseCookie(document.cookie);
        window.currentUser=JSON.parse(cookies.cookieUser);
    }
    catch(error){
        console.log("Error recuperndo cookie");
    }
}
/*
$("#ModalIncidenciaClose").click(removeModalsBackground);
$("#ModalSugerenciaClose").click(removeModalsBackground);
$("#ModalFelicitacionClose").click(removeModalsBackground);

function removeModalsBackground() {
    if($('.modal-backdrop').is(':visible')) {
        // Esto cierra el modal pero impide que se vuelva a abrir
        $('.modal-backdrop').remove(); 
    };
}
*/
$("#ModalIncidencia").one("show.bs.modal", openInc);

function openInc() {

    const catSel = $("#CategoriaInc");
    catSel.empty();

    const catval = getCategorias(window.currentUser.perfil);
    getCategoriasTexto(window.currentUser.perfil)
        .map((cat,i) => {
            catSel.append(new Option(cat,catval[i]));
        });

    const subcCatSel = $("#SubcategoriaInc");
    catSel.change(function(){
        subcCatSel.empty();
        const categoria=$(this).val();
        const subcatval = getSubCategorias(window.currentUser.perfil,categoria);
        getSubCategoriasTexto(window.currentUser.perfil,categoria)
        .map((subcat,i) => {
            subcCatSel.append(new Option(subcat,subcatval[i]));
        });
    });

    
}

$("#ModalSugerencia").one("show.bs.modal", openSug);

function openSug() {
    const catSel = $("#CategoriaSug");
    catSel.empty();

    const catval = getCategorias(window.currentUser.perfil);
    getCategoriasTexto(window.currentUser.perfil)
        .map((cat,i) => {
            catSel.append(new Option(cat,catval[i]));
        });

    const subcCatSel = $("#SubcategoriaSug");
    catSel.change(function(){
        subcCatSel.empty();
        const categoria=$(this).val();
        const subcatval = getSubCategorias(window.currentUser.perfil,categoria);
        getSubCategoriasTexto(window.currentUser.perfil,categoria)
        .map((subcat,i) => {
            subcCatSel.append(new Option(subcat,subcatval[i]));
        });
    });
}

$("#ModalFelicitacion").one("show.bs.modal", openFel);

function openFel() {
    const catSel = $("#CategoriaFel");
    catSel.empty();

    const catval = categoriasFel;
    categoriasFel_texto.map((cat,i) => {
            catSel.append(new Option(cat,catval[i]));
        });
}
