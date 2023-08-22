import axios from "axios";
import { useState, useEffect } from "react";
import { TableData, IFlag } from "../../interfaces";
import { FlagContext } from "../../custom_hooks";
import { AddUser } from "../forms/add_user";
import { DataTable } from "../data_table";

export const Admin = () => {
  const userData: TableData = {
    headings: [],
    items: [],
  };

  const [users, setUsers] = useState(userData);
  const [flag, setFlag] = useState<IFlag>({
    flag: false,
    setFlag: () => flag,
  });

  const fetchUsers = async (token: string) => {
    try {
      const { data } = await axios.get("http://localhost:8080/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      console.log(
        `Fetching users data failed because : ${error.message ?? error}.`
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("clasnappAccessToken");
    if (!token) return;
    const getUsers = async () => {
      try {
        const data = await fetchUsers(token);
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
    <div className="">
      <section>
        <FlagContext.Provider value={{ flag: flag.flag, setFlag }}>
          <AddUser/>
        </FlagContext.Provider>
      </section>
      <section>
        <DataTable headings={users?.headings} items={users?.items} />
      </section>
    </div>
  );
};
