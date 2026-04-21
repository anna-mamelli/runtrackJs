function showhide() {
    // On cherche si un article existe déjà dans la page
    const articleExistant = document.getElementById("article-citation");

    if (articleExistant) {
        // S'il existe, on le supprime
        articleExistant.remove();
    } else {
        // Sinon, on le crée et on l'ajoute à la page
        const article = document.createElement("article");
        article.id = "article-citation";
        article.textContent = "L'important n'est pas la chute, mais l'atterrissage.";
        document.body.appendChild(article);
    }
}

document.getElementById("button").addEventListener("click", showhide);
