$(document).ready(function() {
    // Au clic sur le premier bouton, on affiche la citation dans le <p>
    $("#btnAfficher").on("click", function() {
        $("#citation").text("Les logiciels et les cathédrales, c'est un peu la même chose - d'abord, on les construit, ensuite, on prie.");
    });

    // Au clic sur le second bouton, on cache la citation
    $("#btnCacher").on("click", function() {
        $("#citation").hide();
    });
});
