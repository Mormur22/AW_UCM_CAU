const permisosCatgoriaAlumno = [1,1,1,1,1];
const permisosCatgoriaPAS = [1,1,1,1,1];
const permisosCatgoriaPDI = [1,1,1,1,1];
const permisosCatgoriaAA = [1,1,0,0,1];

const categoriasFel = ["Archivo Universitario", "Asesoría Jurídica", "Biblioteca", "Centro de Información", "Departamentos docentes", "Inspección de Servicios", "Oficina de Gestión de Infraestructuras y Mantenimiento", "Servicio de Administración", "Servicios Informáticos", "Servicio de Documentación", "Servicio de Imprenta", "Servicio de Cafetería", "Toda la Universidad"];
const categoriasFelVal = ["archivo", "asesoria_juridica", "biblioteca", "centro_informacion", "departamentos_docentes", "inspeccion_servicios", "oficina_gestion", "administracion", "informatica", "documentacion", "imprenta", "cafeteria", "universidad"];

const categoriasInc = ["Administracion Digital","Comunicaciones","Conectividad","Docencia e","Web"];
const categoriasIncVal = ["administracion","comunicaciones","conectividad","docencia","web"];

const subCategoriasInc = {
    administracion: ["Certificado digital de personal física", "Certificado electrónico de empleado público", "Registro electrónico", "Sede electrónica", "Portafirmas"],
    comunicaciones: ["Correo electrónico","Google Meet","Cuenta de Alumno","Cuenta de personal","Cuenta genérica"],
    conectividad: ["Cuenta de la Red SARA","Conexión por cable en despachos","Cortafuegos corporativo","Resolución de nombres de dominio (DNS)","VPN Acceso remoto","Wifi Eduroam (ssid: eduroam)","Wifi para visitantes (ssid: UCM-Visitantes)"],
    docencia: ["Aula Virtual","Blackboard Collaborate","Listados de clase","Moodle: Aula Global","Plataforma de cursos online Privados"],
    web: ["Analítica Web","Emisión de certificados SSL","Hosting: alojamiento de páginas web","Portal de eventos","Redirecciones web"]
};

const subCategoriasIncVal = {
    administracion: ["certificado_digital", "certificado_electronico", "registro_electronico", "sede_electronica", "portafirmas"],
    comunicaciones: ["correo_electronico","google_meet","cuenta_alumno","cuenta_personal","cuenta_generica"],
    conectividad: ["cuenta_sara","conexion_cable","cortafuegos","dns","vpn","wifi_eduroam","wifi_visitantes"],
    docencia: ["aula_virtual","blackboard_collaborate","listado_clase","moodle","cursos_online"],
    web: ["analitica_web","certificado_ssl","hosting","portal_eventos","redirecciones_web"]
};

const permisosSubCatgoriaAlumno = {
    administracion: [1,0,1,1,0],
    comunicaciones: [1,1,1,0,0],
    conectividad: [0,0,1,0,1,1,0],
    docencia: [1,0,0,1,1],
    web: [0,0,0,1,0]
};

const permisosSubCatgoriaPAS = {
    administracion: [1,1,1,1,1],
    comunicaciones: [1,1,0,1,1],
    conectividad: [1,1,1,1,1,1,1],
    docencia: [0,1,1,1,0],
    web: [1,1,1,1,1]
};

const permisosSubCatgoriaPDI = {
    administracion: [1,1,1,1,1],
    comunicaciones: [1,1,0,1,1],
    conectividad: [0,1,1,0,1,1,1],
    docencia: [1,1,1,1,1],
    web: [1,1,1,1,1]
};

const permisosSubCatgoriaAA= {
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
            return categoriasInc.filter( (c,i) => permisosCatgoriaAlumno[i] ? true : false );
        case "pas":
            return categoriasInc.filter( (c,i) => permisosCatgoriaPAS[i] ? true : false );
        case "pdi":
            return categoriasInc.filter( (c,i) => permisosCatgoriaPDI[i] ? true : false );
        case "aa":
            return categoriasInc.filter( (c,i) => permisosCatgoriaAA[i] ? true : false );
        default:
            return [];
    }
}

