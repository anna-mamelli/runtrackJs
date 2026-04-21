function jourTravaille(date) {
    // Liste des jours fériés 2024 en France (format "MM-DD")
    const joursFeries2024 = [
        "01-01", // Jour de l'an
        "04-01", // Lundi de Pâques
        "05-01", // Fête du Travail
        "05-08", // Victoire 1945
        "05-09", // Ascension
        "05-20", // Lundi de Pentecôte
        "07-14", // Fête nationale
        "08-15", // Assomption
        "11-01", // Toussaint
        "11-11", // Armistice
        "12-25"  // Noël
    ];

    // Format de la date en français : "lundi 1 janvier 2024"
    const dateFormatee = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // On construit la clé "MM-DD" à partir de la date
    const mois = String(date.getMonth() + 1).padStart(2, '0');
    const jour = String(date.getDate()).padStart(2, '0');
    const cle = `${mois}-${jour}`;

    // getDay() : 0 = dimanche, 6 = samedi
    const numeroJour = date.getDay();

    if (joursFeries2024.includes(cle)) {
        console.log(`Le ${dateFormatee} est un jour férié`);
    } else if (numeroJour === 0 || numeroJour === 6) {
        console.log(`Non, ${dateFormatee} est un week-end`);
    } else {
        console.log(`Oui, ${dateFormatee} est un jour travaillé`);
    }
}

// Tests
jourTravaille(new Date(2024, 0, 1));   // 1er janvier 2024 - jour férié
jourTravaille(new Date(2024, 5, 6));   // 6 juin 2024 - jeudi - travaillé
jourTravaille(new Date(2024, 5, 22));  // 22 juin 2024 - samedi - week-end
jourTravaille(new Date(2024, 11, 25)); // 25 décembre 2024 - jour férié
jourTravaille(new Date(2024, 6, 14));  // 14 juillet 2024 - jour férié (et dimanche)
