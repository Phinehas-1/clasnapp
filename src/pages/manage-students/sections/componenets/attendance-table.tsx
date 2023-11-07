import { useAttendanceContext } from "../../../../hooks";
import { AttendanceTableRow } from "./attendance-table-row";

export const AttendanceTable = () => {
  const { studentTableData } = useAttendanceContext();
  return (
    <div className=" text-xs">
      {studentTableData.studentDataList ? (
        studentTableData.studentDataList.map((studentData, index) => (
          <AttendanceTableRow key={index} {...studentData} />
        ))
      ) : (
        <div className=" font-semibold pl-6">Student data not available.</div>
      )}
    </div>
  );
};
