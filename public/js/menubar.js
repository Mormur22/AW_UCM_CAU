"use strict";

let actualOp = 0;
const contenedorTabla = $("#tabla");
const numOp = 4;

function option(op) {
    const newOp = Number(op);
    if(newOp>0 && newOp<=numOp) {
        if(actualOp != newOp) {
            $( "#opcion"+newOp ).attr("data-showin", "foreground" );
            if(actualOp>0 && actualOp<=numOp) $( "#opcion"+actualOp ).attr("data-showin", "background" );
            actualOp = newOp;
            loadData(newOp);
        }
    }
}

function loadData(op) {
    switch(op) {
        case 1: loadIncomingNotifies(); 
    }
}

function  loadIncomingNotifies() {
    $( document ).ready(function() {
        const dataContainer = $("#data");
        dataContainer.html("Cargando...");
        $.ajax({
            url: "/tables/notifies",
            dataType: "html"
        }).done(function(data) {
            dataContainer.empty()
            dataContainer.html(data);
        }).fail(function(jqXHR, textStatus) {
            dataContainer.empty()
            dataContainer.html("&nbsp;&nbsp;&nbsp;Error al intentar recuperar los datos.");
        });;
    });
}
