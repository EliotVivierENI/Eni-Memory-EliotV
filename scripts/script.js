window.onload = init;

function init() {

    placerCartes();
    $("#plateau img").on("click", retournerImg);

    // Fonction pour réinitialiser le plateau et le nombre de coup quand "spacebar" est appuyé
    window.addEventListener("keyup", (e) => {
        if (e.key == " " || e.code == "Space") {
            resetJeu()
        } else {
        }
    });

    $("#btn-reset").on("click",resetJeu)


}

function resetJeu(){
    compteur = 0;
            $("#coup").text(compteur);
            $("#plateau").find("img").attr("src", "ressources/question.svg");
            $("#plateau").find("img").removeClass("bg-reussite");
            $("#plateau").find("img").removeClass("retourne");
            $("#plateau").find("img").css("pointer-events","auto");
            placerCartes();
}

//Variables 
let cartesRetournees = []
let compteur = 0;
let plateauLegumes = [
    "ressources/memory-legume/1.svg",
    "ressources/memory-legume/2.svg",
    "ressources/memory-legume/3.svg",
    "ressources/memory-legume/4.svg",
    "ressources/memory-legume/5.svg",
    "ressources/memory-legume/6.svg",
];

let indexLegumes = [1, 2, 3, 4, 5, 6]
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

    $(this).toggleClass("retourne")

    $(this)
        .attr("src", plateauLegumes[$(this).attr("data-value") - 1]);

    $(this).css("pointer-events","none");
    


    cartesRetournees.push($(this));

    verif();

    victoire();

}

function verif() {
    if (cartesRetournees.length == 2) {
        compteur++
    $("#coup").text(compteur);
        if (cartesRetournees[0].attr("data-value") === cartesRetournees[1].attr("data-value")) {
            for(let i=0;i<cartesRetournees.length;i++){
            cartesRetournees[i].addClass("bg-reussite");
            cartesRetournees[i].toggleClass("retourne")
            
            }
            
            
            resetCartes();

        }
    
    else {
        console.log("j'ai une carte")
        setTimeout(() => {
             for(let i=0;i<cartesRetournees.length;i++){
            cartesRetournees[i].attr("src", "ressources/question.svg");
            cartesRetournees[i].toggleClass("retourne")
            cartesRetournees[i].css("pointer-events","auto");

            }

            resetCartes();

        }, 1200)
    }
    }
    else {
        

    }
}

function resetCartes(){
    cartesRetournees =[];
}


function victoire() {
    for (let i = 0; i < 12; i++) {
        if ($("#img_" + i).attr("src") === "ressources/question.svg") {
            return;
        }
    }
    setTimeout(() => {
        alert(`Victoire ! \nLe joueur remporte la partie en ${compteur} coups ! \nAppuie sur barre espace pour relancer.`);
    }, 1000)

}



/*
Demain : 

- Rendre opérationnel Inscription
- Vérification des mdps

A faire avant Vendredi:
Page Profil
Refaire Nav
Recoder CSS avec Boostrap ?
Le rendre dynamique avec les autres tableaux

Idée Bonus : 
Mode Sombre/Clair ( refaire chaque code couleur avec variable)
*/ 
