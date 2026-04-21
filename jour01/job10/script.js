function compterVoyelles(phrase) {
    // On inclut les voyelles accentuées pour le français
    const voyelles = "aeiouyAEIOUYàâäéèêëïîôöùûüÿÀÂÄÉÈÊËÏÎÔÖÙÛÜŸ";
    let compteur = 0;

    for (let i = 0; i < phrase.length; i++) {
        if (voyelles.includes(phrase[i])) {
            compteur++;
        }
    }

    console.log(`La phrase contient ${compteur} voyelles`);
}

// Tests
compterVoyelles("Bonjour tout le monde");
compterVoyelles("La Plateforme_ à Marseille");
compterVoyelles("JavaScript c'est génial");
