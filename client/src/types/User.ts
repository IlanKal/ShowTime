import type { Gender } from "../utils/genders";

export interface User {
  _id: string;
  email: string;
  fullName?: string;
  gender?: Gender;
  dateOfBirth?: string; // ISO string
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName?: string;
  gender?: Gender;
  dateOfBirth?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}