import { ChangeEvent, useEffect, useState } from "react";
import { useAttendanceContext } from "../../../hooks";
import { AttendanceTable } from "./componenets/attendance-table";
import { fetchAllCalendars, postCalendar } from "../../../api";

export const CreateAttendance = () => {
  const { studentTableData, changeAttendanceWeek } = useAttendanceContext();
  const [weekOptions, setWeekOptions] = useState([{ id: "", week: "" }]);
  const [weekCount, setWeekCount] = useState(0);

  const createNewWeek = async () => {
    let week = "Week-";
    const calendars: { id: string, week: string }[] = await fetchAllCalendars();
    const numberOfWeeks = calendars.length + 1;
    week = week.concat(`${numberOfWeeks}`);
    await postCalendar(week);
    setWeekCount(numberOfWeeks);
  }

  useEffect(() => {
    const getCalenderWeeks = async () => {
      const calendars: { id: string, week: string }[] = await fetchAllCalendars();
      setWeekOptions(calendars);
    };
    getCalenderWeeks();
  }, [weekCount]);

  useEffect(() => {
    changeAttendanceWeek(weekOptions[0]);
  },[weekOptions])
  
  const handleSelectWeek = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(`calendar id is ${e.target.value}, \n calender week is ${e.target.selectedOptions.item(0)?.textContent}`)
    changeAttendanceWeek({ id: e.target.value, week: e.target.selectedOptions.item(0)?.textContent });
  };
  return (
    <div className="text-sm mt-8">
      <div className="flex gap-4">
        <button className="py-1 px-2 bg-blue-950 text-white hover:bg-blue-700  rounded-md" onClick={() => createNewWeek()}>create new week</button>
        <select onChange={(e) => handleSelectWeek(e)}>
          {weekOptions.map((option, index) => (
            <option key={index} value={option.id}>
              {option.week}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="flex gap-4 mt-8 font-semibold">
          {studentTableData.headerList.map((header, index) =>
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
          <div>
            <AttendanceTable />
          </div>
        </div>
      </div>
    </div>
  );
};
