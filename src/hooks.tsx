import { useContext } from "react";
import { AppContext, ReportPageContext, StudentPageContext } from "./contexts";

export const useAttendanceContext = () => {
  const object = useContext(StudentPageContext);
  if (!object)
    throw new Error("useAttendanceContext must be used within a Provider.");
  return object;
};

export const useAppContext = () => {
  const object = useContext(AppContext);
  if (!object)
    throw new Error("useAppContext must be used within a Provider.");
  return object;
}

export const useReportPageContext = () => {
  const object = useContext(ReportPageContext);
  if (!object)
    throw new Error("useReportPageContext must be used within a Provider.");
  return object;
}