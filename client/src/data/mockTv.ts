import { TitleData } from "../types/title";

export const mockTv: TitleData[] = [
  // נשמר מהקובץ הישן
  {
    id: 1396,
    mediaType: "Tv",
    title: "Breaking Bad",
    releaseYear: "2008",
    runtime: "56 minutes",
    rating: 8.92,
    voteCount: 15964,
    genres: ["Drama", "Crime"],
    posterPath: "/r3z70vunihrAkjILQKWHX0G2xzO.jpg",
    backdropPath: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    trailerKey: "XZ8daibM3AE",
    overview:
      "A chemistry teacher turns to cooking meth after a cancer diagnosis, dragging his family and a former student into a dangerous criminal world.",
    creator: {
      name: "Vince Gilligan",
      profilePath: "/z3E0DhBg1V1PZVEtS9vfFPzOWYB.jpg",
    },
    cast: [
      { name: "Bryan Cranston", character: "Walter White", profilePath: "/aGSvZg7uITJveQtGHDcPNI6map1.jpg" },
      { name: "Aaron Paul", character: "Jesse Pinkman", profilePath: "/8Ac9uuoYwZoYVAIJfRLzzLsGGJn.jpg" },
      { name: "Anna Gunn", character: "Skyler White", profilePath: "/adppyeu1a4REN3khtgmXusrapFi.jpg" },
      { name: "Bob Odenkirk", character: "Saul Goodman", profilePath: "/rF0Lb6SBhGSTvjRffmlKRSeI3jE.jpg" },
    ],
  },

  // Game of Thrones
  {
    id: 1399,
    mediaType: "Tv",
    title: "Game of Thrones",
    releaseYear: "2011",
    runtime: "57 minutes",
    rating: 8.4,
    voteCount: 22000,
    genres: ["Drama", "Fantasy", "Adventure"],
    posterPath: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    backdropPath: "/zv8KQk3EwBEbYSE0sjjlMTvEih9.jpg",
    trailerKey: "KPLWWIOCOOQ",
    overview:
      "Noble families vie for control of the Iron Throne as an ancient enemy awakens in the North.",
    creator: {
      name: "David Benioff & D. B. Weiss",
      profilePath: "/xW9o1ZQ7oS2rCA8DmF5g2PzYtWW.jpg",
    },
    cast: [
      { name: "Emilia Clarke", character: "Daenerys Targaryen", profilePath: "/j1C8TQ2nC9yVHtVHCnRvWmvMRG4.jpg" },
      { name: "Kit Harington", character: "Jon Snow", profilePath: "/dwR9RRB6jwxKFUdQWGWpZJYG1Ch.jpg" },
      { name: "Peter Dinklage", character: "Tyrion Lannister", profilePath: "/9ukJS2QWTJ9eQ4lM6n0A2B2uH3V.jpg" },
    ],
  },

  // Stranger Things
  {
    id: 66732,
    mediaType: "Tv",
    title: "Stranger Things",
    releaseYear: "2016",
    runtime: "51 minutes",
    rating: 8.6,
    voteCount: 16000,
    genres: ["Drama", "Mystery", "Science Fiction"],
    posterPath: "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    backdropPath: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    trailerKey: "b9EkMc79ZSU",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and supernatural forces.",
    creator: {
      name: "The Duffer Brothers",
      profilePath: "/m9q9zY4x7t6H0s2q3w0pQh7n0oF.jpg",
    },
    cast: [
      { name: "Millie Bobby Brown", character: "Eleven", profilePath: "/A8aFQvGZ4VfqakiobP6KyHRxY6U.jpg" },
      { name: "Finn Wolfhard", character: "Mike Wheeler", profilePath: "/qF2rM9Y8yx7e6VxDRKCVh0b07Xx.jpg" },
      { name: "David Harbour", character: "Jim Hopper", profilePath: "/nQRPSUmHGLrFRPK6v3BI1FRX9h3.jpg" },
    ],
  },

  // The Last of Us
  {
    id: 100088,
    mediaType: "Tv",
    title: "The Last of Us",
    releaseYear: "2023",
    runtime: "55 minutes",
    rating: 8.7,
    voteCount: 7000,
    genres: ["Drama", "Action", "Adventure"],
    posterPath: "/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    backdropPath: "/jZiX2nG3cT2Ri2qfH0hQS0n3eG.jpg",
    trailerKey: "uLtkt8BonwM",
    overview:
      "Years after a fungal pandemic, a hardened survivor escorts a teenage girl across a ravaged United States.",
    creator: {
      name: "Craig Mazin & Neil Druckmann",
      profilePath: "/r8s4Z79DbDeihh5m8SGvtQvECOJ.jpg",
    },
    cast: [
      { name: "Pedro Pascal", character: "Joel Miller", profilePath: "/9VYK7oxcqhjd5LAH6ZFJ3XzOlID.jpg" },
      { name: "Bella Ramsey", character: "Ellie Williams", profilePath: "/6q4r8GMDIS9Zh9AEPqbiZ9erjR1.jpg" },
      { name: "Anna Torv", character: "Tess", profilePath: "/bH6k6RiMIXja2fLG3gNsYchGhjP.jpg" },
    ],
  },
];
