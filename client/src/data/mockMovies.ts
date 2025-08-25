import { TitleData } from "../types/title";

export const mockMovies: TitleData[] = [
  // נשמר מהקובץ הישן
  {
    id: 617126,
    mediaType: "Movie",
    title: "The Fantastic 4: First Steps",
    releaseYear: "2025",
    runtime: "115 minutes",
    rating: 7.2,
    voteCount: 13915,
    genres: ["Science Fiction", "Adventure"],
    posterPath: "/x26MtUlwtWD26d0G0FXcppxCJio.jpg",
    backdropPath: "/3IgJReIyunq95ta86CTSOs9vAht.jpg",
    trailerKey: "6Az7d-KCZ4M",
    overview:
      "Against the vibrant backdrop of a 1960s-inspired, retro-futuristic world, Marvel's First Family defends Earth from Galactus and the Silver Surfer while balancing family and heroism.",
    creator: {
      name: "Matt Shakman",
      profilePath: "/kraLXlC9egJh4pTNTpKUYhkkNiu.jpg",
    },
    cast: [
      {
        name: "Pedro Pascal",
        character: "Reed Richards / Mister Fantastic",
        profilePath: "/9VYK7oxcqhjd5LAH6ZFJ3XzOlID.jpg",
      },
      {
        name: "Vanessa Kirby",
        character: "Sue Storm / Invisible Woman",
        profilePath: "/a8a9U00KL2JJkkekzhNnueIGKKF.jpg",
      },
      {
        name: "Ebon Moss-Bachrach",
        character: "Ben Grimm / The Thing",
        profilePath: "/xD8GVNayMpiTZxLfahy2DseYcQq.jpg",
      },
      {
        name: "Joseph Quinn",
        character: "Johnny Storm / Human Torch",
        profilePath: "/zshhuioZaH8S5ZKdMcojzWi1ntl.jpg",
      },
    ],
  },

  // The Dark Knight (דוגמה ריאליסטית)
  {
    id: 155,
    mediaType: "Movie",
    title: "The Dark Knight",
    releaseYear: "2008",
    runtime: "152 minutes",
    rating: 9.0,
    voteCount: 2900000,
    genres: ["Action", "Crime", "Drama"],
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    trailerKey: "EXeTwQWrcwY",
    overview:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos and forces the hero to confront the line between justice and vigilantism.",
    creator: {
      name: "Christopher Nolan",
      profilePath: "/lWQx9g3O5J7KQfP0xL7Q4f9uJv5.jpg",
    },
    cast: [
      { name: "Christian Bale", character: "Bruce Wayne / Batman", profilePath: "/qCpZn2e3dimwbryLnqxZuI88PTi.jpg" },
      { name: "Heath Ledger", character: "Joker", profilePath: "/lNHl2l3S1YQfQAtF5NCz7r3A2kO.jpg" },
      { name: "Aaron Eckhart", character: "Harvey Dent", profilePath: "/cD8FZ2w2K6JqqPiRWaYwIVDSY5P.jpg" },
    ],
  },

  // Inception
  {
    id: 27205,
    mediaType: "Movie",
    title: "Inception",
    releaseYear: "2010",
    runtime: "148 minutes",
    rating: 8.8,
    voteCount: 2600000,
    genres: ["Action", "Science Fiction", "Thriller"],
    posterPath: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropPath: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    trailerKey: "YoHD9XEInc0",
    overview:
      "A skilled thief who steals secrets through dream-sharing technology is offered a chance to have his past crimes forgiven if he can plant an idea in a target's mind.",
    creator: {
      name: "Christopher Nolan",
      profilePath: "/lWQx9g3O5J7KQfP0xL7Q4f9uJv5.jpg",
    },
    cast: [
      { name: "Leonardo DiCaprio", character: "Dom Cobb", profilePath: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg" },
      { name: "Joseph Gordon-Levitt", character: "Arthur", profilePath: "/4U9G4YwTlIEbL0Sgz0d2JjK0n1h.jpg" },
      { name: "Elliot Page", character: "Ariadne", profilePath: "/fZtq2WcCYwiVdc0pJi4V859Wz1V.jpg" },
    ],
  },

  // Interstellar
  {
    id: 157336,
    mediaType: "Movie",
    title: "Interstellar",
    releaseYear: "2014",
    runtime: "169 minutes",
    rating: 8.6,
    voteCount: 2200000,
    genres: ["Adventure", "Drama", "Science Fiction"],
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropPath: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    trailerKey: "zSWdZVtXT7E",
    overview:
      "A team of explorers travels through a wormhole in space to ensure humanity's survival as Earth becomes uninhabitable.",
    creator: {
      name: "Christopher Nolan",
      profilePath: "/lWQx9g3O5J7KQfP0xL7Q4f9uJv5.jpg",
    },
    cast: [
      { name: "Matthew McConaughey", character: "Cooper", profilePath: "/fZJVGyS7gr1RWgSfdJbE4dS9U7N.jpg" },
      { name: "Anne Hathaway", character: "Brand", profilePath: "/tLelKoPNiyJCSEtQTz1FGv4TLGc.jpg" },
      { name: "Jessica Chastain", character: "Murph", profilePath: "/z5LUl9bljJnah3S5rtN7rScrmI7.jpg" },
    ],
  },
];
