import { TitleData } from "../types/title";
import { mockMovies } from "../data/mockMovies";
import { mockTv } from "../data/mockTv";
import { simulateNetwork  } from "./utils";
import { Signal } from "lucide-react";


export type MediaRoute = "movie" | "tv";

const SOURCES: Record<MediaRoute, TitleData[]> ={
  movie: mockMovies,
  tv: mockTv
};

export async function listTitles(
  mediaType: MediaRoute,
  signal?: AbortSignal
): Promise<TitleData[]> {
  await simulateNetwork(signal,200);
  return SOURCES[mediaType];
}

export async function getTitle(
  mediaType: MediaRoute, 
  id: number,
  signal?: AbortSignal
): Promise<TitleData | null> {
  await simulateNetwork(signal,200);
  const source = SOURCES[mediaType];
  return source.find(t => t.id === id) ?? null;
}

export const mediaLabels: Record<MediaRoute, string> = {
  movie: "Movies",
  tv: "TV Shows",
};
