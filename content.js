export const NAV = [
  { id: "home", to: "/", label: "Accueil" },
  { id: "association", to: "/association", label: "L'association" },
  { id: "ateliers", to: "/ateliers", label: "Les Ateliers des Étoiles" },
  { id: "projets", to: "/projets", label: "Projets & création" },
  { id: "contact", to: "/contact", label: "Contact" },
];

export const CONTACT = {
  email: "lesenfantsperdus.avignon@gmail.com",
  venue: "Théâtre La Carreterie",
  street: "101 rue de la Carreterie",
  city: "84000 Avignon",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Th%C3%A9%C3%A2tre+La+Carreterie+101+rue+de+la+Carreterie+84000+Avignon",
  mapsEmbed: "https://www.google.com/maps?q=Th%C3%A9%C3%A2tre%20La%20Carreterie%2C%20101%20rue%20de%20la%20Carreterie%2C%2084000%20Avignon&output=embed",
  phones: [
    { id: "chiara", name: "Chiara", display: "07 45 23 48 68", tel: "+33745234868" },
    { id: "simonida", name: "Simonida", display: "07 67 42 79 12", tel: "+33767427912" },
  ],
};

export const SETTINGS = {
  email: "lesenfantsperdus.avignon@gmail.com",
  phones: [
    { id: "chiara", name: "Chiara", display: "07 45 23 48 68", tel: "+33745234868" },
    { id: "simonida", name: "Simonida", display: "07 67 42 79 12", tel: "+33767427912" },
  ],
  instagram: "",
  creationDate: "",
  rna: "",
  season: "saison 2026 — 2027",
  images: {
    hero: { img: "/img/forest-path.jpg", pos: "center" },
    approach: { img: "/img/masks.jpg", pos: "center" },
    origins: { img: "/img/stage-bench.jpg", pos: "center" },
  },
};

export const MARQUEE = ["Théâtre physique", "Mouvement", "Improvisation", "Masque", "Clown", "Théâtre d'objets", "Création collective", "Avignon"];

export const APPROACH = [
  { k: "Corps & mouvement", t: "Le corps est le premier outil de l'acteur·rice. On observe, on imite, on transpose : un élément, une matière, un animal, un rythme deviennent des points de départ pour jouer." },
  { k: "Improvisation", t: "Jouer sans filet, à l'écoute du partenaire et de l'espace. L'improvisation est un laboratoire où l'on apprend à accepter, proposer et rebondir." },
  { k: "Masque & personnage", t: "Le masque oblige à jouer avec tout le corps. Il ouvre un chemin vers des personnages inattendus, loin de soi et pourtant très justes." },
  { k: "Clown & comique physique", t: "Rater, recommencer, partager l'instant avec le public : le clown fait de la fragilité une matière de jeu." },
  { k: "Théâtre d'objets", t: "Un balai, une chaise, un morceau de tissu : l'objet se transforme, prend vie et raconte autre chose que ce qu'il est." },
  { k: "Création collective", t: "Les participant·es inventent ensemble leur univers : idées, scènes, écriture, costumes et scénographie se construisent au fil de l'année." },
];

export const SESSION_STEPS = [
  { n: "01", t: "Se rendre disponible", d: "Échauffement, présence, conscience du groupe et de l'espace." },
  { n: "02", t: "Jouer ensemble", d: "Jeux théâtraux d'écoute, de rythme et de réaction." },
  { n: "03", t: "Explorer", d: "Improvisations, mouvement, masques, objets ou musique selon le thème de la séance." },
  { n: "04", t: "Composer", d: "Les trouvailles deviennent des scènes, qui nourrissent la création collective de l'année." },
];

