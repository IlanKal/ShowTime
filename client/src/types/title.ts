export interface Creator {
  name: string;
  profilePath: string;
}

export interface CastMember {
  name: string;
  character: string;
  profilePath: string;
}

export interface TitleData {
  id: number;
  mediaType: 'Movie' | 'Tv';
  title: string;
  releaseYear: string;
  runtime: string;
  rating: number;
  voteCount: number;
  genres: string[];
  posterPath?: string;
  backdropPath: string;
  trailerKey: string;
  overview: string;
  creator: Creator;
  cast: CastMember[];
}