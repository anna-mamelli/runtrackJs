document.getElementById("button").addEventListener("click", function() {
    // Fetch lit le fichier expression.txt
    fetch("expression.txt")
        .then(function(reponse) {
            // .text() transforme la réponse en chaîne de caractères
            return reponse.text();
        })
        .then(function(contenu) {
            // On crée un nouveau paragraphe avec le contenu récupéré
            const paragraphe = document.createElement("p");
            paragraphe.textContent = contenu;
            document.body.appendChild(paragraphe);
        })
        .catch(function(erreur) {
            console.error("Erreur lors de la lecture du fichier :", erreur);
        });
});
