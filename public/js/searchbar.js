$("#txt_search").on("keydown", function(e) {
    if(e.which == 13) search();
});

function search() {
    const searchTextElement = document.getElementById("txt_search");
    const isUserSearchElement = document.getElementById("chk_users");
    const tab_aviElement= document.getElementById("tab_avi");
    const searchText = searchTextElement ? searchTextElement.value : '';
    const isUserSearch = isUserSearchElement ? isUserSearchElement.checked : false;
    const option = tab_aviElement ? $("#tab_avi").data("option") : 0;

    // Comprobar si searchText está vacío
    if(searchText.trim() === '') {
        return; // Detener la ejecución de la función si searchText está vacío
    }

    
    const dataContainer = $("#data");
    $.ajax({
        url: "/search",
        method: "POST",
        data: {
            searchText: searchText,
            isUserSearch: isUserSearch,
            option: option // Descomenta esto si lo necesitas
        },
        dataType: "html"
    }).done(function(data) {
        dataContainer.empty();
        dataContainer.html(data);
        $("#tab_avi").data("option", option);
        $("#tab_avi").data("search", true);
        $( "#opcion"+actualOp ).attr("data-showin", "background" );
        actualOp = 0;
    }).fail(function(jqXHR, textStatus) {
        alert("Error recuperando datos");
    });
}
