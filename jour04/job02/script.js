function jsonValueKey(chaineJson, cle) {
    // On transforme la chaîne JSON en objet JavaScript utilisable
    const objet = JSON.parse(chaineJson);
    // On retourne la valeur correspondant à la clé demandée
    return objet[cle];
}

// Tests avec l'exemple de l'énoncé
const exemple = '{"name": "La Plateforme_", "address": "8 rue d\'hozier", "city": "Marseille", "nb_staff": "11", "creation": "2019"}';

console.log("city :", jsonValueKey(exemple, "city"));       // "Marseille"
console.log("name :", jsonValueKey(exemple, "name"));       // "La Plateforme_"
console.log("nb_staff :", jsonValueKey(exemple, "nb_staff")); // "11"
console.log("creation :", jsonValueKey(exemple, "creation")); // "2019"
