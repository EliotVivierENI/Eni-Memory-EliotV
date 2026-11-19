//Variables
let cartesRetournees = [];
let compteur = 0;
let nbCartes = 12;

// --------------------------
// Mes tableaux d'images ----
// --------------------------

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
  { length: 28 },
  (_, i) => `ressources/animaux/${i + 1}.webp`,
);


const themes = {
    legumes:legumes,
    animauxAnimes:animauxAnimes,
    animauxDoms:animauxDoms,
    dinosaures:dinosaures,
    dinosauresNoms:dinosauresNoms,
    chiens:chiens,
    alphabet:alphabet,
    animaux:animaux
}
let plateauActif = [];

window.onload = init;

function init() {
  $("#formPlateau").on("submit", function (event) {
    event.preventDefault();

    nbCartes = parseInt($("#nombre").val());

    

// 2. On boucle sur chaque checkbox cochée
plateauActif = [];
$('input[type="checkbox"]:checked').each(function() {
  // 3. $(this).val() lit l'attribut value="..." de la case (ex: "legumes")
  const nomTheme = $(this).val();

  // 4. On va chercher le tableau correspondant dans votre objet "themes"
  const tableauDuTheme = themes[nomTheme];

  // 5. On ajoute toutes ses images dans plateauActif grâce aux trois points (...)
  plateauActif.push(...tableauDuTheme);
});

console.table(plateauActif);
melanger(plateauActif)



    generationPlateau(nbCartes);
    placerCartes();
  });

  $("#monPlateau").on("click", "#plateau img", retournerImg);

  $("#monPlateau").on("click", "#btn-reset", resetJeu);

  $(window).on("keyup", function (e) {
    if (e.key === " " || e.code === "Space") {
      resetJeu();
    }
  });
}


function resetJeu() {
  compteur = 0;
  $("#coup").text(compteur);
  $("#plateau").find("img").attr("src", "ressources/question.svg");
  $("#plateau").find("img").removeClass("bg-reussite");
  $("#plateau").find("img").removeClass("retourne");
  $("#plateau").find("img").css("pointer-events", "auto");
  placerCartes();
}









function melanger(monTab) {
  for (let i = monTab.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [monTab[i], monTab[j]] = [monTab[j], monTab[i]];
  }
}

//Assigne une sous valeur entre 1 et 6 compris à chaque image
function placerCartes() {
  const index = Array.from({ length: nbCartes / 2 }, (_, i) => i + 1);

  let pairesIndex = [...index, ...index];
  melanger(pairesIndex);

  for (let i = 0; i < nbCartes; i++) {
    $("#img_" + i).attr("data-value", pairesIndex[i]);
  }
}

//Affiche la carte après un clic
function retournerImg() {
  $(this).toggleClass("retourne");
console.log(plateauActif)
  $(this).attr("src", plateauActif[$(this).attr("data-value") - 1]);

  $(this).css("pointer-events", "none");

  cartesRetournees.push($(this));

  verif();

  victoire();
}

function verif() {
  if (cartesRetournees.length == 2) {
    compteur++;
    $("#coup").text(compteur);
    if (
      cartesRetournees[0].attr("data-value") ===
      cartesRetournees[1].attr("data-value")
    ) {
      for (let i = 0; i < cartesRetournees.length; i++) {
        cartesRetournees[i].addClass("bg-reussite");
        cartesRetournees[i].toggleClass("retourne");
      }

      resetCartes();
    } else {
      setTimeout(() => {
        for (let i = 0; i < cartesRetournees.length; i++) {
          cartesRetournees[i].attr("src", "ressources/question.svg");
          cartesRetournees[i].toggleClass("retourne");
          cartesRetournees[i].css("pointer-events", "auto");
        }

        resetCartes();
      }, 1200);
    }
  } else {
  }
}

function resetCartes() {
  cartesRetournees = [];
}

function victoire() {
  for (let i = 0; i < nbCartes; i++) {
    if ($("#img_" + i).attr("src") === "ressources/question.svg") {
      return;
    }
  }
  setTimeout(() => {
    alert(
      `Victoire ! \nLe joueur remporte la partie en ${compteur} coups ! \nAppuie sur barre espace pour relancer.`,
    );
  }, 1000);
}

/*


- Utilisateur entre un nombre de carte

- Définir tout mes tableaux d'images
- MonTableau = TableauxImagesCoché + TableauxImagesCoché2 + TableauxImagesCoché3 etc
- shuffle(MonTableau)


- Math.floor(Math.random(MonTableau)* nbCartes)






Demain : 




A faire avant Vendredi:
Page Profil
Refaire Nav
Recoder CSS avec Boostrap ?
Le rendre dynamique avec les autres tableaux

Idée Bonus : 
Mode Sombre/Clair ( refaire chaque code couleur avec variable)
*/

function generationPlateau(nbCartes) {
  const $box = $("<section>", { class: "box" }).html(`
    <h2>Plateau Légumes : 4 x 3</h2>
    <div class="plateau" id="plateau"></div>
    <p>Nombres de coup joués : <span id="coup">0</span>.</p>
    <button id="btn-reset">Recommencer la partie</button>
  `);

  for (let i = 0; i < nbCartes; i++) {
    $box.find("#plateau").append(
      $("<img>", {
        src: "ressources/question.svg",
        alt: "",
        id: "img_" + i,
      }),
    );
  }

  $("#monPlateau").empty().append($box);
}
