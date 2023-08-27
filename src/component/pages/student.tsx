import { useEffect, useState } from "react";
import { AddStudentForm } from "../forms/add-student";
import { FlagContext } from "../../custom_hooks";
import { IFlag } from "../../interfaces";
import axios from "axios";

export const StudentPage = () => {
  const [flag, setFlag] = useState<IFlag>({
    flag: false,
    setFlag: () => flag,
  });

  const fetchAllStudents = async () => {
    const token = localStorage.getItem("clasnappAccessToken");
    if (!token) return;
    try {
      const { data, status } = await axios.get(
        `http://localhost:8080/report/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!status || status != 200)
        throw new Error(`Failed to fetch students data.`);
      return data;
    } catch (error: any) {
      console.log(error?.message ?? error);
    }
  };

  useEffect(() => {
    const getStudents = async () => {
      const studentList = await fetchAllStudents();
      studentList.forEach((student: { name: string }) => {
        console.log(student.name);
      });
    };
    getStudents();
  }, [flag]);
  return (
    <section>
      <section>
        <FlagContext.Provider value={{ flag: !flag, setFlag }}>
          <AddStudentForm />
        </FlagContext.Provider>
      </section>
      <section></section>
    </section>
  );
};
