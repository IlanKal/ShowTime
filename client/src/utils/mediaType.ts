export type MediaType = "movie" | "tv";
export const normalizeMediaType = (v: string): MediaType =>
  v?.toLowerCase() === "tv" ? "tv" : "movie";
