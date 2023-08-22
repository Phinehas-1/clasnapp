import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield } from "react-icons/fa";
import { DecodedJwt } from "./pages/dashboard";
import { useState } from "react";

export const SideBar = ({ roles }: DecodedJwt) => {
  const navItems = [
    {
      navName: `Manage Users`,
      path: `admin`,
      flag: roles?.includes("MD"),
      icon: <FaUserShield className="h-6 w-6 mr-5" />,
    },
    {
      navName: `Report`,
      path: ``,
      flag: roles?.includes("USER"),
    },
  ];

  const [navToggleState, setNavToggleState] = useState(true);

  return (
    <nav className="flex flex-col h-screen gap-8 p-2 py-10 bg-slate-100 border-solid border-r-2 border-slate-300 shadow-xl shadow-black text-xs">
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
                className="flex items-center text-gray-700 bg-white px-8 py-2 rounded-3xl"
              >
                {navItem.icon && navItem.icon}
                {navItem.navName}
              </NavLink>
            </div>
          )
      )}
    </nav>
  );
};
