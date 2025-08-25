import { TitleData } from "../types/title";
import { mockMovies } from "../data/mockMovies";
import { mockTv } from "../data/mockTv";

// ודא שלכל פריט יש mediaType עקבי עם הטייפ שלך: 'Movie' | 'Tv'
const MOVIES: TitleData[] = mockMovies.map(m => ({ ...m, mediaType: "Movie" as const }));
const TVS: TitleData[]    = mockTv.map(t => ({ ...t, mediaType: "Tv" as const }));

export type CategoryFilter = "All" | "Movies" | "TV Shows";

export type SearchParams = {
  query: string;            // יכול להיות "" (כלומר ללא חיפוש טקסטואלי)
  category: CategoryFilter; // All | Movies | TV Shows
};

export type Suggestion = {
  id: string | number;
  label: string;            // טקסט לאוטוקומפליט
  mediaType: "movie" | "tv";
};

// ---- Helpers ----
const normalize = (s: string) => s.trim().toLowerCase();

const getAll = (): TitleData[] => [...MOVIES, ...TVS];

const filterByCategory = (list: TitleData[], category: CategoryFilter) => {
  if (category === "All") return list;
  if (category === "Movies") return list.filter(i => i.mediaType === "Movie");
  return list.filter(i => i.mediaType === "Tv"); // "TV Shows"
};

// ניקוד התאמה בסיסי
const matchScore = (item: TitleData, q: string): number => {
  if (!q) return 0; // ללא חיפוש – אין ניקוד
  const title = normalize(item.title);
  const overview = normalize(item.overview ?? "");

  if (title.startsWith(q)) return 100;
  if (title.includes(q)) return 70;
  if (overview.includes(q)) return 30;
  return -1; // לא מתאים
};

const sortByScore = (
  a: { score: number; popularity?: number },
  b: { score: number; popularity?: number }
) => {
  if (b.score !== a.score) return b.score - a.score;
  const ap = typeof a.popularity === "number" ? a.popularity : 0;
  const bp = typeof b.popularity === "number" ? b.popularity : 0;
  return bp - ap;
};

// ---- API לשימוש חיצוני (UI) ----

/** חיפוש מלא (תוצאות לרשימה/גריד) */
export async function searchTitles(params: SearchParams): Promise<TitleData[]> {
  const { query, category } = params;
  const q = normalize(query);

  const base = filterByCategory(getAll(), category);
  if (!q) return base;

  const scored = base
    .map(item => ({ ...item, score: matchScore(item, q) }))
    .filter(x => x.score >= 0)
    .sort(sortByScore);

  // מחזיר TitleData; השדה score הוא "עודף" ולא מזיק
  return scored;
}

/** אוטוקומפליט מתחת לשדה חיפוש */
export async function suggestTitles(params: SearchParams, limit = 8): Promise<Suggestion[]> {
  const { query, category } = params;
  const q = normalize(query);
  if (!q) return [];

  const base = filterByCategory(getAll(), category);

  const suggestions = base
    .map(item => ({ item, score: matchScore(item, q) }))
    .filter(x => x.score >= 0)
    .sort(sortByScore)
    .slice(0, limit)
    .map(({ item }) => ({
      id: item.id,
      label: item.title || "Untitled",
      mediaType: item.mediaType.toLowerCase() as "movie" | "tv"
    }));

  return suggestions;
}

/** Utility: שליפת פריט בודד (ללחיצה באוטוקומפליט) */
export async function getById(id: string | number): Promise<TitleData | undefined> {
  const all = getAll();
  return all.find(x => String(x.id) === String(id));
}
