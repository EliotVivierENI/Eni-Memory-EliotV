//--------------------------
// Variables générales -----
//--------------------------
let cartesRetournees = [];
let compteur = 0;
let nbCartes = 12;
let verrouillage = false;
let plateauActif = [];
// -----------------------
//  Tableaux d'images ----
// -----------------------

const legumes = Array.from(
  { length: 6 },
  (_, i) => `ressources/memory-legume/${i + 1}.svg`,
);

const animauxAnimes = Array.from(
  { length: 8 },
  (_, i) => `ressources/animauxAnimes/${i + 1}.webp`,
);

const animauxDoms = Array.from(
  { length: 10 },
  (_, i) => `ressources/animauxdomestiques/${i + 1}.jpg`,
);

const dinosaures = Array.from(
  { length: 10 },
  (_, i) => `ressources/dinosaures/${i + 1}.jpg`,
);

const dinosauresNoms = Array.from(
  { length: 10 },
  (_, i) => `ressources/dinosauresAvecNom/${i + 1}.jpg`,
);

const chiens = Array.from(
  { length: 23 },
  (_, i) => `ressources/chiens/${i + 1}.webp`,
);

const alphabet = Array.from(
  { length: 26 },
  (_, i) => `ressources/alphabet-scrabble/${i + 1}.png`,
);

const animaux = Array.from(
  { length: 27 },
  (_, i) => `ressources/animaux/${i + 1}.webp`,
);

const themes = {
  legumes: legumes,
  animauxAnimes: animauxAnimes,
  animauxDoms: animauxDoms,
  dinosaures: dinosaures,
  dinosauresNoms: dinosauresNoms,
  chiens: chiens,
  alphabet: alphabet,
  animaux: animaux,
};

//Fonction d'initialisation

window.onload = init;

function init() {
  $("#formPlateau").on("submit", function (event) {
    event.preventDefault();

    nbCartes = parseInt($("#nombre").val()) * 2;

    plateauActif = [];
    $('input[type="checkbox"]:checked').each(function () {
      const nomTheme = $(this).val();

      const tableauDuTheme = themes[nomTheme];

      plateauActif.push(...tableauDuTheme);
    });

    if (plateauActif.length * 2 < nbCartes) {
      alert("Erreur, Total de cartes insuffisant");
      return;
    }

    placerCartes();
  });

  $("#monPlateau").on("click", "#plateau img", retournerImg);

  $("#monPlateau").on("click", "#btn-reset", resetJeu);
  $("#notif-result").on("click", "#btn-popup-reset", resetJeu);
  $("#notif-result").on("click", "#close", cacherPopup);

  $(window).on("keyup", function (e) {
    if (e.key === " " || e.code === "Space") {
      resetJeu();
    }
  });
}
//-------------------------------------------------
// Fonction qui réinitialise le plateau de jeu ----
//-------------------------------------------------

function resetJeu() {
  compteur = 0;
  $("#coup").text(compteur);
  $("#plateau").find("img").attr("src", "ressources/question.svg");
  $("#plateau").find("img").removeClass("bg-reussite");
  $("#plateau").find("img").removeClass("retourne");
  $("#plateau").find("img").css("pointer-events", "auto");
  cacherPopup();
  placerCartes();
}

//----------------------------------------------------------
// Fonction générique permettant de mélanger un tableau ----
//----------------------------------------------------------

function melanger(monTab) {
  for (let i = monTab.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [monTab[i], monTab[j]] = [monTab[j], monTab[i]];
  }
}

//------------------------------------------------------------------------------------------------------------------
// Fonction qui genere le plateau de jeu en fonction du nombre de cartes selectionnees par l'utilisateur -----------
//------------------------------------------------------------------------------------------------------------------

