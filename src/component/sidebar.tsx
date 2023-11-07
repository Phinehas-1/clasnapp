import { useState } from "react";
import { FaBars, FaTimes, FaUserShield } from "react-icons/fa";
import { MdDescription, MdOutlineGroups2 } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { DecodedJwt } from "../pages/dashboard";

export const SideBar = ({ roles }: DecodedJwt) => {
  const navItems = [
    {
      navName: `Manage Users`,
      path: `admin`,
      flag: roles?.includes("MD"),
      icon: <FaUserShield className="h-6 w-6" />,
    },
    {
      navName: `Attendance`,
      path: `student`,
      flag: roles?.includes("USER"),
      icon: <MdOutlineGroups2 className="h-8 w-8 mx-8 text-blue-500" />,
    },
    {
      navName: `Report`,
      path: `reports`,
      flag: roles?.includes("USER"),
      icon: <MdDescription className="h-8 w-8 mx-8 text-blue-500" />,
    },
  ];

  const [navToggleState, setNavToggleState] = useState(true);

  return (
    <nav className="flex flex-col h-screen gap-8 p-2 py-10 bg-slate-100 border-solid border-r-2 rounded-r-xl border-slate-300 shadow-xl shadow-black text-xs">
      <div className="sm:hidden self-end">
        <span
          onClick={() => {
            setNavToggleState(!navToggleState);
          }} className="bg-white inline-block p-2 rounded-md"
        >
          {navToggleState ? <FaBars /> : <FaTimes />}
        </span>
      </div>
      {navItems.map(
        (navItem, index) =>
          navItem.flag && (
            <div
              key={index}
              className={`${
                navToggleState ? `hidden` : `block`
              } sm:block mx-auto`}
            >
              <NavLink
                to={navItem.path}
                className="flex flex-col items-center text-gray-700 bg-white py-3 gap-2 rounded-xl"
              >
                <span className=" font-normal">{navItem.navName}</span>
                {navItem.icon && navItem.icon}                
              </NavLink>
            </div>
          )
      )}
    </nav>
  );
};
