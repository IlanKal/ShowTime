// src/services/titles.ts
import { TitleData } from "../types/title";
import { mockMovies } from "../data/mockMovies";
import { mockTv } from "../data/mockTv";

export type MediaRoute = "movie" | "tv";

export async function listTitles(mediaType: MediaRoute): Promise<TitleData[]> {
  await new Promise((r) => setTimeout(r, 200));
  return mediaType === "movie" ? mockMovies : mockTv;
}

export async function getTitle(mediaType: MediaRoute, id: number): Promise<TitleData | null> {
  const source = mediaType === "movie" ? mockMovies : mockTv;
  const found = source.find(t => t.id === id) ?? null;
  return found;
}

export const mediaLabels: Record<MediaRoute, string> = {
  movie: "Movies",
  tv: "TV Shows",
};
