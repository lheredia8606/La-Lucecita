import { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";
type TContextProps = {
  activeBtn: string;
  setActiveBtn: (activeBtn: string) => void;
};

const activeBtnContext = createContext({} as TContextProps);

export const ActiveBtnProvider = ({ children }: { children: ReactNode }) => {
  const [activeBtn, setActiveBtn] = useState("");
  return (
    <activeBtnContext.Provider value={{ activeBtn, setActiveBtn }}>
      {children}
    </activeBtnContext.Provider>
  );
};

export const useActiveBtn = () => {
  const context = useContext(activeBtnContext);
  if (!context) {
    throw new Error("useActiveBtn must be used within a ActiveBtnProvider");
  }
  return context;
};
