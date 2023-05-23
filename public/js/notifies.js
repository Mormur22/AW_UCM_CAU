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
            openModal();
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
            openModal();
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
            loadTechnicianList( () => { openModal(); } );
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
            if(typeof callback === "function") callback();
        }).fail(function(jqXHR, textStatus) {
            dataContainer.empty()
            dataContainer.html('<option value="0">ERROR</option>');
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

function closeNotify(id) {
    $( document ).ready(function() {
        const modalContainer = $("#modal");
        $.ajax({
            url: "/notice/close/"+id,
            dataType: "html"
        }).done(function(data) {
            modalContainer.empty();
            modalContainer.html(data);
            enableButtonWithComment("#noticeClose_btn");
            openModal();
        }).fail(function(jqXHR, textStatus) {
            alet("Error al intentar recuperar los datos.");
        });;
    });
}

function enableButtonWithComment(button) {
    $("#noticeComm_ta").on("input",
        function () {
            if($("#noticeComm_ta").val() === "" ) $(button).prop('disabled', true);
            else $(button).prop("disabled", false);
        }
    );
}

function sendClose(id) {
    $.confirm({
        title: "<img src='/img/icons/advertencia-azul.png' width='100' height='100'><br/><br/>Confirmar finalizaión",
        content: "¿Desea cerrar el aviso?",
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
                text: 'Cerrar',
                action: function () {
                    $.ajax({
                        url: "/notice/close",
                        method: "POST",
                        data: {
                            idAvi: id,
                            comment: $("#noticeComm_ta").val()
                            },
                        dataType: "json"
                    }).done(function(data) {
                        console.log(data);
                        if(data === true) $.alert({
                                title: "Confirmación",
                                content: "Aviso cerrado correctamente.",
                                onClose: function(){
                                    closeModal();
                                    reloadTable();
                                }
                            });
                        else $.alert({
                            title: "Error",
                            content: "No se pudo cerrar el aviso."
                        });
                    });
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

function test() {
    alert("OK");
}

function cancelNotify(id) {
    alert("Cancelar aviso " + id);
}

function sendForm(id) {
    alert("Enviar formulario");
}

function openModal() {
    $("#noticeModal").modal("show");
}

function closeModal() {
    $("#noticeModal").modal("hide");
}

function reloadTable() {
    loadData(Number($("#tab_avi").data("option")));
}