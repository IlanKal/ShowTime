import { HeroItemData } from "../types/Hero";

const BASE_URL: string = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"; 

export const fetchHeroData = async (): Promise<HeroItemData[]> => {
    try {
        const response = await fetch(`${BASE_URL}/api/content/trends`); 

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: HeroItemData[] = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching hero data:", error);
        return []; 
    }
};