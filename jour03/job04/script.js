$(document).ready(function() {
    // Quand l'input reçoit le focus, on l'agrandit en animation
    $("#champ").on("focus", function() {
        $(this).animate({ width: "400px" }, 500);
    });

    // Quand l'input perd le focus, il reprend sa taille d'origine
    $("#champ").on("blur", function() {
        $(this).animate({ width: "150px" }, 500);
    });
});
