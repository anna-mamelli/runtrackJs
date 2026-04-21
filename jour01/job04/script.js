// Une année est bissextile si :
// - elle est divisible par 4 ET non divisible par 100
// - OU elle est divisible par 400
function bisextile(annee) {
    if ((annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0) {
        return true;
    } else {
        return false;
    }
}

// Quelques tests dans la console pour vérifier
console.log("2024 :", bisextile(2024)); // true (divisible par 4, pas par 100)
console.log("2023 :", bisextile(2023)); // false
console.log("2000 :", bisextile(2000)); // true (divisible par 400)
console.log("1900 :", bisextile(1900)); // false (divisible par 100 mais pas par 400)
console.log("2100 :", bisextile(2100)); // false
