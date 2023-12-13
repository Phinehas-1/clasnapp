import axios from "axios";

export const fetchAllUserAttendancesByCalendar = async (calendarId: String) => {
  const token = localStorage.getItem("clasnappAccessToken");
  if (!token || !calendarId) return;
  console.log(`Calender id is ${calendarId}`)
  if (!calendarId) {
    return;
  }
  try {
    const { data, status } = await axios.get(
      `http://localhost:8080/report/attendances/${calendarId}`,
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

export const postAttendance = async (calendarId: string, studentId: string) => {
  const token = localStorage.getItem("clasnappAccessToken");
  if (!token) return;

  const attendance = {
    calendarId,
    studentId
  };

  try {
    const { status } = await axios.post(
      `http://localhost:8080/report/attendance`,
      attendance,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!status || status != 201) {
      throw new Error(`Creation of attendance failed.`);
    }
  } catch (error: any) {
    console.log(
      `Create attendance failed: ${error?.response?.data ?? error?.message ?? error
      }`
    );
  }
};

export const fetchAllStudents = async () => {
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

export const postUsers = async (
  rolesRef: React.RefObject<HTMLInputElement>[],
  firstNameRef: React.RefObject<HTMLInputElement>,
  lastNameRef: React.RefObject<HTMLInputElement>,
  groupNameRef: React.RefObject<HTMLSelectElement>,
  setFlag: Function,
  flag: boolean
) => {
  const rolesRefValues = rolesRef
    .filter((roleRef) => roleRef.current?.checked)
    .map((roleRef) => roleRef.current?.value);

  const user = [
    {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      password: [
        firstNameRef.current?.value.charAt(0),
        lastNameRef.current?.value.charAt(0),
        "pword",
      ].join(""),
      roleNames: rolesRefValues,
      groupName: groupNameRef.current?.value,
    },
  ];

  try {
    const { status } = await axios.post(
      `http://localhost:8080/admin/users`,
      user
    );
    if (!status || status != 201) {
      throw new Error(`Post user not completed.`);
    }
    setFlag({ flag: !flag });
  } catch (error: any) {
    console.log(
      `Create user failed because : ${error?.response?.data ?? error?.message ?? error
      }`
    );
  }
};


export const fetchAllCalendars = async () => {
  const token = localStorage.getItem("clasnappAccessToken");
  if (!token) return;
  try {
    const { data, status } = await axios.get(
      `http://localhost:8080/report/calendars/sorted`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!status || status != 200)
      throw new Error(`Failed to fetch calendars data.`);
    return data;
  } catch (error: any) {
    console.log(error?.message ?? error);
  }
};

export const postCalendar = async (week: string) => {
  const token = localStorage.getItem("clasnappAccessToken");
  if (!token) return;

  const calendar = {
    week: week
  };

  try {
    const { status } = await axios.post(
      `http://localhost:8080/report/calendars`,
      calendar,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!status || status != 201) {
      throw new Error(`Creation of calendar failed.`);
    }
  } catch (error: any) {
    console.log(
      `Create calendar failed: ${error?.response?.data ?? error?.message ?? error
      }`
    );
  }
};