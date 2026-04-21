function addOne() {
    const compteur = document.getElementById("compteur");
    // On convertit le contenu en nombre, on ajoute 1, et on réinjecte
    const valeur = parseInt(compteur.textContent);
    compteur.textContent = valeur + 1;
}

// On attache l'événement ici (pas avec onclick dans le HTML, comme demandé)
document.getElementById("button").addEventListener("click", addOne);
