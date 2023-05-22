"use strict";

let actualOp = 0;
const numOp = 4;

function option(op) {
    const newOp = Number(op);
    if(newOp>0 && newOp<=numOp) {
        if(actualOp != newOp) {
            $( "#opcion" + newOp ).attr("data-showin", "foreground" );
            if(actualOp>0 && actualOp<=numOp) $( "#opcion"+actualOp ).attr("data-showin", "background" );
            actualOp = newOp;
            loadData(newOp);
        }
    }
}

function loadData(op) {
    switch(op) {
        case 1:
            loadIncomingNotifies();
            break;
        case 2:
            loadMyOpenNotifies();
            break;
        case 3:
            loadMyHistoricNotifies();
            break;
        case 4:
            loadAllUsers();
            break;
    }
}

function  loadIncomingNotifies() {
    $( document ).ready(function() {
        const dataContainer = $("#data");
        dataContainer.html("<div class='center'><img id='img_loading' src='img\\icons\\loading.gif' /></ div>");
        $.ajax({
            url: "/tables/notifies",
            dataType: "html"
        }).done(function(data) {
            dataContainer.empty();
            dataContainer.html(data);
            $("#tab_avi").data("option", 1);
        }).fail(function(jqXHR, textStatus) {
            dataContainer.empty()
            dataContainer.html("&nbsp;&nbsp;&nbsp;Error al intentar recuperar los datos.");
        });;
    });
}

function  loadMyOpenNotifies() {
    $( document ).ready(function() {
        const dataContainer = $("#data");
        dataContainer.html("<div class='center'><img id='img_loading' src='img\\icons\\loading.gif' /></ div>");
        $.ajax({
            url: "/tables/mynotifies",
            dataType: "html"
        }).done(function(data) {
            dataContainer.empty();
            dataContainer.html(data);
            $("#tab_avi").data("option", 2);
        }).fail(function(jqXHR, textStatus) {
            dataContainer.empty()
            dataContainer.html("&nbsp;&nbsp;&nbsp;Error al intentar recuperar los datos.");
        });;
    });
}

function  loadMyHistoricNotifies() {
    $( document ).ready(function() {
        const dataContainer = $("#data");
        dataContainer.html("<div class='center'><img id='img_loading' src='img\\icons\\loading.gif' /></ div>");
        $.ajax({
            url: "/tables/historic",
            dataType: "html"
        }).done(function(data) {
            dataContainer.empty();
            dataContainer.html(data);
            $("#tab_avi").data("option", 3);
        }).fail(function(jqXHR, textStatus) {
            dataContainer.empty()
            dataContainer.html("&nbsp;&nbsp;&nbsp;Error al intentar recuperar los datos.");
        });;
    });
}

function  loadAllUsers() {
    $( document ).ready(function() {
        const dataContainer = $("#data");
        dataContainer.html("<div class='center'><img id='img_loading' src='img\\icons\\loading.gif' /></ div>");
        $.ajax({
            url: "/tables/users",
            dataType: "html"
        }).done(function(data) {
            dataContainer.empty();
            dataContainer.html(data);
            $("#tab_avi").data("option", 4);
        }).fail(function(jqXHR, textStatus) {
            dataContainer.empty()
            dataContainer.html("&nbsp;&nbsp;&nbsp;Error al intentar recuperar los datos.");
        });;
    });
}