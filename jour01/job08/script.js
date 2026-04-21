// Fonction qui vérifie si un nombre est premier
// Un nombre premier est > 1 et divisible uniquement par 1 et lui-même
function estPremier(n) {
    if (n < 2) {
        return false;
    }
    // On teste les diviseurs jusqu'à la racine carrée de n (optimisation)
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

function sommeNombresPremiers(a, b) {
    if (estPremier(a) && estPremier(b)) {
        return a + b;
    } else {
        return false;
    }
}

// Tests
console.log("sommeNombresPremiers(3, 5) :", sommeNombresPremiers(3, 5));    // 8
console.log("sommeNombresPremiers(7, 11) :", sommeNombresPremiers(7, 11));  // 18
console.log("sommeNombresPremiers(4, 7) :", sommeNombresPremiers(4, 7));    // false
console.log("sommeNombresPremiers(1, 2) :", sommeNombresPremiers(1, 2));    // false (1 n'est pas premier)
console.log("sommeNombresPremiers(13, 17) :", sommeNombresPremiers(13, 17)); // 30
