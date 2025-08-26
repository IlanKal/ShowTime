import type { AuthResponse, RegisterPayload, User } from "../types/User";

const mockUser = (email: string): User => ({
  _id: "1",
  email,
  fullName: "Mock User",
});

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          accessToken: "mock-access-token-123",
          user: mockUser(email),
        });
      } else {
        reject(new Error("Email and password must not be empty."));
      }
    }, 800);
  });
};

export const loginWithGoogleToken = async (idToken: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (idToken) {
        resolve({
          accessToken: "mock-google-access-token-123",
          user: mockUser("google-user@example.com"),
        });
      } else {
        reject(new Error("Missing Google ID token"));
      }
    }, 800);
  });
};

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.email && payload.password) {
        resolve({
          accessToken: "mock-register-access-token-123",
          user: mockUser(payload.email),
        });
      } else {
        reject(new Error("Email and password are required."));
      }
    }, 800);
  });
};

export const logoutUser = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 200));
};