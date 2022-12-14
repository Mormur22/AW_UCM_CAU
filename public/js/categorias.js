const permisosCatgoriaAlumno = [1,1,1,1,1];
const permisosCatgoriaPAS = [1,1,1,1,1];
const permisosCatgoriaPDI = [1,1,1,1,1];
const permisosCatgoriaAA = [1,1,0,0,1];

const categoriasInc = ["administracion","comunicaciones","conectividad","docencia","web"];

const tabla_permisos=
{ 


    Administracion_digital: {
       
            "certificado_digital":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",0]],
        
            "certificado_electronico":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        

        
            "registro_electronico":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",1]],
        

        
            "sede_electronica":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",1]],
        

        
            "portafirmas":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        
    },

    Comunicaciones: {
       
            "correo_electronico":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",1]],
        
        
            "google_meet":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",1]],
        

        
            "cuenta_alumno":
            [["Alumno",1],["PAS",0],["PDI",0],["AA",1]],
        

        
            "cuenta_personal":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
            

            
            "cuenta_generica":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        
    
    },

    Conectividad: {
        
        
            "Cuentas de la Red SARA":
            [["Alumno",0],["PAS",1],["PDI",0],["AA",0]],
        

        
            "Conexion por cable en despachos":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Cortafuegos corporativo":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Resolucion DNS":
            [["Alumno",0],["PAS",1],["PDI",0],["AA",0]],
        

        
            "VPN Acceso Remoto":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Wifi Eduroam":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Wifi UCM":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        

    },

    Docencia: {
        
        
            "Aula Virtual":
            [["Alumno",1],["PAS",0],["PDI",1],["AA",0]],
        

        
            "Collaborate":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Listados de clase":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Moodle: Aula Global":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Plataforma de recursos online privados":
            [["Alumno",1],["PAS",0],["PDI",1],["AA",0]],
        

    },

    Web: {
        
            "Analítica web":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Emision de certificados":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Hosting: alojamiento de paginas web":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        

        
            "Portal de eventos":
            [["Alumno",1],["PAS",1],["PDI",1],["AA",1]],
        

        
            "Redirecciones Web":
            [["Alumno",0],["PAS",1],["PDI",1],["AA",0]],
        

    }

}


const parseCookie = str =>
  str
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});


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

window.onload = function () {
    try{
        const cookies = parseCookie(document.cookie);
        console.log(cookies);
        window.currentUser=JSON.parse(cookies.cookieUser);
        console.log( window.currentUser);
    }
    catch(error){
        console.log("Error recuperndo cookie");
    }
    let catSel = document.getElementById("Categoria");
    let subSel = document.getElementById("Subcategoria");


        // todo: Disable all  Selection by setting disabled to false
    catSel = false; // remove all options bar first
    subSel = false; // remove all options bar first
    
    for (let categoria in tabla_permisos) {
        catSel.options[catSel.options.length] = new Option(
        categoria,
        categoria
        );
    }

    catSel.onchange = function () {
		 
        subSel = true; // remove all options bar first

        if (this.selectedIndex < 1)
            return; // done
        
        for (var subcat in tabla_permisos[this.value]) {
            subSel.options[subSel.options.length] = new Option(subcat, subcat);
        }
   }
}

$("#ModalIncidencia").one("show.bs.modal", openInc);

function openInc(){
    const catSel = $("#Categoria");
    //debugger
    catSel.empty();

    getCategorias(window.currentUser.perfil)
        .map((cat) => {
            console.log(cat);
            $("#Categoria").append(new Option(cat, cat));
        });
    // Agregar el evento change() a catSel y impementar loadSubCat()
}