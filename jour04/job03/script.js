document.getElementById("filtrer").addEventListener("click", function() {
    // Récupération des valeurs saisies dans le formulaire
    const filtreId = document.getElementById("filtreId").value.trim();
    const filtreNom = document.getElementById("filtreNom").value.trim().toLowerCase();
    const filtreType = document.getElementById("filtreType").value;

    // Fetch du fichier pokemon.json
    fetch("pokemon.json")
        .then(function(reponse) {
            return reponse.json();
        })
        .then(function(pokemons) {
            // On filtre le tableau selon les critères
            const resultats = pokemons.filter(function(pokemon) {
                // Filtre par ID si renseigné
                if (filtreId && pokemon.id.toString() !== filtreId) {
                    return false;
                }
                // Filtre par nom si renseigné (on cherche dans le nom anglais, français et japonais)
                if (filtreNom) {
                    const nomsMinuscule = [
                        pokemon.name.english.toLowerCase(),
                        pokemon.name.french.toLowerCase()
                    ];
                    const trouve = nomsMinuscule.some(function(nom) {
                        return nom.includes(filtreNom);
                    });
                    if (!trouve) {
                        return false;
                    }
                }
                // Filtre par type si sélectionné
                if (filtreType && !pokemon.type.includes(filtreType)) {
                    return false;
                }
                // Le pokémon passe tous les filtres
                return true;
            });

            afficherResultats(resultats);
        })
        .catch(function(erreur) {
            console.error("Erreur lors du chargement :", erreur);
            document.getElementById("resultats").textContent = "Erreur de chargement du fichier.";
        });
});

// Fonction qui affiche les résultats filtrés dans le DOM
function afficherResultats(pokemons) {
    const zone = document.getElementById("resultats");
    zone.innerHTML = "";

    if (pokemons.length === 0) {
        zone.textContent = "Aucun pokémon ne correspond aux critères.";
        return;
    }

    pokemons.forEach(function(pokemon) {
        const carte = document.createElement("div");
        carte.className = "pokemon";

        const titre = document.createElement("h3");
        titre.textContent = `#${pokemon.id} - ${pokemon.name.french} (${pokemon.name.english})`;
        carte.appendChild(titre);

        const conteneurTypes = document.createElement("div");
        conteneurTypes.className = "types";
        pokemon.type.forEach(function(type) {
            const span = document.createElement("span");
            span.className = "type";
            span.textContent = type;
            conteneurTypes.appendChild(span);
        });
        carte.appendChild(conteneurTypes);

        zone.appendChild(carte);
    });
}
