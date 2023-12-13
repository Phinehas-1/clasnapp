import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAttendanceContext } from "../../../../hooks";
import { AttendanceData } from "../../../../types";

export const AttendanceSheet = (attendanceData: AttendanceData) => {
  // initialize contexts
  const { changeAttendanceMarkFlag } = useAttendanceContext();
  // initialize refs
  const laptopCheckboxRef = useRef<HTMLInputElement>(null);
  const scoreInputRef = useRef<HTMLInputElement | any>();
  const idHiddenInputRef = useRef<HTMLInputElement>(null);
  // initialize states
  const [isUpdated, setIsUpdated] = useState(true);
  // define hooks
  const useUpdateInputsEffect = () => {
    useEffect(() => {
      if (laptopCheckboxRef.current)
        laptopCheckboxRef.current.checked = attendanceData.laptop;
      if (scoreInputRef.current)
        scoreInputRef.current.value = attendanceData.score;
    });
  };
  // define api call to update an individual attendance data
  const postAttendance = async () => {
    const token = localStorage.getItem("clasnappAccessToken");
    if (!token) return;

    const attendance = {
      attendanceId: idHiddenInputRef.current?.value,
      laptop: laptopCheckboxRef.current?.checked,
      score: scoreInputRef.current?.value,
    };

    try {
      const { status } = await axios.put(
        `http://localhost:8080/report/attendance`,
        attendance,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!status || status != 202) {
        throw new Error(`Update attendance failed:`);
      }
    } catch (error: any) {
      console.log(
        `Update attendance failed: ${
          error?.response?.data ?? error?.message ?? error
        }`
      );
    }
    setIsUpdated(true);
    changeAttendanceMarkFlag();
  };

  useUpdateInputsEffect();
  return (
    <div className="mt-2 text-xs">
      <form action="" className="flex items-center gap-4">
        <div className="inline-block w-32">{attendanceData.student.name}</div>
        <div className="inline-block w-12">
          <input
            type="checkbox"
            ref={laptopCheckboxRef}
            onChange={() => setIsUpdated(false)}
          />
        </div>
        <div className="inline-block">
          <input
            type="number"
            placeholder="% score"
            min={0}
            max={100}
            ref={scoreInputRef}
            onChange={() => setIsUpdated(false)}
          />
        </div>
        <div className="inline-block">
          <button
            onClick={(e) => {
              e.preventDefault();
              postAttendance();
            }}
            disabled={isUpdated}
            className={
              isUpdated
                ? " bg-gray-300 p-1 rounded-sm w-24"
                : " bg-blue-900 p-1 rounded-sm w-24 text-white font-semibold"
            }
          >
            {isUpdated ? <>Updated</> : <>Update</>}
          </button>
          <input
            type="hidden"
            ref={idHiddenInputRef}
            value={attendanceData.id}
          />
        </div>
      </form>
    </div>
  );
};
