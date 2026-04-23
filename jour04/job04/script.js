document.getElementById("update").addEventListener("click", function() {
    // On ajoute un paramètre unique pour éviter le cache du navigateur
    // sinon si on modifie le JSON et qu'on reclique, on verrait l'ancienne version
    fetch("utilisateur.json?t=" + Date.now())
        .then(function(reponse) {
            return reponse.json();
        })
        .then(function(utilisateurs) {
            afficherUtilisateurs(utilisateurs);
        })
        .catch(function(erreur) {
            console.error("Erreur de chargement :", erreur);
        });
});

// Fonction qui remplit le tableau avec les utilisateurs
function afficherUtilisateurs(utilisateurs) {
    const corps = document.getElementById("corps");
    // On vide le tableau avant de le remplir à nouveau
    corps.innerHTML = "";

    utilisateurs.forEach(function(utilisateur) {
        const ligne = document.createElement("tr");

        const cellId = document.createElement("td");
        cellId.textContent = utilisateur.id;
        ligne.appendChild(cellId);

        const cellNom = document.createElement("td");
        cellNom.textContent = utilisateur.nom;
        ligne.appendChild(cellNom);

        const cellPrenom = document.createElement("td");
        cellPrenom.textContent = utilisateur.prenom;
        ligne.appendChild(cellPrenom);

        const cellEmail = document.createElement("td");
        cellEmail.textContent = utilisateur.email;
        ligne.appendChild(cellEmail);

        corps.appendChild(ligne);
    });
}
