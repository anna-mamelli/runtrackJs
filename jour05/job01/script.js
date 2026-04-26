// ============================================================
// JOUR 05 - JOB 01
// Validation asynchrone des formulaires de connexion / inscription
// ============================================================
//
// Sécurités côté front intégrées :
// - Champs requis (non vides)
// - Validation de format (email, code postal, mot de passe)
// - Longueur minimale (nom, prénom, mot de passe)
// - Confirmation du mot de passe
// - Validation déclenchée à la perte de focus (blur) ET en temps réel à la saisie (input)
// - Validation finale au submit qui bloque l'envoi si erreurs
// - Attribut `novalidate` sur le form pour désactiver la validation HTML5 native
//   et garder le contrôle total côté JS
//
// La validation est asynchrone : chaque vérification renvoie une Promise qui
// se résout après un petit délai (simulant une vérification serveur).

// === Règles de validation (regex et messages) ===
const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Mot de passe : min 8 chars, au moins une lettre, un chiffre, un caractère spécial
const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&._\-+=()])[A-Za-z\d@$!%*#?&._\-+=()]{8,}$/;
const REGEX_CODE_POSTAL = /^\d{5}$/;
const REGEX_NOM = /^[A-Za-zÀ-ÿ\s'-]{3,}$/;

const MSG_PASSWORD = "Minimum eight characters, at least one letter, one number and one special character";

// === Fonctions de validation ===
// Chacune retourne une Promise qui se résout avec :
//   { valide: true, message: "" }  si OK
//   { valide: false, message: "..." }  si erreur

function valider(champ, valeur) {
    // On simule un appel asynchrone (comme une vérif serveur) avec un setTimeout
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(verifierChamp(champ, valeur));
        }, 100);
    });
}

function verifierChamp(champ, valeur) {
    // Retire les espaces aux extrémités
    const v = valeur.trim();

    switch (champ) {
        case "prenom":
            if (!v) return { valide: false, message: "Firstname is required" };
            if (v.length < 3) return { valide: false, message: "La taille de votre prénom est trop petite" };
            if (!REGEX_NOM.test(v)) return { valide: false, message: "Le prénom contient des caractères invalides" };
            return { valide: true, message: "" };

        case "nom":
            if (!v) return { valide: false, message: "Lastname is required" };
            if (v.length < 3) return { valide: false, message: "La taille de votre nom est trop petite" };
            if (!REGEX_NOM.test(v)) return { valide: false, message: "Le nom contient des caractères invalides" };
            return { valide: true, message: "" };

        case "email":
            if (!v) return { valide: false, message: "Email is required" };
            if (!REGEX_EMAIL.test(v)) return { valide: false, message: "Email format is wrong" };
            return { valide: true, message: "" };

        case "password":
            if (!v) return { valide: false, message: "Password is required" };
            if (!REGEX_PASSWORD.test(v)) return { valide: false, message: MSG_PASSWORD };
            return { valide: true, message: "" };

        case "password-confirm":
            if (!v) return { valide: false, message: "Password confirmation is required" };
            if (!REGEX_PASSWORD.test(v)) return { valide: false, message: MSG_PASSWORD };
            // On vérifie que les deux mots de passe correspondent
            const password = document.getElementById("password");
            if (password && v !== password.value) {
                return { valide: false, message: "Les mots de passe ne correspondent pas" };
            }
            return { valide: true, message: "" };

        case "adresse":
            if (!v) return { valide: false, message: "L'adresse est requise" };
            if (v.length < 5) return { valide: false, message: "L'adresse semble trop courte" };
            return { valide: true, message: "" };

        case "code-postal":
            if (!v) return { valide: false, message: "Le code postal est requis" };
            if (!REGEX_CODE_POSTAL.test(v)) return { valide: false, message: "Le code postal doit contenir 5 chiffres" };
            return { valide: true, message: "" };

        default:
            return { valide: true, message: "" };
    }
}

// === Affichage des erreurs ===
function afficherErreur(champId, resultat) {
    const input = document.getElementById(champId);
    const messageElement = document.querySelector(`.erreur[data-pour="${champId}"]`);

    if (!input || !messageElement) return;

    if (resultat.valide) {
        input.classList.remove("invalide");
        input.classList.add("valide");
        messageElement.textContent = "";
    } else {
        input.classList.remove("valide");
        input.classList.add("invalide");
        messageElement.textContent = resultat.message;
    }
}

// === Mise en place de la validation sur un champ ===
async function validerChampAsync(input) {
    const champ = input.id;
    const resultat = await valider(champ, input.value);
    afficherErreur(champ, resultat);
    return resultat.valide;
}

function attacherValidationChamp(input) {
    // Validation à la perte de focus
    input.addEventListener("blur", function() {
        validerChampAsync(input);
    });

    // Validation en temps réel quand le champ a déjà une erreur
    // (évite de spammer l'utilisateur dès la première lettre tapée)
    input.addEventListener("input", function() {
        if (input.classList.contains("invalide")) {
            validerChampAsync(input);
        }
    });
}

// === Validation complète du formulaire au submit ===
async function validerFormulaireComplet(form) {
    const inputs = form.querySelectorAll("input");
    // On lance toutes les validations en parallèle (Promise.all)
    const promesses = Array.from(inputs).map(function(input) {
        return validerChampAsync(input);
    });
    const resultats = await Promise.all(promesses);

    // On collecte les messages d'erreur pour le récap en haut
    const erreurs = [];
    inputs.forEach(function(input) {
        if (input.classList.contains("invalide")) {
            const messageElement = document.querySelector(`.erreur[data-pour="${input.id}"]`);
            if (messageElement && messageElement.textContent) {
                erreurs.push(messageElement.textContent);
            }
        }
    });

    afficherRecapErreurs(erreurs);

    // Le form est valide si toutes les validations sont à true
    return resultats.every(function(valide) { return valide; });
}

function afficherRecapErreurs(erreurs) {
    const recap = document.getElementById("recap-erreurs");
    if (!recap) return;
    recap.innerHTML = "";
    // On déduplique les messages identiques (par exemple "Password format is wrong" sur les deux champs)
    const uniques = [...new Set(erreurs)];
    uniques.forEach(function(message) {
        const p = document.createElement("p");
        p.textContent = message;
        recap.appendChild(p);
    });
}

// === Initialisation au chargement de la page ===
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-inscription") || document.getElementById("form-connexion");
    if (!form) return;

    // On attache la validation à chaque champ
    const inputs = form.querySelectorAll("input");
    inputs.forEach(function(input) {
        attacherValidationChamp(input);
    });

    // Validation au submit
    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        const valide = await validerFormulaireComplet(form);
        if (valide) {
            // Ici on ferait normalement un fetch vers le serveur
            // Pour la démo on affiche juste un message en console
            console.log("Formulaire valide, soumission...");
            console.log("Données :", Object.fromEntries(new FormData(form)));
            alert("Formulaire valide, données envoyées (voir console).");
        } else {
            console.log("Le formulaire contient des erreurs.");
        }
    });
});
