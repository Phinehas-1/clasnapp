import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useOutlet } from "react-router-dom";
import { LogOut } from "../component/logout";
import { SideBar } from "../component/sidebar";
import { AppContext } from "../contexts";
import { WelcomePage } from "./welcome";
import './dashboard.css'

export interface DecodedJwt {
  exp?: string;
  roles?: string[];
  sub?: string;
}
export const Dashboard = () => {
  const outlet = useOutlet();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let accessToken: DecodedJwt = {};

  const token = localStorage.getItem("clasnappAccessToken");

  if (!token) return;
  accessToken = jwtDecode(token);



  return (
    <>
      <header></header>
      <main className="min-h-screen sm:grid sm:grid-cols-12 sm:gap-16 pb-16">
        <section className="fixed top-28 z-20  sm:block sm:col-span-3">
          <SideBar roles={accessToken.roles} />
        </section>
        <section className=" grid justify-center sm:relative sm:left-56 sm:block sm:col-span-9 pt-10">
          <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <section className="flex justify-end items-center gap-3 bg-slate-50 py-2 px-10 rounded-full mb-16"><span className="font-thin text-sm">Logout</span> <LogOut /></section>
            {outlet || <WelcomePage sub={accessToken.sub} />}
          </AppContext.Provider>          
        </section>
      </main>
    </>
  );
};
