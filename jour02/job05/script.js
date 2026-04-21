const footer = document.getElementById("footer");

window.addEventListener("scroll", function() {
    // Position actuelle du scroll depuis le haut
    const scrollTop = window.scrollY;

    // Hauteur totale scrollable = hauteur du document - hauteur de la fenêtre visible
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;

    // Pourcentage de scroll (0 à 100)
    const pourcentage = (scrollTop / scrollable) * 100;

    // On met à jour la variable CSS --progress, qui contrôle la barre
    footer.style.setProperty("--progress", pourcentage + "%");
});
