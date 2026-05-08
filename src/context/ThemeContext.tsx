import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
  showHeroBg: boolean;
  setShowHeroBg: (show: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [showHeroBg, setShowHeroBg] = useState(true);

  return (
    <ThemeContext.Provider value={{ showHeroBg, setShowHeroBg }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
