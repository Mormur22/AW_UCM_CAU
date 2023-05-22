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
            loadTechnicianList( () => { $("#noticeModal").modal('show'); } );
        }).fail(function(jqXHR, textStatus) {
            alet("Error al intentar recuperar los datos.");
        });;
    });
}

function loadTechnicianList(callback) {
    $( document ).ready(function() {
        const dataContainer = $("#noticeTech_sel");
        $.ajax({
            url: "/technician_list",
            dataType: "json"
        }).done(function(data) {
            dataContainer.empty();
            data.forEach(t => { dataContainer.append('<option value="' + t.idTec + '">' + t.nombre + '</option>'); });
            if(callback) callback();
        }).fail(function(jqXHR, textStatus) {
            dataContainer.empty()
            dataContainer.html('<option value="0">ERROR</option>');
            callback();
        });;
    });
}

function sendAssign(id) {
    $.confirm({
        title: "<img src='/img/icons/advertencia-azul.png' width='100' height='100'><br/><br/>Confirmar asignación",
        content: "¿Desea asignar el aviso al ténico seleccionado (" + $("#noticeTech_sel  option:selected").text() + ")?",
        type: "orange", // "red" / "orange" / "green" / "blue" / "dark" / "purple"
        theme: "supervan", // "light" / "dark" / "modern" / "supervan" / "material" / "bootstrap"
        animation: "scale",
        closeAnimation: "scale",
        animationSpeed: 1000,
        autoClose: "cancelBtn|8000",
        escapeKey: "cancelBtn",
        closeIcon: "cancelBtn",
        buttons: {
            confirmBtn: {
                text: 'Asignar',
                action: function () {
                    if(window.currentUser.id === id) {
                        $.alert({
                            title: "ERROR",
                            content: "No puede borrar su propio usuario."
                        });
                    }
                    else{
                        $.ajax({
                            url: "/notice/assign",
                            method: "POST",
                            data: {
                                idAvi: id,
                                idTec: $("#noticeTech_sel").val()
                              },
                            dataType: "json"
                        }).done(function(data) {
                            console.log(data);
                            if(data === true) $.alert({
                                    title: "Confirmación",
                                    content: "Técnico asignado correctamente.",
                                    onClose: function(){
                                        closeModal();
                                        reloadTable();
                                    }
                                });
                            else $.alert({
                                title: "Error",
                                content: "No se pudo asignar el técnico."
                            });
                        });
                    }
                }
            },
            cancelBtn: {
                text: 'Cancelar',
                action: function () {
                    $.alert('Acción cancelada');
                }
            }
        }
    });
}

function cancelNotify(id) {
    alert("Cancelar aviso " + id);
}

function sendForm(id) {
    alert("Enviar formulario");
}

function closeModal() {
    $("#noticeModal").modal('hide');
}

function reloadTable() {
    const option = $("#tab_avi").data("option");
    const op = Number(option);
    loadData(op);
}