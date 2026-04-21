// Tri à bulles (bubble sort) implémenté à la main,
// sans utiliser la méthode .sort() native de JavaScript.
function tri(numbers, order) {
    // On copie le tableau pour ne pas modifier l'original
    const tab = [...numbers];
    const n = tab.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (order === "asc") {
                // Tri ascendant : on échange si l'élément de gauche est plus grand
                if (tab[j] > tab[j + 1]) {
                    const temp = tab[j];
                    tab[j] = tab[j + 1];
                    tab[j + 1] = temp;
                }
            } else if (order === "desc") {
                // Tri descendant : on échange si l'élément de gauche est plus petit
                if (tab[j] < tab[j + 1]) {
                    const temp = tab[j];
                    tab[j] = tab[j + 1];
                    tab[j + 1] = temp;
                }
            }
        }
    }

    return tab;
}

// Tests
console.log("asc  :", tri([5, 2, 9, 1, 7, 3], "asc"));  // [1, 2, 3, 5, 7, 9]
console.log("desc :", tri([5, 2, 9, 1, 7, 3], "desc")); // [9, 7, 5, 3, 2, 1]
console.log("asc  :", tri([42, 8, 15, 16, 23, 4], "asc"));
console.log("desc :", tri([42, 8, 15, 16, 23, 4], "desc"));
