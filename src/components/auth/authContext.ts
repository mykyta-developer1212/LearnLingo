import { createContext } from "react";
import type { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  isLoginOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);