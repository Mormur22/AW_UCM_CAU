// search.js

function search(isTechnician) {
    const searchText = document.getElementById("txt_search").value;
    const isUserSearch = document.getElementById("chk_users").checked;
    isTechnician = (isTechnician === 'true'); // Convertir el string a booleano
    $.ajax({
        url: "/search",
        method: "POST",
        data: {
            searchText: searchText,
            isUserSearch: isUserSearch,
            isTechnician: isTechnician
        },
        dataType: "html"
    }).done(function(data) {
        // Manejar la respuesta del servidor
        // Actualizar la vista con los resultados de búsqueda
    }).fail(function(jqXHR, textStatus) {
        // Manejar errores en caso de que falle la llamada AJAX
    });
}
