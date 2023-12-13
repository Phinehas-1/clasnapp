import { SetStateAction } from "react";

export type AppContextData = {
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>
} | null;


export type StudentPageContextData = {
  attendanceMarkFlag: boolean;
  changeAttendanceMarkFlag: Function;
  attendanceTableRefreshFlag: boolean;
  toggleAttendanceTableRefreshFlag: Function;
  studentTableData: StudentTableData;
  attendanceTableData: AttendanceTableData
  attendanceCalendar: { id: string, week: string }
  changeAttendanceWeek: Function
} | null;

export type StudentData = {
  id: string;
  name: string;
};

export type AttendanceData = {
  student: { name: string; id: string };
  laptop: boolean;
  score: number;
  calendar: {
    id: string,
    week: string
  };
  id: string;
};

export type StudentTableData = {
  headerList: string[];
  studentDataList: StudentData[];
};

export type AttendanceTableData = {
  headerList: string[];
  attendanceDataList: AttendanceData[];
};


export type ReportPageContextData = {
  attendancesData: { id: string, student: { name: string }, score: number, laptop: boolean }[],
  addScoresToReport: boolean,
  setAddScoresToReport: React.Dispatch<SetStateAction<boolean>>
} | null