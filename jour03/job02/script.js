$(document).ready(function() {
    // Fonction utilitaire : mélange les enfants d'un conteneur (algorithme Fisher-Yates)
    function melanger(selecteur) {
        const $conteneur = $(selecteur);
        const enfants = $conteneur.children().toArray();
        for (let i = enfants.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [enfants[i], enfants[j]] = [enfants[j], enfants[i]];
        }
        $conteneur.append(enfants);
    }

    // Au clic sur "Mélanger" : on remet tout dans la source et on mélange
    $("#melanger").on("click", function() {
        // On rapatrie tous les morceaux dans la source au cas où certains sont dans la cible
        $("#cible .piece").appendTo("#source");
        melanger("#source");
        $("#message").text("").css("color", "");
    });

    // Mélange initial au chargement
    melanger("#source");

    // --- Drag & drop natif ---
    let elementEnCoursDeGlisse = null;

    $(document).on("dragstart", ".piece", function(e) {
        elementEnCoursDeGlisse = this;
        e.originalEvent.dataTransfer.effectAllowed = "move";
    });

    // Autorise le drop dans les deux zones (source et cible)
    $("#cible, #source").on("dragover", function(e) {
        e.preventDefault(); // indispensable pour autoriser le drop
    });

    $("#cible, #source").on("drop", function(e) {
        e.preventDefault();
        if (elementEnCoursDeGlisse) {
            $(this).append(elementEnCoursDeGlisse);
            verifierOrdre();
        }
    });

    // Vérifie que les 6 pièces sont dans la cible et dans le bon ordre (1 à 6)
    function verifierOrdre() {
        const pieces = $("#cible .piece");
        if (pieces.length !== 6) {
            $("#message").text("").css("color", "");
            return;
        }

        let correct = true;
        pieces.each(function(index) {
            if (parseInt($(this).attr("data-pos")) !== index + 1) {
                correct = false;
            }
        });

        if (correct) {
            $("#message").text("Vous avez gagné").css("color", "green");
        } else {
            $("#message").text("Vous avez perdu").css("color", "red");
        }
    }
});
