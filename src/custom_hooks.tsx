import { createContext, useContext } from "react";
import { IFlag } from "./interfaces";

export const FlagContext = createContext<IFlag | null>(null);

export const useFlagContext = () => {
  const object = useContext(FlagContext);
  if (!object) {
    throw new Error(`useFlagContext must be used within a Provider`);
  }
  return object;
};
