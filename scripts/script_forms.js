window.onload = init();

function init() {
  $("#monForm").on("input", verifMDPS);
  $("#motdePasse").on("input", forceMdp);

  document.getElementById("monForm").addEventListener("submit", storeData);
}

/* ---------------------------------------------------------------------
-------Fonction qui genere visuellement la force du mot de passe -------
----------------------------------------------------------------------*/

function forceMdp() {
  const mdp = document.getElementById("motdePasse").value;

  const contientChiffre = /[0-9]/.test(mdp);
  const regexSymbole = /[\p{P}\p{S}]/u.test(mdp);

  if (mdp.length > 0) {
    $("#faible").css("background-color", "red");
  } else {
    $("#faible").css("background-color", "rgba(0, 0, 0, 0)");
  }
  if (mdp.length >= 6 && (contientChiffre || regexSymbole)) {
    $("#faible").css("background-color", "red");
    $("#moyen").css("background-color", "yellow");
  } else {
    $("#moyen").css("background-color", "rgba(0, 0, 0, 0)");
  }
  if (mdp.length >= 9 && contientChiffre && regexSymbole) {
    $("#faible").css("background-color", "red");
    $("#moyen").css("background-color", "yellow");
    $("#fort").css("background-color", "var(--couleur-reussite");
  } else {
    $("#fort").css("background-color", "rgba(0, 0, 0, 0)");
  }
}

/* ---------------------------------------------------------------------------------
-------Fonction qui verifie que le mot de passe correspond a sa verification -------
----------------------------------------------------------------------------------*/

function verifMDPS() {
  const formulaire = document.getElementById("monForm");
  const btnValider = document.getElementById("envoyer");

  const mdp = document.getElementById("motdePasse");
  const verifMdp = document.getElementById("verifmotdePasse");

  formulaire.addEventListener("input", () => {
    const champsValides = formulaire.checkValidity();
    const mdpIdentiques = mdp.value === verifMdp.value;

    btnValider.disabled = champsValides && mdpIdentiques ? false : true;
  });
}

/* -----------------------------------------
--------------------------------------------
-----Fonctions affichage des popups --------
--------------------------------------------
------------------------------------------*/

function afficherPopupReussie() {
  $("#notif").html(`Connexion réussie ! <br> Redirection`);
  $("#notif").css("display", "block");
  $("#notif").css("background-color", "var(--success");
}
function afficherPopupErreur() {
  $("#notif").text("Erreur de connexion !");
  $("#notif").css("display", "block");
  $("#notif").css("background-color", "red");
}
function cacherPopup() {
  $("#notif").text("Connexion réussie !");
  $("#notif").css("display", "none");
  $("#notif").css("background-color", "var(--couleur-reussite");
}

/* ---------------------------------
------------------------------------
-----Fonctions modification --------
-----du Local Storage---------------
------------------------------------
----------------------------------*/

const monForm = document.getElementById("monForm");
const CLE_STOCKAGE = "mes_donnees";

function storeData(event) {
  event.preventDefault();
  const donnees = Object.fromEntries(new FormData(monForm));
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(donnees));
  afficherPopupReussie();
  setTimeout(() => {
    window.location.href = "log.html";
  }, 2000);
}
