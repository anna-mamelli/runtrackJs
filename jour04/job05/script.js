document.getElementById("get-quote").addEventListener("click", function() {
    // L'API ZenQuotes peut bloquer les requêtes cross-origin (CORS) depuis un fichier local.
    // On passe alors par le proxy allorigins.win qui renvoie la réponse JSON encapsulée.
    const url = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://zenquotes.io/api/random");

    fetch(url)
        .then(function(reponse) {
            return reponse.json();
        })
        .then(function(donnees) {
            // L'API ZenQuotes renvoie un tableau avec un seul objet :
            // [{ q: "citation", a: "auteur", h: "html formaté" }]
            const citation = donnees[0];

            const zone = document.getElementById("citation");
            zone.innerHTML = "";

            const texte = document.createElement("p");
            texte.className = "texte";
            texte.textContent = `"${citation.q}"`;
            zone.appendChild(texte);

            const auteur = document.createElement("p");
            auteur.className = "auteur";
            auteur.textContent = "— " + citation.a;
            zone.appendChild(auteur);
        })
        .catch(function(erreur) {
            console.error("Erreur lors de la récupération :", erreur);
            document.getElementById("citation").textContent = "Impossible de récupérer une citation.";
        });
});
