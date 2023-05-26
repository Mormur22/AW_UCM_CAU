function search() {
    const searchTextElement = document.getElementById("txt_search");
    const isUserSearchElement = document.getElementById("chk_users");
    const tab_aviElement= document.getElementById("tab_avi");
    const searchText = searchTextElement ? searchTextElement.value : '';
    const isUserSearch = isUserSearchElement ? isUserSearchElement.checked : false;
    const option= tab_aviElement ? $("#tab_avi").data("option") : 0;

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
    }).fail(function(jqXHR, textStatus) {
        alert("Error recuperando datos");
    });
}
