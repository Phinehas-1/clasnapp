import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { fetchAllUserAttendancesByCalendar, postAttendance } from "../../../../api";
import { useAttendanceContext } from "../../../../hooks";
import { AttendanceData, StudentData } from "../../../../types";

export const AttendanceTableRow = (studentData: StudentData) => {
  const { changeAttendanceMarkFlag, attendanceCalendar } = useAttendanceContext();

  const [isMarked, setIsMarked] = useState(false);

  const doMarkAttendance = async (studentId: string) => {
    await postAttendance(attendanceCalendar.id, studentId);
    setIsMarked(true);
    changeAttendanceMarkFlag();
  };

  const useUpdateMarkStatusEffect = () => {
    useEffect(() => {
      const getAttendances = async () => {
        if (!attendanceCalendar) {
          console.log(`Calendar is null.`)
          return;
        } 
        console.log(`Attendance Calendar week is ${attendanceCalendar.week}`)
        const attendanceDataList: AttendanceData[] =
          await fetchAllUserAttendancesByCalendar(attendanceCalendar.id);
        attendanceDataList.forEach((attendanceData) => {
          if (
            attendanceData.student.id === studentData.id &&
            attendanceCalendar.week === attendanceData.calendar.week
          ) {
            setIsMarked(true);
            return;
          }
        });
      };
      getAttendances();
      return () => setIsMarked(false);
    }, [attendanceCalendar, studentData]);
  };

  useUpdateMarkStatusEffect();

  return (
    <div className="mt-2">
      <form action="" className="flex items-center gap-4">
        <div className="inline-block w-32">{studentData.name}</div>
        <div className="inline-block">
          <button
            disabled={isMarked}
            onClick={(e) => {
              e.preventDefault();
              doMarkAttendance(studentData.id);
            }}
            className={
              isMarked
                ? " bg-gray-300 p-1 rounded-sm w-24"
                : " bg-blue-900 p-1 rounded-sm w-24 text-white font-semibold"
            }
          >
            {isMarked ? (
              <span className="flex items-center gap-1 justify-center">
                Marked <FaCheck className=" text-xs text-green" />
              </span>
            ) : (
              <>Mark</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
