import { TitleData } from "../types/title";
import { getTitle, MediaRoute } from "./titles";

type StoredRef = { id: number; mediaType: MediaRoute };

export async function listWatchlist(signal?: AbortSignal): Promise<TitleData[]> {
  const raw = localStorage.getItem("prefs:1");
  if (!raw) return [];

  let prefs: { watchlist?: StoredRef[] };
  try {
    prefs = JSON.parse(raw);
  } catch {
    return [];
  }

  const refs = prefs.watchlist ?? [];
  if (refs.length === 0) return [];

  const uniq = Array.from(
    new Map(refs.map(r => [`${r.mediaType}:${r.id}`, r])).values()
  );

  const results = await Promise.allSettled(
    uniq.map(r => getTitle(r.mediaType, r.id, signal))
  );

  return results
    .filter((r): r is PromiseFulfilledResult<TitleData | null> => r.status === "fulfilled")
    .map(r => r.value)
    .filter((x): x is TitleData => !!x);
}
