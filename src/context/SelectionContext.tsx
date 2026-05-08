import { createContext, useContext, useState, type ReactNode } from "react";

interface SelectionContextType {
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined,
);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState("");

  return (
    <SelectionContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}
