window.onload = init;

function init() {
  $("#plateau").on("click", afficherCroix);


// Fonction pour réinitialiser le plateau et le nombre de coup quand "spacebar" est appuyé
  window.addEventListener("keyup",(e)=> {
    if (e.key == " " ||
      e.code == "Space"){
        console.log("J'appuie sur espace")
        compteur = 0
        $("#coup").text(compteur);
        console.log(compteur)
      }
      else {console.log("Je n'appuie pas sur espace")}
  })
}
let compteur = 0;
let toggleImg = true;

function afficherCroix() {
//   $(this)
//     .find("img")
//     .attr(
//       "src",
//       !toggleImg ? 
//     );
compteur++;
  $("#coup").text(compteur);
  console.log(compteur)


  toggleImg = !toggleImg;


}