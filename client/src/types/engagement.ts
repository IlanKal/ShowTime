import type { MovieGenre } from "../utils/movieGenres";

export type MediaType = "movie" | "tv";

/** פריט בסיסי שמזהה כותרת ב-TMDB */
export interface TitleRef {
  id: number;          // TMDB ID
  mediaType: MediaType;
}

/** העדפות/אינטראקציות של המשתמש */
export interface UserPreferences {
  watchlist: TitleRef[];      
  liked: TitleRef[];    
  favoriteGenres: MovieGenre[];
}