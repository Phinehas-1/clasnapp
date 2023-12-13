import { createContext } from "react";
import { AppContextData, ReportPageContextData, StudentPageContextData } from "./types";

export const StudentPageContext = createContext<StudentPageContextData>(null);
export const AppContext = createContext<AppContextData>(null);
export const ReportPageContext = createContext<ReportPageContextData>(null);
