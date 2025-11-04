import axios from "axios";

// 1. הגדרת ה-Interface הראשי
interface HeroItemData {
    id: number;
    title: string;
    rating: number;
    voteCount: number;
    releaseDate: string | null;
    description: string;
    posterUrl: string | null;
    trailerUrl: string; 
}

// 2. הגדרת טיפוס עזר לפריט שעדיין לא מכיל טריילר, אבל מכיל media_type
type MediaItemWithoutTrailer = Omit<HeroItemData, 'trailerUrl'> & { media_type: 'movie' | 'tv' };
// 3. הגדרת טיפוס עזר לנתון הגולמי הנכנס מה-API
interface TmdbRawItem {
    id: number;
    title?: string;
    name?: string;
    vote_average: number;
    vote_count: number;
    release_date?: string;
    first_air_date?: string;
    overview: string;
    backdrop_path?: string;
    media_type: 'movie' | 'tv' | string; // ניתן להרחיב ל-string כי ה-trending מחזיר גם person
}


const TMDB_BASE_URL: string = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY: string | undefined = process.env.TMDB_API_KEY;
const YOUTUBE_BASE_URL: string = 'https://www.youtube.com/watch?v=';
const TMDB_IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/original';


function mapTmdbDataToHeroItem(tmdbItem: TmdbRawItem): MediaItemWithoutTrailer {
    const title = tmdbItem.title || tmdbItem.name || "Untitled";

    return {
        id: tmdbItem.id,
        title,
        rating: tmdbItem.vote_average,
        voteCount: tmdbItem.vote_count,
        releaseDate: tmdbItem.release_date || tmdbItem.first_air_date || null,
        description: tmdbItem.overview,
        posterUrl: tmdbItem.backdrop_path
            ? `${TMDB_IMAGE_BASE_URL}${tmdbItem.backdrop_path}`
            : null,
        media_type: tmdbItem.media_type as 'movie' | 'tv', // ודא טיפוס נכון
    };
}


async function fetchTrailerForMedia(item: MediaItemWithoutTrailer): Promise<HeroItemData> {
    if (!API_KEY) {
        return { ...item, trailerUrl: "" }; 
    }

    try {
        const url = `${TMDB_BASE_URL}/${item.media_type}/${item.id}/videos?api_key=${API_KEY}`;
        
        const response = await axios.get(url);
        const videos = response.data.results;

        // הגדרת טיפוס לפרמטר v כאן
        const trailer = videos.find((v: { site: string, type: string, official: boolean, key: string }) => v.site === 'YouTube' && v.type === 'Trailer' && v.official === true);
        
        const trailerUrl = trailer ? `${YOUTUBE_BASE_URL}${trailer.key}` : '';

        return {
            ...item, // העתק את כל שאר השדות
            trailerUrl: trailerUrl 
        };

    } catch (error) {
        console.error(`Error fetching trailer for ${item.title}:`, (error as Error).message);
        return { ...item, trailerUrl: "" }; 
    }
}


async function getTrends(): Promise<HeroItemData[]> {
    if (!API_KEY) {
        console.error("FATAL ERROR: TMDB_API_KEY is not defined in environment.");
        throw new Error("API Key is missing.");
    }
    
    try {
        const url = `${TMDB_BASE_URL}/trending/all/week?api_key=${API_KEY}`;
        const response = await axios.get(url);
        
        // יצירת initialItems
        const initialItems: MediaItemWithoutTrailer[] = response.data.results
            .filter((item: TmdbRawItem) => item.backdrop_path && (item.media_type === 'movie' || item.media_type === 'tv'))
            .slice(0, 5)
            // הטיפוס של 'item' מובן עכשיו לפונקציית mapTmdbDataToHeroItem
            .map(mapTmdbDataToHeroItem); 

        // הטיפוס של 'item' נגזר נכון מ-initialItems, והשגיאה נפתרת
        const trailerPromises = initialItems.map(item => fetchTrailerForMedia(item));

        const heroItems = await Promise.all(trailerPromises);

        return heroItems;
        
    } catch (err) {
        console.error("Error in primary TMDb fetch or Promise.all:", (err as Error).message);
        throw new Error("Could not fetch data from external API.");
    }
}

export const contentService = {
    getTrends,
};
