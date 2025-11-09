// src/context/TokenAndUrlContext.tsx
import { createContext, type ReactNode } from "react";

interface TokenType {
  Token: string;
  ApiBase: string;
}

export const TokenAndUrlContext = createContext<TokenType | undefined>(undefined);

export default function TokenAndUrlContextProvider({ children }: { children: ReactNode }) {
  const Token = import.meta.env.VITE_API_TOKEN;
  const ApiBase = import.meta.env.VITE_BASE_API;

  return (
    <TokenAndUrlContext.Provider value={{ Token, ApiBase }}>
      {children}
    </TokenAndUrlContext.Provider>
  );
}