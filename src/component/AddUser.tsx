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
    // const { data } = await axios.post(``, [user]);
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
      <form action="">
        <div className="form-control">
          <label htmlFor="">First Name</label>
          <input type="text" ref={firstNameRef} className="block" required />
        </div>
        <div className="form-control">
          <label htmlFor="">Last Name</label>
          <input type="text" ref={lastNameRef} className="block" required />
        </div>
        <div className="form-control">
          <label htmlFor="">USER</label>
          <input type="checkbox" ref={roleUserRef} value={`USER`}></input>
          <label htmlFor="">GROUP LEAD</label>
          <input
            type="checkbox"
            ref={roleGroupLeaderRef}
            value={`GROUP_LEADER`}
          ></input>
          <label htmlFor="">MD</label>
          <input type="checkbox" ref={roleMDRef} value={`MD`}></input>
          <label htmlFor="">SUPERVISOR</label>
          <input
            type="checkbox"
            ref={roleSupervisorRef}
            value={`SUPERVISOR`}
          ></input>
        </div>
        <div className="form-control">
          <label htmlFor="">Group</label>
          <select ref={groupNameRef} id="">
            {groupList.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <input
            type="submit"
            className="block"
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
