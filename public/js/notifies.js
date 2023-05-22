"use strict";

function viewMyNotify(id){
    $( document ).ready(function() {
        const modalContainer = $("#modal");
        $.ajax({
            url: "/notice/view/"+id,
            dataType: "html"
        }).done(function(data) {
            modalContainer.empty();
            modalContainer.html(data);
            $("#noticeModal").modal('show');
        }).fail(function(jqXHR, textStatus) {
            alet("Error al intentar recuperar los datos.");
        });;
    });
}; 

function viewNotify(id) {
    $( document ).ready(function() {
        const modalContainer = $("#modal");
        $.ajax({
            url: "/notice/view/"+id,
            dataType: "html"
        }).done(function(data) {
            modalContainer.empty();
            modalContainer.html(data);
            $("#noticeModal").modal('show');
        }).fail(function(jqXHR, textStatus) {
            alet("Error al intentar recuperar los datos.");
        });;
    });
}

function assignNotify(id) {
    $( document ).ready(function() {
        const modalContainer = $("#modal");
        $.ajax({
            url: "/notice/assign/"+id,
            dataType: "html"
        }).done(function(data) {
            modalContainer.empty();
            modalContainer.html(data);
            loadTechnicianList( $("#noticeModal").modal('show') );
        }).fail(function(jqXHR, textStatus) {
            alet("Error al intentar recuperar los datos.");
        });;
    });
}

function  loadTechnicianList(callback) {
    $( document ).ready(function() {
        const dataContainer = $("#noticeTech_sel");
        $.ajax({
            url: "/technician_list",
            dataType: "json"
        }).done(function(data) {
            dataContainer.empty();
            data.forEach(t => { dataContainer.append('<option value="' + t.idTec + '">' + t.nombre + '</option>'); });
            callback();
        }).fail(function(jqXHR, textStatus) {
            dataContainer.empty()
            dataContainer.html('<option value="0">ERROR</option>');
            callback();
        });;
    });
}

function cancelNotify(id) {
    alert("Cancelar aviso " + id);
}

function sendForm(id) {
    alert("Enviar");
    ////notice/:idAvi
}