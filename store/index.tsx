"use client";

import { createContext, useContext } from "react";
import RootStore from "./rootStore";

export const StoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === null) {
    throw new Error("The storage is not initialized!");
  }

  return context;
};

export const GlobalStoreContext = ({ children }: any) => {
  return (
    <StoreContext.Provider value={new RootStore()}>
      {children}
    </StoreContext.Provider>
  );
};
