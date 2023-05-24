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
            alert("Error al intentar recuperar los datos.");
        });
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
            alert("Error al intentar recuperar los datos.");
        });
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
            enableButtonWithTechnician("noticeAssign_btn");
            loadTechnicianList( () => { openModal(); } );
        }).fail(function(jqXHR, textStatus) {
            alert("Error al intentar recuperar los datos.");
        });
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
            enableButtonWithComment("noticeClose_btn"); // NOTA: Para permitir que se cierre un aviso sin comentario del técnico, comentar esta línea.
            openModal();
        }).fail(function(jqXHR, textStatus) {
            alert("Error al intentar recuperar los datos.");
        });
    });
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

function cancelNotify(id) {
    $( document ).ready(function() {
        const modalContainer = $("#modal");
        $.ajax({
            url: "/notice/cancel/"+id,
            dataType: "html"
        }).done(function(data) {
            modalContainer.empty();
            modalContainer.html(data);
            enableButtonWithComment("noticeCancel_btn");
            openModal();
        }).fail(function(jqXHR, textStatus) {
            alert("Error al intentar recuperar los datos.");
        });
    });
}

function sendCancel(id) {
    $.confirm({
        title: "<img src='/img/icons/advertencia-azul.png' width='100' height='100'><br/><br/>Confirmar eliminación",
        content: "¿Desea borrar el aviso " + id + "?",
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
                text: 'Borrar',
                action: function () {
                    $.ajax({
                        url: "/notice/cancel",
                        method: "POST",
                        data: {
                            idAvi: id,
                            comment: $("#noticeComm_ta").val()
                            },
                        dataType: "json"
                    }).done(function(data) {
                        if(data === true) $.alert({
                                title: "Confirmación",
                                content: "Aviso borrado correctamente.",
                                onClose: function(){
                                    closeModal();
                                    reloadTable();
                                }
                            });
                        else $.alert({
                            title: "Error",
                            content: "No se pudo borrar el aviso."
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

function loadTechnicianList(callback) {
    $( document ).ready(function() {
        const dataContainer = $("#noticeTech_sel");
        $.ajax({
            url: "/technician_list",
            dataType: "json"
        }).done(function(data) {
            dataContainer.empty();
            dataContainer.append('<option value="0" selected disabled>Seleccione un técnico</option>');
            data.forEach(t => { dataContainer.append('<option value="' + t.idTec + '">' + t.nombre + '</option>'); });
            if(typeof callback === "function") callback();
        }).fail(function(jqXHR, textStatus) {
            dataContainer.empty()
            dataContainer.html('<option value="0">ERROR</option>');
        });;
    });
}

function enableButtonWithTechnician(buttonId) {
    $("#" + buttonId).prop('disabled', true);
    $("#noticeTech_sel").on("input",
        function () {
            if($("#noticeTech_sel").val() === "0" ) $("#" + buttonId).prop('disabled', true);
            else $("#" + buttonId).prop("disabled", false);
        }
    );
}

function enableButtonWithComment(buttonId) {
    $("#" + buttonId).prop('disabled', true);
    $("#noticeComm_ta").on("input",
        function () {
            if($("#noticeComm_ta").val() === "" ) $("#" + buttonId).prop('disabled', true);
            else $("#" + buttonId).prop("disabled", false);
        }
    );
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