export const WORKSHOPS = [
  {
    id: "petites-etoiles",
    name: "Les Ateliers des Petites Étoiles",
    public: "Enfants",
    age: "6 – 11 ans",
    day: "Samedi",
    time: "12h30 – 14h30",
    start: null,
    img: "/img/move-run.jpg",
    tone: "sky",
    tagline: "Un espace pour explorer le corps et l'imaginaire, et inventer des mondes à plusieurs.",
    does: [
      "Jeux théâtraux pour apprendre à écouter, réagir et jouer avec les autres.",
      "Création de personnages inattendus à partir du corps, du mouvement et de la voix.",
      "Invention d'histoires collectives, de leurs décors et de leurs costumes.",
    ],
    tools: ["Jeu théâtral", "Mouvement", "Improvisation", "Musique", "Personnages", "Objets"],
    creation: "Cette saison, le groupe part à la découverte de l'univers de Peter Pan pour imaginer sa propre aventure théâtrale. Les idées des enfants nourrissent l'écriture, la mise en scène et les costumes.",
    performance: "Présentation publique en juin sur la scène du Théâtre La Carreterie.",
    price: "", membership: "", trial: "",
  },
  {
    id: "etoiles",
    name: "Les Ateliers des Étoiles",
    public: "Adolescent·es",
    age: "12 – 17 ans",
    day: "Mercredi",
    time: "18h30 – 20h30",
    start: null,
    img: "/img/move-blur.jpg",
    tone: "night",
    tagline: "Un défi poétique et physique : oser l'absurde, chercher les limites du mouvement, construire une pièce ensemble.",
    does: [
      "Improvisation, travail corporel et musical pour trouver un langage de groupe.",
      "Écriture de plateau : les scènes naissent des propositions des participant·es.",
      "Prise en charge collective de la création : jeu, écriture, costumes, scénographie.",
    ],
    tools: ["Improvisation", "Théâtre physique", "Masque", "Clown", "Écriture de plateau", "Scénographie"],
    creation: "Le groupe construit au fil de l'année un spectacle qui lui ressemble, à partir de ses idées, de ses envies et des talents de chacun·e.",
    performance: "Présentation publique en juin sur la scène du Théâtre La Carreterie.",
    price: "", membership: "", trial: "",
  },
  {
    id: "adultes",
    name: "Atelier adultes",
    public: "Adultes",
    age: "Tous âges, tous niveaux",
    day: "Lundi",
    time: "17h30 – 19h30",
    start: "À partir du lundi 7 décembre",
    img: "/img/move-lean.jpg",
    tone: "forest",
    tagline: "Explorer le théâtre par le corps, le mouvement et l'improvisation. Aucune expérience préalable n'est nécessaire.",
    does: [
      "Exercices d'improvisation et de présence pour découvrir les outils du jeu d'acteur·rice.",
      "Jeux et explorations inspirés de grandes pédagogies théâtrales internationales, dont celle de Jacques Lecoq.",
      "Travail de groupe, de l'écoute à la composition de courtes scènes.",
    ],
    tools: ["Présence", "Mouvement", "Improvisation", "Masque", "Clown", "Composition"],
    creation: "Les séances avancent vers des formes courtes, composées à partir des improvisations du groupe.",
    performance: "Présentation de fin de parcours : à confirmer.",
    price: "", membership: "", trial: "",
  },
];

export const CATS = {
  asso: { label: "Produit par l'association", short: "L'association" },
  parcours: { label: "Parcours antérieur des fondatrices", short: "Parcours des fondatrices" },
  recherche: { label: "Formation & recherche", short: "Recherche" },
  avenir: { label: "À venir", short: "À venir" },
};

