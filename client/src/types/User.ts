// src/types/user.ts

import { MOVIE_GENRES } from '../utils/movieGenres';
import { USER_GENDERS } from '../utils/genders';

export type MovieGenre = typeof MOVIE_GENRES[number];
export type Gender = typeof USER_GENDERS[number];

export interface User {
    _id?: string; 
    email: string;
    password: string; 
    fullName?: string;
    gender: Gender;
    dateOfBirth: Date;
    favoriteGenres?: MovieGenre[];
}