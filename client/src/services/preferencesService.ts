export type MediaType = "movie" | "tv";
export type TitleRef = { id: number; mediaType: MediaType };

type StoredPrefs = {
  watchlist: TitleRef[];
  liked: TitleRef[];
};

const key = (userId: string) => `prefs:${userId}`;

function read(userId: string): StoredPrefs {
  try {
    const raw = localStorage.getItem(key(userId));
    if (!raw) return { watchlist: [], liked: [] };
    const parsed = JSON.parse(raw) as StoredPrefs;
    return {
      watchlist: Array.isArray(parsed.watchlist) ? parsed.watchlist : [],
      liked: Array.isArray(parsed.liked) ? parsed.liked : [],
    };
  } catch {
    return { watchlist: [], liked: [] };
  }
}

function write(userId: string, prefs: StoredPrefs) {
  localStorage.setItem(key(userId), JSON.stringify(prefs));
}

function has(arr: TitleRef[], ref: TitleRef) {
  return arr.some((x) => x.id === ref.id && x.mediaType === ref.mediaType);
}

export async function getFlags(userId: string, ref: TitleRef): Promise<{ inWatchlist: boolean; isFavorite: boolean }> {
  const p = read(userId);
  return { inWatchlist: has(p.watchlist, ref), isFavorite: has(p.liked, ref) };
}

export async function toggleWatchlist(userId: string, ref: TitleRef): Promise<boolean> {
  const p = read(userId);
  if (has(p.watchlist, ref)) {
    p.watchlist = p.watchlist.filter((x) => !(x.id === ref.id && x.mediaType === ref.mediaType));
    write(userId, p);
    return false; // הוסר
  } else {
    p.watchlist.push(ref);
    write(userId, p);
    return true; // נוסף
  }
}

export async function toggleFavorite(userId: string, ref: TitleRef): Promise<boolean> {
  const p = read(userId);
  if (has(p.liked, ref)) {
    p.liked = p.liked.filter((x) => !(x.id === ref.id && x.mediaType === ref.mediaType));
    write(userId, p);
    return false;
  } else {
    p.liked.push(ref);
    write(userId, p);
    return true;
  }
}