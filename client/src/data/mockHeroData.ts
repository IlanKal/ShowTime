import HeroItemData from "../types/Hero"

const mockHeroData = [
  {
    id: 575265,
    title: 'Mission: Impossible - The Final Reckoning',
    rating: 7.204,
    voteCount: 1068,
    releaseDate: '2025-05-17',
    description: 'Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world\'s governments and a mysterious ghost from Hunt\'s past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.',
    posterUrl: 'https://image.tmdb.org/t/p/original/538U9snNc2fpnOmYXAPUh3zn31H.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=K5PP7igejMU',
  },
  {
    id: 1061474,
    title: 'Superman',
    rating: 7.617,
    voteCount: 2147,
    releaseDate: '2025-07-09',
    description: 'Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.',
    posterUrl: 'https://image.tmdb.org/t/p/original/eU7IfdWq8KQy0oNd4kKXS0QUR08.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Ox8ZLF6cGM0',
  },
  {
    id: 1078605,
    title: 'Weapons',
    rating: 7.586,
    voteCount: 409,
    releaseDate: '2025-08-04',
    description: 'When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.',
    posterUrl: 'https://image.tmdb.org/t/p/original/Q2OajDi2kcO6yErb1IAyVDTKMs.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=IDukDKwrXjE',
  },
] as const;

export default mockHeroData as readonly HeroItemData[];