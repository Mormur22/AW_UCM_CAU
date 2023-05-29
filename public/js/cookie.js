"use strict";

if(!parseCookie) {
    var parseCookie = str =>
        str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
}

window.onload = function () {
    try {
        const cookies = parseCookie(document.cookie);
        window.currentUser = JSON.parse(cookies.cookieUser);
    }
    catch(error) {
        console.log("Error recuperndo cookie");
    }
}
