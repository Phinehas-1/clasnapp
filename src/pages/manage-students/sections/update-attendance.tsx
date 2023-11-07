import { useAttendanceContext } from "../../../hooks";
import { AttendanceSheet } from "./componenets/attendance-sheet";

export const UpdateAttandance = () => {
  const { attendanceTableData, attendanceCalendar: attendanceWeek } = useAttendanceContext();
  return (
    <div className=" text-sm mt-8">
      <div>{attendanceWeek && attendanceWeek.week} Attendance Sheet</div>
      <div>
        <div className="flex gap-4 mt-8 font-semibold">
          {attendanceTableData.headerList.map((header, index) =>
            index === 0 ? (
              <div key={index} className="inline-block w-32 bg-slate-100">
                {header}
              </div>
            ) : (
              <div
                key={index}
                className="inline-block bg-slate-100 border-2 border-white"
              >
                {header}
              </div>
            )
          )}
        </div>
        <div className="mt-2">
          {attendanceTableData.attendanceDataList ? (
            attendanceTableData.attendanceDataList.map(
              (attendanceData, index) => (
                <AttendanceSheet key={index} {...attendanceData} />
              )
            )
          ) : (
            <div className=" font-semibold pl-6">
              Attendance data not available.
            </div>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
};