export const PROJECTS = [
  {
    id: "ateliers-saison", cat: "asso", year: "Saison 2026 – 2027", title: "Les Ateliers des Étoiles",
    kind: "Programme pédagogique", img: "/img/stage-empty.jpg",
    desc: "Premier programme de l'association : trois groupes hebdomadaires (enfants, adolescent·es, adultes) au Théâtre La Carreterie, fondés sur le jeu, le mouvement et la création collective.",
    credits: [["Conception & encadrement", "Chiara Virgilio, Simonida Mandić"], ["Lieu", "Théâtre La Carreterie, Avignon"]],
    status: "En cours",
  },
  {
    id: "peter-pan", cat: "asso", year: "Juin 2027 — date à confirmer", title: "Une aventure au pays de Peter Pan",
    kind: "Création collective — 6 à 11 ans", img: "/img/forest-moon.jpg",
    desc: "Création imaginée par le groupe des Petites Étoiles à partir de l'univers de Peter Pan : personnages, récits et costumes inventés en atelier.",
    credits: [["Interprétation & écriture", "Les participant·es des Petites Étoiles"], ["Accompagnement artistique", "Chiara Virgilio, Simonida Mandić"]],
    status: "En création",
  },
  {
    id: "creation-ados", cat: "asso", year: "Juin 2027 — date à confirmer", title: "Création des Ateliers des Étoiles",
    kind: "Création collective — 12 à 17 ans", img: "/img/stage-blue.jpg",
    desc: "Spectacle construit par le groupe adolescent à partir de ses improvisations et de son écriture de plateau. Titre à venir.",
    credits: [["Interprétation & écriture", "Les participant·es des Ateliers des Étoiles"], ["Accompagnement artistique", "Chiara Virgilio, Simonida Mandić"]],
    status: "En création",
  },
  {
    id: "atelier-adultes", cat: "avenir", year: "Lundi 7 décembre 2026", title: "Ouverture de l'atelier adultes",
    kind: "Atelier hebdomadaire", img: "/img/move-wall.jpg",
    desc: "Lancement d'un atelier pour adultes de tous âges et tous niveaux, le lundi de 17h30 à 19h30.",
    credits: [["Encadrement", "Chiara Virgilio, Simonida Mandić"]],
    status: "À venir",
  },
  {
    id: "lecoq", cat: "recherche", year: "Années à confirmer", title: "Formation à l'École Internationale de Théâtre Jacques Lecoq",
    kind: "Formation des fondatrices", img: "/img/masks.jpg",
    desc: "Les deux fondatrices se sont formées à la pédagogie Lecoq : analyse du mouvement, masque neutre, jeu physique, création collective. Cette formation est le socle de la démarche de l'association.",
    credits: [["Concernées", "Chiara Virgilio, Simonida Mandić"]],
    status: "Parcours",
  },
  {
    id: "befemon", cat: "parcours", year: "Date à confirmer", title: "BE:FEMON",
    kind: "Spectacle solo", img: "/img/curtain.jpg",
    desc: "Simonida Mandić contribue à la conception et à l'organisation du spectacle solo « BE:FEMON ».",
    credits: [["Rôle", "Conception et organisation (contribution) — Simonida Mandić"], ["Lieu, production", "À confirmer"]],
    status: "Travail antérieur",
  },
  {
    id: "majske-igre", cat: "parcours", year: "Dates à confirmer", title: "Festival « Majske igre »",
    kind: "Festival de théâtre pour enfants — Serbie", img: "/img/stage-blue.jpg",
    desc: "Festival de théâtre pour enfants fort d'une tradition de plus de 70 ans, à l'organisation duquel Simonida Mandić a participé.",
    credits: [["Rôle", "Participation à l'organisation — Simonida Mandić"]],
    status: "Travail antérieur",
  },
  {
    id: "ecole-simonida", cat: "parcours", year: "Dates à confirmer", title: "Une école de théâtre pour enfants",
    kind: "Pédagogie — enfants de 6 à 12 ans", img: "/img/move-run.jpg",
    desc: "Dans sa ville natale, en Serbie, Simonida Mandić fonde une école de théâtre où elle accompagne des enfants de 6 à 12 ans à travers des ateliers, des exercices théâtraux et la création de spectacles.",
    credits: [["Rôle", "Fondatrice et pédagogue — Simonida Mandić"]],
    status: "Travail antérieur",
  },
  {
    id: "anglais-refugies", cat: "parcours", year: "Dates à confirmer", title: "Le jeu pour apprendre l'anglais",
    kind: "Pédagogie — enfants réfugiés", img: "/img/stage-bench.jpg",
    desc: "Chiara Virgilio utilise le théâtre et le jeu pour enseigner l'anglais à des enfants réfugiés.",
    credits: [["Rôle", "Pédagogue — Chiara Virgilio"], ["Structure partenaire", "À confirmer"]],
    status: "Travail antérieur",
  },
  {
    id: "chiara-enfance", cat: "parcours", year: "Plus de dix ans", title: "Dix ans de théâtre avec les enfants et les adolescent·es",
    kind: "Pédagogie — de la petite enfance à 18 ans", img: "/img/move-blur.jpg",
    desc: "Depuis plus de dix ans, Chiara Virgilio travaille avec des enfants et des adolescent·es, de la petite enfance à 18 ans, dans des contextes artistiques et éducatifs variés, entre Londres et Avignon.",
    credits: [["Rôle", "Comédienne, pédagogue, facilitatrice — Chiara Virgilio"]],
    status: "Travail antérieur",
  },
  {
    id: "central", cat: "recherche", year: "Londres", title: "Royal Central School of Speech and Drama",
    kind: "Formation — théâtre, éducation et pratiques artistiques", img: "/img/stage-empty.jpg",
    desc: "Chiara Virgilio est diplômée de la Royal Central School of Speech and Drama de Londres, en théâtre, éducation et pratiques artistiques.",
    credits: [["Concernée", "Chiara Virgilio"]],
    status: "Parcours",
  },
  {
    id: "academie-tchekhov", cat: "recherche", year: "Serbie", title: "Académie des arts dramatiques & méthode Michael Tchekhov",
    kind: "Formation d'actrice — théâtre et cinéma", img: "/img/mask-dark.jpg",
    desc: "Simonida Mandić est diplômée de l'Académie des arts dramatiques. Elle se forme également à la méthodologie de Michael Tchekhov, avant de rejoindre l'École Jacques Lecoq quatre ans après son diplôme.",
    credits: [["Concernée", "Simonida Mandić"]],
    status: "Parcours",
  },
  {
    id: "future-creation", cat: "avenir", year: "Calendrier à confirmer", title: "Première création professionnelle de l'association", placeholder: true,
    kind: "Projet en développement", img: "/img/mask-dark.jpg",
    desc: "Emplacement réservé à un futur projet de création porté par Les Enfants Perdus. À compléter dès que le projet est formalisé (équipe, partenaires, calendrier).",
    credits: [["Équipe", "À confirmer"]],
    status: "À venir",
  },
];

