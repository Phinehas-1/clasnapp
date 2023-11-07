import { createContext, useContext } from "react";
import { IFlag, IMark } from "./interfaces";

export const FlagContext = createContext<IFlag | null>(null);
export const MarkContext = createContext<IMark | null>(null);

export const useFlagContext = () => {
  const object = useContext(FlagContext);
  if (!object) {
    throw new Error(`useFlagContext must be used within a Provider`);
  }
  return object;
};

export const useMarkContext = () => {
  const object = useContext(MarkContext);
  if (!object) {
    throw new Error(`useMarkContext must be used within a Provider`);
  }
  return object;
};