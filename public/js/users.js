"use strict";

function viewTechnician(id) {
    alert("Ver técnico " + id);
}

function cancelTechnician(id) {
    $.confirm({
        title: "<img src='/img/icons/advertencia-azul.png' width='100' height='100'><br/><br/>Confirmar desactivación",
        content: "¿Desactiar la cuenta del ténico " + id + "?",
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
                text: 'Desactivar',
                action: function () {
                    $.alert('Desactivar técnico confirmado!');
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

function viewStandardUser(id) {
    alert("Ver usuario estándar " + id);
}

function cancelStandardUser(id) {
    $.confirm({
        title: "<img src='/img/icons/advertencia-azul.png' width='100' height='100'><br/><br/>Confirmar desactivación",
        content: "¿Desactiar la cuenta del usuario estándar " + id + "?",
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
                text: 'Desactivar',
                action: function () {
                    $.alert('Desactivar usuario confirmado!');
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
