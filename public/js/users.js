"use strict";

const parseCookie = str =>
  str
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});

window.onload = function () {
    try{
        const cookies = parseCookie(document.cookie);
        window.currentUser=JSON.parse(cookies.cookieUser);
    }
    catch(error){
        console.log("Error recuperndo cookie");
    }
}

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
                    if(window.currentUser.id === id) {
                        $.alert({
                            title: "ERROR",
                            content: "No puede borrar su propio usuario."
                        });

                    }
                    else{
                        $.ajax({
                            url: "/user/cancelTechnician/"+id,
                            method: "POST",
                            dataType: "text"
                        }).done(function(data) {
                            console.log(data);
                            if(data === "true") $.alert({
                                    title: "Confirmación",
                                    content: "Técnico borrado con éxito.",
                                    onClose: function(){
                                        loadAllUsers();
                                    }
                                });
                            else $.alert({
                                title: "Error",
                                content: "No se pudo borrar el técnico."
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
                    $.ajax({
                        url: "/user/cancelUser/"+id,
                        method: "POST",
                        dataType: "text"
                    }).done(function(data) {
                        console.log(data);
                        if(data === "true") $.alert({
                                title: "Confirmación",
                                content: "Usuario borrado con éxito.",
                                onClose: function(){
                                    loadAllUsers();
                                }
                            });
                        else $.alert({
                            title: "Error",
                            content: "No se pudo borrar el usuario."
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
