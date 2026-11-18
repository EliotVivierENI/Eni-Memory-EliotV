window.onload = init();

function init() {
//   $("#nom").on("input", verifNom);
//   $("#email").on("input", verifMail);
  $("#monForm").on("input", verifMDPS);
  $("#motdePasse").on("input",forceMdp)
  
  document.getElementById("monForm").addEventListener("submit", storeData);
}






/* --------------------------------
------------------------------------
-----Fonctions verifications -------
-----du formulaire Inscription------
------------------------------------
----------------------------------*/




// function verifNom() {
//   const monNom = document.getElementById("nom").value;
//   if (monNom.length > 2) {
//     $("#vert").css("color", "blue");
//   }
// }

// function verifMail() {
//   const emailInput = document.getElementById("email");
//   const resultat = document.getElementById("resultat");

//   emailInput.addEventListener("input", () => {
//     if (emailInput.checkValidity()) {
//       resultat.textContent = "Format d'e-mail valide ";
//       resultat.style.color = "green";
//     } else {
//       resultat.textContent = "Format invalide ";
//       resultat.style.color = "red";
//     }
//   });
// }


function forceMdp(){
    const mdp = document.getElementById("motdePasse").value;

    const contientChiffre = /[0-9]/.test(mdp);
    const regexSymbole = /[\p{P}\p{S}]/u.test(mdp);

    if( mdp.length >0){
        $("#faible").css("background-color","red")
        
    }
    else{
         $("#faible").css("background-color","rgba(0, 0, 0, 0)")
    }
    if(mdp.length>=6 && (contientChiffre || regexSymbole )){
          $("#faible").css("background-color","red")
         $("#moyen").css("background-color","yellow")
    } else {
          $("#moyen").css("background-color","rgba(0, 0, 0, 0)")
    }
     if(mdp.length>=9 && contientChiffre && regexSymbole ){
           $("#faible").css("background-color","red")
         $("#moyen").css("background-color","yellow")
         $("#fort").css("background-color","var(--couleur-reussite")
    }
    else {
         $("#fort").css("background-color","rgba(0, 0, 0, 0)")
    }


}

function verifMDPS() {
  const formulaire = document.getElementById("monForm");
  const btnValider = document.getElementById("envoyer");

  const mdp =document.getElementById("motdePasse")
  const verifMdp =document.getElementById("verifmotdePasse")

  formulaire.addEventListener('input', () => {
  const champsValides = formulaire.checkValidity();
  const mdpIdentiques = mdp.value === verifMdp.value;

  btnValider.disabled = (champsValides && mdpIdentiques ) ? false : true;
});
}


/* --------------------------------
------------------------------------
-----Fonctions modifications -------
-----du Local Storage---------------
------------------------------------
----------------------------------*/



const monForm = document.getElementById("monForm");
const CLE_STOCKAGE = "mes_donnees";

function storeData(event) {
    event.preventDefault(); 
    const donnees = Object.fromEntries(new FormData(monForm));
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(donnees));
}










