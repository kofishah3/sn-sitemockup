import React, { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextType {
  isOutOfScopeOpen: boolean;
  openOutOfScope: () => void;
  closeOutOfScope: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOutOfScopeOpen, setIsOutOfScopeOpen] = useState(false);

  const openOutOfScope = () => setIsOutOfScopeOpen(true);
  const closeOutOfScope = () => setIsOutOfScopeOpen(false);

  return (
    <ModalContext.Provider value={{ isOutOfScopeOpen, openOutOfScope, closeOutOfScope }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
