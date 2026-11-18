window.onload = init();

function init() {
  $("#nom").on("input", verifNom);
  $("#email").on("input", verifMail);
  $("#monForm").on("input", verifMDPS);
}

function verifNom() {
  const monNom = document.getElementById("nom").value;
  if (monNom.length > 2) {
    $("#vert").css("color", "blue");
  }
}

function verifMail() {
  const emailInput = document.getElementById("email");
  const resultat = document.getElementById("resultat");

  emailInput.addEventListener("input", () => {
    if (emailInput.checkValidity()) {
      resultat.textContent = "Format d'e-mail valide ";
      resultat.style.color = "green";
    } else {
      resultat.textContent = "Format invalide ";
      resultat.style.color = "red";
    }
  });
}

function verifMDPS() {
  const formulaire = document.getElementById("monForm");
  const btnValider = document.getElementById("envoyer");

  const mdp =document.getElementById("motdePasse")
  const verifMdp =document.getElementById("verifmotdePasse")

  formulaire.addEventListener('input', () => {
  const champsValides = formulaire.checkValidity();
  const mdpIdentiques = mdp.value === verifMdp.value;

  btnValider.disabled = (champsValides && mdpIdentiques) ? false : true;
});
}

// const appelTableau = function () {
//     btnOk= document.getElementById("envoyer")
// pass= document.getElementById("motdePasse")
//   valeur = pass.value;
//   const contientMinuscule = /[a-z]/.test(valeur);
//   const contientMajuscule = /[A-Z]/.test(valeur);
//   const contientChiffre = /[0-9]/.test(valeur);

//   document.getElementById("minuscule").style.color = contientMinuscule
//     ? "green"
//     : "red";
//   document.getElementById("majuscule").style.color = contientMajuscule
//     ? "green"
//     : "red";
//   document.getElementById("chiffre").style.color = contientChiffre
//     ? "green"
//     : "red";
//   documenttElementById("nbCaracteres").style.color =
//     valeur.length >= 8 ? "green" : "red";

//   if (
//     contientMinuscule &&
//     contientMajuscule &&
//     contientChiffre &&
//     valeur.length >= 8
//   ) {
//     btnOk.removeAttribute("disabled");
//   } else {
//     btnOk.setAttribute("disabled", "disabled");
//   }
// };
