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



    $(this)
        .attr("src", plateauLegumes[$(this).attr("data-value") - 1]);


    


    cartesRetournees.push($(this));

    verif();

    victoire();

}

function verif() {
    if (cartesRetournees.length == 2) {
        compteur++
    $("#coup").text(compteur);
        if (cartesRetournees[0].attr("data-value") === cartesRetournees[1].attr("data-value")) {
            cartesRetournees[0].addClass("bg-reussite");
            cartesRetournees[1].addClass("bg-reussite");
            console.log("J'ai 2 cartes")
            resetCartes();

        }
    
    else {
        console.log("j'ai une carte")
        setTimeout(() => {
            cartesRetournees[0].attr("src", "ressources/question.svg");
            cartesRetournees[1].attr("src", "ressources/question.svg");
            resetCartes();

        }, 1000)
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

Effet retournement de la carte (rotate3D ?)
Factoriser le code




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
