// Variable qui mémorise si on est en thème sombre ou clair
let themeSombre = false;

function changeTheme() {
    const body = document.body;

    if (themeSombre) {
        // On revient à l'aspect initial
        body.style.backgroundColor = "";
        body.style.color = "";
        themeSombre = false;
    } else {
        // On passe en thème sombre
        body.style.backgroundColor = "black";
        body.style.color = "white";
        themeSombre = true;
    }
}

document.getElementById("toggle-theme").addEventListener("click", changeTheme);
