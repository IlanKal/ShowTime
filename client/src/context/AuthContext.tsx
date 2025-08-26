import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User, AuthResponse, LoginPayload, RegisterPayload } from "../types/User";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, loginWithGoogleToken, registerUser, logoutUser } from "../services/authService";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  isBootstrapping: boolean;
};

type AuthContextValue = AuthState & {
  loginWithPassword: (payload: LoginPayload) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "auth_state_v1";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  isBootstrapping: true,
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const navigate = useNavigate();
  const location = useLocation();

  // טעינה ראשונית מ-localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Pick<AuthState, "user" | "accessToken">;
        setState({
          isAuthenticated: !!parsed.user && !!parsed.accessToken,
          user: parsed.user ?? null,
          accessToken: parsed.accessToken ?? null,
          isBootstrapping: false,
        });
        return;
      } catch {}
    }
    setState(s => ({ ...s, isBootstrapping: false }));
  }, []);

  useEffect(() => {
    if (state.isBootstrapping) return;
    const toPersist = { user: state.user, accessToken: state.accessToken };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
  }, [state.user, state.accessToken, state.isBootstrapping]);

  const finishLogin = (res: AuthResponse) => {
    setState({
      isAuthenticated: true,
      user: res.user,
      accessToken: res.accessToken,
      isBootstrapping: false,
    });
    const redirectTo = (location.state as any)?.from?.pathname || "/";
    navigate(redirectTo, { replace: true });
  };

  const loginWithPassword = async ({ email, password }: LoginPayload) => {
    const res = await loginUser(email, password);
    finishLogin(res);
  };

  const loginWithGoogle = async (idToken: string) => {
    const res = await loginWithGoogleToken(idToken);
    finishLogin(res);
  };

  const register = async (payload: RegisterPayload) => {
    const res = await registerUser(payload);
    finishLogin(res);
  };

  const logout = async () => {
    try {
      await logoutUser(); 
    } finally {
      localStorage.removeItem(STORAGE_KEY);
  
      setState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        isBootstrapping: false,
      });
  
      navigate("/", { replace: true });
    }
  };
  

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, loginWithPassword, loginWithGoogle, register, logout }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
