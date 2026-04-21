// Code Konami : Haut, Haut, Bas, Bas, Gauche, Droite, Gauche, Droite, B, A
const codeKonami = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
];

// Tableau qui va stocker les touches saisies par l'utilisateur
let sequenceSaisie = [];

document.addEventListener("keydown", function(event) {
    // On ajoute la touche appuyée (en minuscule pour le B et le A)
    sequenceSaisie.push(event.key.length === 1 ? event.key.toLowerCase() : event.key);

    // On ne garde que les 10 dernières touches
    if (sequenceSaisie.length > codeKonami.length) {
        sequenceSaisie.shift();
    }

    // On compare la séquence saisie au code Konami
    if (sequenceSaisie.length === codeKonami.length) {
        let correspond = true;
        for (let i = 0; i < codeKonami.length; i++) {
            if (sequenceSaisie[i] !== codeKonami[i]) {
                correspond = false;
                break;
            }
        }

        if (correspond) {
            // Code Konami validé : on applique le style
            document.body.classList.add("konami");
        }
    }
});
