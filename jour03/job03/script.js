$(document).ready(function() {
    // État du plateau : tableau de 9 cases
    // Valeur = numéro de l'image (1 à 8), ou 0 pour la case vide
    // Position solution : [1, 2, 3, 4, 5, 6, 7, 8, 0]
    let plateau = [];
    let partieFinie = false;

    // Crée un plateau résolvable en faisant des mouvements aléatoires depuis la solution
    function initialiserPlateau() {
        plateau = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        // On fait 200 mouvements aléatoires valides pour mélanger
        for (let i = 0; i < 200; i++) {
            const voisins = trouverVoisinsCaseVide();
            const choix = voisins[Math.floor(Math.random() * voisins.length)];
            echanger(choix, plateau.indexOf(0));
        }
        // Évite un plateau déjà résolu
        if (estResolu()) {
            echanger(0, 1);
        }
    }

    // Retourne les indices des cases adjacentes à la case vide
    function trouverVoisinsCaseVide() {
        const idxVide = plateau.indexOf(0);
        const ligne = Math.floor(idxVide / 3);
        const col = idxVide % 3;
        const voisins = [];
        if (ligne > 0) voisins.push(idxVide - 3); // haut
        if (ligne < 2) voisins.push(idxVide + 3); // bas
        if (col > 0)   voisins.push(idxVide - 1); // gauche
        if (col < 2)   voisins.push(idxVide + 1); // droite
        return voisins;
    }

    // Échange deux cases dans le tableau
    function echanger(i, j) {
        [plateau[i], plateau[j]] = [plateau[j], plateau[i]];
    }

    // Vérifie si le plateau est dans la configuration solution
    function estResolu() {
        for (let i = 0; i < 8; i++) {
            if (plateau[i] !== i + 1) return false;
        }
        return plateau[8] === 0;
    }

    // Affiche le plateau dans le DOM
    function afficher() {
        const $plateau = $("#plateau").empty();
        plateau.forEach((valeur, index) => {
            const $case = $("<div>").addClass("case").attr("data-index", index);
            if (valeur === 0) {
                $case.addClass("vide");
            } else {
                $case.css("background-image", `url(logo${valeur}.PNG)`);
            }
            $plateau.append($case);
        });
    }

    // Gère le clic sur une case : déplace si adjacente à la case vide
    $("#plateau").on("click", ".case", function() {
        if (partieFinie) return;
        const index = parseInt($(this).attr("data-index"));
        const voisins = trouverVoisinsCaseVide();
        if (voisins.includes(index)) {
            echanger(index, plateau.indexOf(0));
            afficher();
            if (estResolu()) {
                partieFinie = true;
                $("#message").text("Vous avez gagné");
                $("#recommencer").show();
            }
        }
    });

    // Bouton pour relancer une partie
    $("#recommencer").on("click", function() {
        partieFinie = false;
        $("#message").text("");
        $(this).hide();
        initialiserPlateau();
        afficher();
    });

    // Lancement initial
    initialiserPlateau();
    afficher();
});