function generationPlateau(nbCartes) {
  $("#monPlateau").addClass("box").html(`
      <h2>Plateau : <span id="cartes">${nbCartes}</span> cartes</h2>
      <div class="plateau" id="plateau"></div>
      <p>Nombres de coup joués : <span id="coup">0</span>.</p>
      <button id="btn-reset" class="btn_style_reset">Recommencer la partie</button>
    `);

  for (let i = 0; i < nbCartes; i++) {
    $("#plateau").append(
      $("<img>", {
        src: "ressources/question.svg",
        alt: "",
        id: "img_" + i,
      }),
    );
  }
}

//-------------------------------------------------------------------------------------------------------------------------
// Fonction qui attribue une sous-valeur comprise entre 1 et le nombre de cartes selectionnees par l'utilisateur ----------
//-------------------------------------------------------------------------------------------------------------------------

function placerCartes() {
  melanger(plateauActif);
  generationPlateau(nbCartes);

  const index = Array.from({ length: nbCartes / 2 }, (_, i) => i + 1);

  let pairesIndex = [...index, ...index];
  melanger(pairesIndex);

  for (let i = 0; i < nbCartes; i++) {
    $("#img_" + i).attr("data-value", pairesIndex[i]);
  }
}

//---------------------------------------------------------------------
//Fonction qui retourne visuellement la carte en cliquant dessus ------
//---------------------------------------------------------------------

function retournerImg() {
  if (verrouillage) {
    return;
  }

  $(this).toggleClass("retourne");
  console.log(plateauActif);
  $(this).attr("src", plateauActif[$(this).attr("data-value") - 1]);

  $(this).css("pointer-events", "none");

  cartesRetournees.push($(this));

  verif();

  victoire();
}

//-----------------------------------------------------------------------------------------------------------
//Fonction de verification, Si 2 cartes identiques => devient vert, sinon retourne & remet question.svg------
//-----------------------------------------------------------------------------------------------------------

function verif() {
  if (cartesRetournees.length == 2) {
    compteur++;
    verrouillage = true;
    $("#coup").text(compteur);
    if (
      cartesRetournees[0].attr("data-value") ===
      cartesRetournees[1].attr("data-value")
    ) {
      setTimeout(() => {
        for (let i = 0; i < cartesRetournees.length; i++) {
          cartesRetournees[i].addClass("bg-reussite");
          cartesRetournees[i].toggleClass("retourne");
        }
        verrouillage = false;
        resetCartes();
      }, 0);
    } else {
      setTimeout(() => {
        for (let i = 0; i < cartesRetournees.length; i++) {
          cartesRetournees[i].attr("src", "ressources/question.svg");
          cartesRetournees[i].toggleClass("retourne");
          cartesRetournees[i].css("pointer-events", "auto");
        }
        verrouillage = false;
        resetCartes();
      }, 1200);
    }
  } else {
  }
}

//--------------------------------------------------------------------------
// Fonction simple qui reininitialise le tableau de cartes cliquees---------
//--------------------------------------------------------------------------

function resetCartes() {
  cartesRetournees = [];
}

//--------------------------------------------------------------------------
// Fonction condition de victoire
//--------------------------------------------------------------------------

function victoire() {
  for (let i = 0; i < nbCartes; i++) {
    if ($("#img_" + i).attr("src") === "ressources/question.svg") {
      return;
    }
  }
  setTimeout(() => {
    afficherPopupReussie();
  }, 1000);
}

//--------------------------------------------------------------------------
// Fonction génération PopUp Victoire
//--------------------------------------------------------------------------

function afficherPopupReussie() {
  $("#notif-result").html(`<div><h2>Bravo !</h2>
        <p>Vous avez réussi en <span id="coups"></span> coups</p>
        <button id="btn-popup-reset" class="btn_style_reset">Recommencer la partie</button></div>
        <div id="close"><p>Fermer</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg></div>`);
  $("#coups").text(compteur);
  $("#notif-result").css("display", "flex");
}

//--------------------------------------------------------------------------
// Fonction pour cacher la PopUp Victoire
//--------------------------------------------------------------------------

function cacherPopup() {
  $("#notif-result").text("Connexion réussie !");
  $("#notif-result").css("display", "none");
}
