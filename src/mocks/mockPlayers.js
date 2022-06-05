const mockPlayers = [
  {
    id: 1,
    name: "Don Pepe y las bombas",
    image:
      "https://static.wikia.nocookie.net/bomberman/images/7/7c/Bomberman.jpg/revision/latest?cb=20110224052127&path-prefix=es",
    category: "Strategy",
    year: new Date("2000/10/21"),
    description: "BlaBlaBle",
    played: true,
    platform: [],
  },
  {
    id: 2,
    name: "Lolillo",
    image:
      "https://i.3djuegos.com/juegos/3472/league_of_legends_clash_of_fates/fotos/ficha/league_of_legends_clash_of_fates-2379780.jpg",
    category: "moba",
    year: new Date("2012/10/21"),
    description: "Muerte",
    played: true,
    platform: [],
  },
  {
    id: 3,
    name: "Maincra",
    image:
      "https://pbs.twimg.com/profile_images/724829006764367874/M6wkHDHt_400x400.jpg",
    category: "Sandbox",
    year: new Date("2013/10/21"),
    description: "BlaBlaBla",
    played: true,
    platform: [],
  },
];

const mockPlayerInformation = {
  id: 3,
  name: "Maincra",
  image:
    "https://pbs.twimg.com/profile_images/724829006764367874/M6wkHDHt_400x400.jpg",
  category: "Sandbox",
  year: new Date("2013/10/21"),
  description: "BlaBlaBla",
  played: true,
  platform: [],
};

module.exports = { mockPlayers, mockPlayerInformation };
