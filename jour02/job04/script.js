const keylogger = document.getElementById("keylogger");

// On écoute les touches au niveau du document entier
// pour capturer les frappes même quand le focus n'est PAS dans le textarea
document.addEventListener("keydown", function(event) {
    const touche = event.key;

    // On vérifie que c'est bien une lettre a-z (un seul caractère, entre a et z)
    // La regex /^[a-z]$/ accepte uniquement une minuscule de a à z
    if (/^[a-z]$/.test(touche)) {
        if (document.activeElement === keylogger) {
            // Si le focus est DANS le textarea, le navigateur va déjà ajouter
            // la lettre automatiquement. On en ajoute donc UNE seule de plus
            // pour obtenir un total de 2 lettres.
            keylogger.value += touche;
        } else {
            // Focus hors du textarea : on ajoute la lettre une seule fois
            keylogger.value += touche;
        }
    }
});
