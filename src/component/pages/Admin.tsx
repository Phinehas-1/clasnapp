import { useEffect, useState } from "react";
import { TableData, IFlag } from "../../interfaces";
import { AddUser } from "../AddUser";
import { DataTable } from "../DataTable";
import axios from "axios";
import { FlagContext } from "../../custom_hooks";

export const AdminUI = () => {
  const userData: TableData = {
    headings: [],
    items: [],
  };

  const [users, setUsers] = useState(userData);
  const [flag, setFlag] = useState<IFlag>({ flag: false, setFlag: () => flag });

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/admin/users");
      return data;
    } catch (error: any) {
      console.log(
        `Fetching users data failed because : ${error.message ?? error}.`
      );
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        if (Object.keys(data ?? {}).length < 1) {
          return;
        }
        const headings = Object.keys(data[0]);
        const items = data;
        setUsers({ headings, items });
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [flag]);

  return (
    <>
      <FlagContext.Provider value={{ flag: flag.flag, setFlag }}>
        <AddUser />
      </FlagContext.Provider>
      <div>
        <DataTable headings={users?.headings} items={users?.items} />
      </div>
    </>
  );
};
