import { useRef } from "react";
import axios from "axios";

export const AddUser = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const roleUserRef = useRef<HTMLInputElement>(null);
  const roleGroupLeaderRef = useRef<HTMLInputElement>(null);
  const roleSupervisorRef = useRef<HTMLInputElement>(null);
  const roleMDRef = useRef<HTMLInputElement>(null);
  const rolesRef = [roleUserRef, roleGroupLeaderRef, roleMDRef, roleSupervisorRef];
  const groupNameRef = useRef<HTMLSelectElement>(null);

  const postUsers = async () => {
    const rolesRefValues = rolesRef
      .filter((roleRef) => roleRef.current?.checked)
      .map((roleRef) => roleRef.current?.value);
    const user = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      password: [
        firstNameRef.current?.value.charAt(0),
        lastNameRef.current?.value.charAt(0),
        "pword",
      ].join(""),
      roleNames: rolesRefValues,
      groupName: groupNameRef.current?.value,
    };

    console.log(user);
    const { data } = await axios.post(`http://localhost:8080/admin/users`, [
      user,
    ]);
    console.log(data);
  };

  const groupList = [
    "YEAR_1",
    "YEAR_2",
    "YEAR_3",
    "YEAR_4",
    "YEAR_5",
    "YEAR_6",
    "YEAR_7",
    "YEAR_8",
    "YEAR_9",
    "YEAR_10",
    "YEAR_11",
    "YEAR_12",
  ];

  return (
    <div>
      <form action="" className="p-8 space-y-7">
        <div className="">
          <label htmlFor="" className="block mb-1">
            First Name
          </label>
          <input
            type="text"
            ref={firstNameRef}
            className="block border-2 py-1 px-2 w-full"
            required
          />
        </div>
        <div className="">
          <label htmlFor="" className="block mb-1">
            Last Name
          </label>
          <input
            type="text"
            ref={lastNameRef}
            className="block border-2 py-1 px-2 w-full"
            required
          />
        </div>
        <div className="">
          <label htmlFor="" className="mr-1">
            User
          </label>
          <input
            type="checkbox"
            ref={roleUserRef}
            value={`USER`}
            className="mr-4"
            defaultChecked
          ></input>
          <label htmlFor="" className="mr-1">
            Group Lead
          </label>
          <input
            type="checkbox"
            ref={roleGroupLeaderRef}
            value={`GROUP_LEADER`}
            className="mr-4"
          ></input>
          <label htmlFor="" className="mr-1">
            MD
          </label>
          <input
            type="checkbox"
            ref={roleMDRef}
            value={`MD`}
            className="mr-4"
          ></input>
          <label htmlFor="" className="mr-1">
            Supervisor
          </label>
          <input
            type="checkbox"
            ref={roleSupervisorRef}
            value={`SUPERVISOR`}
            className="mr-4"
          ></input>
        </div>
        <div className="">
          {/* <label htmlFor="" className="block mb-2">
            Group
          </label> */}
          <select ref={groupNameRef} id="" className="border-2 py-2 px-2 w-full">
            {groupList.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <input
            type="submit"
            value={`Register user`}
            className="block cursor-pointer border-2 py-2 px-4 bg-slate-600 text-white w-full"
            onClick={(e) => {
              e.preventDefault();
              postUsers();
            }}
          />
        </div>
      </form>
    </div>
  );
};
