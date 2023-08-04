import {  } from "react";

export const AddUser = () => {
  const roleList = ["User", "Group_Leader", "Supervisor"];
  const groupList = [
    "YEAR_1",
    "YEAR_2",
    "YEAR_3",
    "YEAR_3",
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
          <input type="text" className="block" required />
        </div>
        <div className="form-control">
          <label htmlFor="">Last Name</label>
          <input type="text" className="block" required />
        </div>
        <div className="form-control">
          {roleList.map((role) => {
            return (
              <>
                <label htmlFor="">{role}</label>
                <input type="checkbox" value={role}></input>
              </>
            );
          })}
        </div>
        <div className="form-control">
          <label htmlFor="">Group</label>
          <select name="" id="">
            {groupList.map((group) => (
              <option value={group}>{group}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <input type="submit" className="block" />
        </div>
      </form>
    </div>
  );
};
