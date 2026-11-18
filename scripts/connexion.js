window.onload = init;

const CLE_STOCKAGE = "mes_donnees";
let formLog;
let message;

function init() {
    formLog = document.getElementById("formLog");
    message = document.getElementById("message");
    connect();
}

function connect() {
    formLog.addEventListener("submit", verifierConnexion);
}

function verifierConnexion(event) {
    event.preventDefault();

   
    const saisie = Object.fromEntries(new FormData(formLog));

   
    const donneesStockees = localStorage.getItem(CLE_STOCKAGE);

    if (!donneesStockees) {
        message.textContent = "Aucun compte trouvé. Veuillez vous inscrire.";
        return;
    }

   
    const utilisateur = JSON.parse(donneesStockees);

    
    if (saisie.name === utilisateur.name && saisie.motDePasse === utilisateur.motDePasse) {
        message.textContent = "Connexion réussie !";
        sessionStorage.setItem("estConnecte", "true");
    } else {
        message.textContent = "Email ou mot de passe incorrect.";
    }
}











