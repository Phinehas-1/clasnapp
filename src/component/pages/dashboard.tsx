import jwtDecode from "jwt-decode";
import { useOutlet } from "react-router-dom";
import { SideBar } from "../sidebar";
import { WelcomePage } from "./welcome";

export interface DecodedJwt {
  exp?: string;
  roles?: string[];
  sub?: string;
}
export const Dashboard = () => {
  const outlet = useOutlet();
  let accessToken: DecodedJwt = {};
  const token = localStorage.getItem("clasnappAccessToken");
  if (!token) return;
  accessToken = jwtDecode(token);

  return (
    <>
      <header></header>
      <main className="min-h-screen sm:grid sm:grid-cols-12 sm:gap-16 ">
        <section className="absolute top-0 z-20 sm:static sm:block sm:col-span-3">
          <SideBar roles={accessToken.roles} />
        </section>
        <section className=" grid justify-center sm:block sm:col-span-9 pt-10">
          {outlet || <WelcomePage sub={ accessToken.sub} />}
        </section>
      </main>
    </>
  );
};
