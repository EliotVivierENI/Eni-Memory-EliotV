window.onload = init;

function init() {

    placerCartes();
  $("#plateau img").on("click", retournerImg);

  // Fonction pour réinitialiser le plateau et le nombre de coup quand "spacebar" est appuyé
  window.addEventListener("keyup", (e) => {
    if (e.key == " " || e.code == "Space") {
      compteur = 0;
      $("#coup").text(compteur);
      $("#plateau").find("img").attr("src", "ressources/question.svg");
      placerCartes();
    } else {
    }
  });
}

//Variables 
let compteur=0;
let plateauLegumes = [
  "ressources/memory-legume/1.svg",
  "ressources/memory-legume/2.svg",
  "ressources/memory-legume/3.svg",
  "ressources/memory-legume/4.svg",
  "ressources/memory-legume/5.svg",
  "ressources/memory-legume/6.svg",
];

let indexLegumes = [1,2,3,4,5,6]
let pairesIndexLegumes = [...indexLegumes, ...indexLegumes];

function melanger(monTab) {
  for (let i = monTab.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [monTab[i], monTab[j]] = [monTab[j], monTab[i]];
  }
}


//Assigne une sous valeur entre 1 et 6 compris à chaque image
function placerCartes() {

   melanger(pairesIndexLegumes)
    
    
  for (let i = 0; i < 12; i++) {
  
    $("#img_" + i).attr("data-value", pairesIndexLegumes[i]);
 
  }
}

//Affiche la carte après un clic
function retournerImg() {



  $(this)
    .attr("src", plateauLegumes[$(this).attr("data-value")-1]);


compteur++
  $("#coup").text(compteur);




  if(true){
  setTimeout(()=>{
    $(this).attr("src", "ressources/question.svg");
  },10000)
}
  else {}

victoire()

}




function victoire() {
  for (let i = 0; i < 12; i++) {
    if ($("#img_"+i).attr("src") === "ressources/question.svg") {
      return; 
    }
  }
    setTimeout(()=>{
         alert(`Le joueur remporte la partie en ${compteur} coups`);
    },1000)
    
}




/*
3 soucis : 
- Doit mettre placerCartes() en tableau et exclure plus de 2 fois le même chiffre 
Pistes : 
    - Faire un tableau de 12 en dupliquant 1 fois chaque image pour créer des paires, puis associer une fois chaque plateauLegumes[i] à $("#img_" + i).attr("data-value", )

    -

-écrire dynamiquement if("#img_['Click1']!==#img_['Click2']"){
 setTimeout(()=>{
    $(this).attr("src", "ressources/question.svg");
  },3000)
}


- Le compteur de coup doit être incrémenté tout les 2 click

}
*/