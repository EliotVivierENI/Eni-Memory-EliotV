window.onload = init;

function init() {

    placerCartes();
  $("#plateau img").on("click", retournerImg);

  // Fonction pour réinitialiser le plateau et le nombre de coup quand "spacebar" est appuyé
  window.addEventListener("keyup", (e) => {
    if (e.key == " " || e.code == "Space") {
      // imgPlateau= 0;
      compteur = 0;
      $("#coup").text(compteur);
      $("#plateau").find("img").attr("src", "ressources/question.svg");
      placerCartes();
    } else {
    }
  });
}
let compteur = 0;
let toggleImg = true;

let plateauLegumes = [
  "ressources/memory-legume/1.svg",
  "ressources/memory-legume/2.svg",
  "ressources/memory-legume/3.svg",
  "ressources/memory-legume/4.svg",
  "ressources/memory-legume/5.svg",
  "ressources/memory-legume/6.svg",
];
//Assigne une sous valeur compris entre 1 et 6 à chaque image
function placerCartes() {
  console.clear();
  for (let i = 0; i < 12; i++) {
    let imgPlateau = Math.floor(Math.random() * 6 + 1);
    $("#img_" + i).attr("data-value", imgPlateau);
    console.log($("#img_" + i).attr("data-value"));
  }
}

//Affiche la carte après un clic
function retournerImg() {
  $(this)
    .attr("src", plateauLegumes[$(this).attr("data-value")-1]);

  compteur++;
  $("#coup").text(compteur);

  toggleImg = !toggleImg;
}

/* 

Click sur carte 1, carte 1 = Math.floor.Math.random 1 à 6 => retournerImg
    Click sur carte 2, carte 2 = Math.floor.Math.random 1 à 6 => retournerImg
        if(carte 1 = carte 2){
            - imageReste
            - clickDisabled
        } else{
            setTimeout(retournerImg,5000)}


*/
