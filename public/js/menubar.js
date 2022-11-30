"use strict";

let actualOp = 0;
const contenedorTabla = $("#tabla");
const numOp = 4;

function option(op) {
    const newOp = Number(op);
    if(newOp>0 && newOp<=numOp) {
        if(actualOp != newOp) {
            $( "#opcion"+newOp ).attr("showin", "foreground" );
            if(actualOp>0 && actualOp<=numOp) $( "#opcion"+actualOp ).attr("showin", "background" );
            actualOp = newOp;
        }
    }
}
