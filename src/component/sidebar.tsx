import { NavLink } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { DecodedJwt } from "./pages/dashboard";


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
  return (
    <nav className="flex flex-col gap-8 p-2 py-10 bg-slate-100 border-solid border-r-2 border-slate-300 h-full text-xs">
      {navItems.map(
        (navItem, index) =>
          navItem.flag && (
            <div key={index} className="mx-auto">
              <NavLink
                to={navItem.path}
                className="flex items-center text-gray-700 bg-slate-50 px-8 py-2 rounded-3xl"
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
