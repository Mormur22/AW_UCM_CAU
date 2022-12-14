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


window.onload = function () {

  
    const catSel = document.getElementById("Categoria"),
      subSel = document.getElementById("Subcategoria")


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