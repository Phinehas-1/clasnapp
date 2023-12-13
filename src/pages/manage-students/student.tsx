import { useEffect, useState } from "react";
import { fetchAllStudents, fetchAllUserAttendancesByCalendar } from "../../api";
import { StudentPageContext } from "../../contexts";
import {
  AttendanceData,
  AttendanceTableData,
  StudentData,
  StudentPageContextData,
  StudentTableData,
} from "../../types";
import { AddStudentForm } from "./sections/add-student";
import { CreateAttendance } from "./sections/create-attendance";
import { UpdateAttandance } from "./sections/update-attendance";

export const StudentPage = () => {
  // const { isLoggedIn } = useAppContext();
  const initStudentTableData: StudentTableData = {
    headerList: [],
    studentDataList: [],
  };

  const initAttendanceTableData: AttendanceTableData = {
    headerList: [],
    attendanceDataList: [],
  };

  const [studentTableData, setStudentTableData] =
    useState(initStudentTableData);

  const [attendanceTableData, setAttendanceTableData] = useState(
    initAttendanceTableData
  );

  const [attendanceCalendar, setAttendanceCalendar] = useState({ id: "", week: "" });

  const [attendanceTableRefreshFlag, setAttendanceTableRefreshFlag] =
    useState(false);

  const [attendanceMarkFlag, setAttendanceMarkFlag] = useState(false);

  const toggleAttendanceTableRefreshFlag = () => {
    setAttendanceTableRefreshFlag(!attendanceTableRefreshFlag);
  };

  const changeAttendanceMarkFlag = () => {
    setAttendanceMarkFlag(!attendanceMarkFlag);
  };

  const changeAttendanceWeek = (calendar: { id: string, week: string }) => {
    setAttendanceCalendar(calendar);
  };
  const studentPageContextData: StudentPageContextData = {
    attendanceMarkFlag,
    changeAttendanceMarkFlag,
    attendanceTableRefreshFlag,
    toggleAttendanceTableRefreshFlag,
    studentTableData,
    attendanceTableData,
    attendanceCalendar,
    changeAttendanceWeek,
  };

  const useUpdateStudentTableEffect = () => {
    useEffect(() => {
      const getStudents = async () => {
        const studentDataList: StudentData[] = await fetchAllStudents();
        const headerList = ["Student Name", "Present"];
        setStudentTableData({ headerList, studentDataList });
      };
      getStudents();
    }, [attendanceTableRefreshFlag]);
  };

  const useUpdateAttendanceTableEffect = () => {
    useEffect(() => {
      const getAttendances = async () => {
        if (!attendanceCalendar) return;
        const attendanceDataList: AttendanceData[] =
          await fetchAllUserAttendancesByCalendar(attendanceCalendar.id);
        const headerList = ["Student Name", "Laptop", "Score"];
        setAttendanceTableData({ headerList, attendanceDataList });
      };
      getAttendances();
    }, [attendanceMarkFlag, attendanceCalendar]);
  };

  useUpdateStudentTableEffect();
  useUpdateAttendanceTableEffect();

  return (
    <section>
      <StudentPageContext.Provider value={studentPageContextData}>
        <section className="flex justify-center md:block text-xs">
          <AddStudentForm />
        </section>
        <section className=" text-xs">
          <CreateAttendance />
        </section>
        <section className=" text-xs">
          <UpdateAttandance />
        </section>
      </StudentPageContext.Provider>
    </section>
  );
};
