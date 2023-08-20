import jwtDecode from "jwt-decode";
import { Outlet } from "react-router-dom";
import { SideBar } from "../sidebar";

export interface DecodedJwt {
  exp?: string;
  roles?: string[];
  sub?: string;
}
export const Dashboard = () => {
  let accessToken: DecodedJwt = {};
  const token = localStorage.getItem("clasnappAccessToken");
  if (!token) return;
  accessToken = jwtDecode(token);

  return (
    <>
      <header></header>
      <main className="grid sm:grid-cols-12 gap-8 sm:gap-16 min-h-full">
        <section className="sm:col-span-2">
          <SideBar roles={accessToken.roles} />
        </section>
        <section className="sm:col-span-10 md:mt-24 grid justify-center md:block">
          <Outlet />
        </section>
      </main>
    </>
  );
};
