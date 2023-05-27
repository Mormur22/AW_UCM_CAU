"use strict";

function showModal(modalId) {
    $("#crearAvisoModal").one("hidden.bs.modal", function () {
        $("#" + modalId).modal("show");
        switch(modalId){
            case "sugerenciaModal":
                loadCategoryList("sugerencia");
                $("#categoriaSug").on("input", function() { loadSubcategoryList("sugerencia"); });
                break;
            case "incidenciaModal":
                loadCategoryList("incidencia");
                $("#categoriaInc").on("input", function() { loadSubcategoryList("incidencia"); });
                break;
            case "felicitacionModal":
                loadCategoryList("felicitacion");
                break;       
        }
    })
}

function loadCategoryList(tipo) {
    let selectCategory = null;
    switch(tipo) {
        case "sugerencia":
            selectCategory = $("#categoriaSug");
            break;
        case "incidencia":
            selectCategory = $("#categoriaInc");
            break;
        case "felicitacion":
            selectCategory = $("#categoriaFel");
            break;
    }
    $( document ).ready(function() {
        $.ajax({
            url: "/category_list/" + tipo,
            dataType: "json"
        }).done(function(data) {
            selectCategory.empty();
            let defaultOption = new Option("Seleccione una categoria","default");
            defaultOption.setAttribute("selected", "selected");
            defaultOption.setAttribute("disabled", "disabled");
            selectCategory.append(defaultOption);
            data.forEach(c => { selectCategory.append(new Option(c.text,c.value)); } );
        }).fail(function(jqXHR, textStatus) {
            selectCategory.empty()
            let errorOption = new Option("ERROR", "error");
            errorOption.setAttribute("selected", "selected");
            errorOption.setAttribute("disabled", "disabled");
            selectCategory.append(errorOption);
        });
    });
}

function loadSubcategoryList(tipo) {
    let selectCategory = null;
    let selectSubcategory = null;
    switch(tipo) {
        case "sugerencia":
            selectCategory = $("#categoriaSug");
            selectSubcategory = $("#subcategoriaSug");
            break;
        case "incidencia":
            selectCategory = $("#categoriaInc");
            selectSubcategory = $("#subcategoriaInc");
            break;
    }
    $( document ).ready(function() {
        $.ajax({
            url: "/subcategory_list",
            method: "POST",
            data: {
                typeAvi: tipo,
                category: selectCategory.val(),
              },
            dataType: "json"
        }).done(function(data) {
            selectSubcategory.empty();
            let defaultOption = new Option("Seleccione una subcategoria","default");
            defaultOption.setAttribute("selected", "selected");
            defaultOption.setAttribute("disabled", "disabled");
            selectSubcategory.append(defaultOption);
            data.forEach(c => { selectSubcategory.append(new Option(c.text,c.value)); } );
        }).fail(function(jqXHR, textStatus) {
            selectSubcategory.empty()
            let errorOption = new Option("ERROR", "error");
            errorOption.setAttribute("selected", "selected");
            errorOption.setAttribute("disabled", "disabled");
            selectSubcategory.append(errorOption);
        });
    });
}