function getCategoriasVal(perfil) {
    switch(perfil){
        case "alumno":
            return categoriasIncVal.filter( (c,i) => permisosCatgoriaAlumno[i] ? true : false );
        case "pas":
            return categoriasIncVal.filter( (c,i) => permisosCatgoriaPAS[i] ? true : false );
        case "pdi":
            return categoriasIncVal.filter( (c,i) => permisosCatgoriaPDI[i] ? true : false );
        case "aa":
            return categoriasIncVal.filter( (c,i) => permisosCatgoriaAA[i] ? true : false );
        default:
            return [];
    }
}

function getSubCategorias(perfil, categoria) {
    switch(perfil){
        case "alumno":
            return subCategoriasInc[categoria].filter( (c,i) => permisosSubCatgoriaAlumno[categoria][i] ? true : false );
        case "pas":
            return subCategoriasInc[categoria].filter( (c,i) => permisosSubCatgoriaPAS[categoria][i] ? true : false );
        case "pdi":
            return subCategoriasInc[categoria].filter( (c,i) => permisosSubCatgoriaPDI[categoria][i] ? true : false );
        case "aa":
            return subCategoriasInc[categoria].filter( (c,i) => permisosSubCatgoriaAA[categoria][i] ? true : false );
        default:
            return [];
    }
}

function getSubCategoriasVal(perfil, categoria) {
    switch(perfil){
        case "alumno":
            return subCategoriasIncVal[categoria].filter( (c,i) => permisosSubCatgoriaAlumno[categoria][i] ? true : false );
        case "pas":
            return subCategoriasIncVal[categoria].filter( (c,i) => permisosSubCatgoriaPAS[categoria][i] ? true : false );
        case "pdi":
            return subCategoriasIncVal[categoria].filter( (c,i) => permisosSubCatgoriaPDI[categoria][i] ? true : false );
        case "aa":
            return subCategoriasIncVal[categoria].filter( (c,i) => permisosSubCatgoriaAA[categoria][i] ? true : false );
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

    const catval = getCategoriasVal(window.currentUser.perfil);
    getCategorias(window.currentUser.perfil)
        .map((cat,i) => {
            catSel.append(new Option(cat,catval[i]));
        });

    const subcCatSel = $("#SubcategoriaInc");
    catSel.change(function(){
        subcCatSel.empty();
        const categoria=$(this).val();
        const subcatval = getSubCategoriasVal(window.currentUser.perfil,categoria);
        getSubCategorias(window.currentUser.perfil,categoria)
        .map((subcat,i) => {
            subcCatSel.append(new Option(subcat,subcatval[i]));
        });
    });

    
}

$("#ModalSugerencia").one("show.bs.modal", openSug);

function openSug() {
    const catSel = $("#CategoriaSug");
    catSel.empty();

    const catval = getCategoriasVal(window.currentUser.perfil);
    getCategorias(window.currentUser.perfil)
        .map((cat,i) => {
            catSel.append(new Option(cat,catval[i]));
        });

    const subcCatSel = $("#SubcategoriaSug");
    catSel.change(function(){
        subcCatSel.empty();
        const categoria=$(this).val();
        const subcatval = getSubCategoriasVal(window.currentUser.perfil,categoria);
        getSubCategorias(window.currentUser.perfil,categoria)
        .map((subcat,i) => {
            subcCatSel.append(new Option(subcat,subcatval[i]));
        });
    });
}

$("#ModalFelicitacion").one("show.bs.modal", openFel);

function openFel() {
    const catSel = $("#CategoriaFel");
    catSel.empty();

    const catval = categoriasFelVal;
    categoriasFel.map((cat,i) => {
            catSel.append(new Option(cat,catval[i]));
        });
}
