function citation() {
    const article = document.getElementById("citation");
    console.log(article.textContent);
}

// On attache l'événement clic au bouton
document.getElementById("button").addEventListener("click", citation);
