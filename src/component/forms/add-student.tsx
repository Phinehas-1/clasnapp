import axios from "axios";
import { useRef } from "react";
import { useFlagContext } from "../../custom_hooks";

export const AddStudentForm = () => {
  const { flag, setFlag } = useFlagContext();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const postStudent = async () => {
    try {
      const studentName = validateAndGetName();
      const student = [
        {
          name: studentName,
        },
      ];
      const token = localStorage.getItem("clasnappAccessToken");
      if (!token) return;
      const { status } = await axios.post(
        `http://localhost:8080/report/students`,
        student,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!status || status != 201) {
        throw new Error(`Creation of student failed.`);
      }
      setFlag({ flag: !flag });
    } catch (error: any) {
      console.log(
        `Creation of student failed because : ${
          error?.response?.data ?? error?.message ?? error
        }`
      );
    }
  };

  const validateAndGetName = (): string => {
    if (!firstNameRef.current?.value || !lastNameRef.current?.value)
      throw new Error("The first name or last name is not provided.");
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    if (firstName.trim().length < 1 || lastName.trim().length < 1)
      throw new Error("The first name or last name is empty.");
    const fullName = firstName.concat(" ").concat(lastName);
    return fullName;
  };
  return (
    <div className=" max-w-fit p-5 bg-slate-200 rounded-lg shadow-md">
      <form action="" className="grid gap-10 items-end sm:flex">
        <div className="grid gap-2">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            ref={firstNameRef}
            placeholder="First Name"
            className="px-3 py-1"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            ref={lastNameRef}
            placeholder="Last Name"
            className="px-3 py-1"
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              postStudent();
            }}
            className=" px-3 py-1 rounded-md bg-blue-950 text-white"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};