export const FOUNDERS = [
  {
    id: "chiara", name: "Chiara Virgilio", img: "/img/move-lean.jpg",
    role: "Comédienne, pédagogue et facilitatrice — cofondatrice",
    origin: "Milan, Italie",
    training: ["Royal Central School of Speech and Drama, Londres — théâtre, éducation et pratiques artistiques", "École Internationale de Théâtre Jacques Lecoq, Avignon"],
    focus: ["Jeu", "Créativité", "Improvisation", "Enfance et adolescence"],
    bio: [
      "Originaire de Milan, en Italie, Chiara Virgilio est comédienne, pédagogue et facilitatrice, diplômée de la Royal Central School of Speech and Drama de Londres en théâtre, éducation et pratiques artistiques. Après avoir vécu cinq ans à Londres, elle s'installe à Avignon pour se former à l'École Internationale de Théâtre Jacques Lecoq.",
      "Elle travaille depuis plus de dix ans avec des enfants et des adolescent·es, de la petite enfance à 18 ans, dans des contextes artistiques et éducatifs variés. Elle utilise également le théâtre et le jeu pour enseigner l'anglais à des enfants réfugiés.",
      "Son approche repose sur le jeu, la créativité et l'improvisation. Elle cherche avant tout à créer un espace où chaque enfant peut se sentir en confiance, participer, expérimenter et prendre plaisir à créer avec les autres.",
    ],
  },
  {
    id: "simonida", name: "Simonida Mandić", img: "/img/move-wall.jpg",
    role: "Comédienne de théâtre et de cinéma, pédagogue — cofondatrice",
    origin: "Serbie",
    training: ["Académie des arts dramatiques", "Méthodologie de Michael Tchekhov", "École Internationale de Théâtre Jacques Lecoq, Avignon"],
    focus: ["Théâtre et cinéma", "Création de spectacles avec les enfants", "Organisation de festival"],
    bio: [
      "Simonida Mandić est une comédienne serbe de théâtre et de cinéma. Diplômée de l'Académie des arts dramatiques, elle poursuit quatre ans plus tard sa formation à l'École Internationale de Théâtre Jacques Lecoq. Elle se forme également à la méthodologie de Michael Tchekhov.",
      "Parallèlement à son activité de comédienne, elle fonde une école de théâtre dans sa ville natale, où elle accompagne des enfants de 6 à 12 ans à travers des ateliers, des exercices théâtraux et la création de spectacles.",
      "Elle participe à l'organisation du festival de théâtre pour enfants « Majske igre », fort d'une tradition de plus de 70 ans, et contribue à la conception et à l'organisation du spectacle solo « BE:FEMON ».",
    ],
  },
];
