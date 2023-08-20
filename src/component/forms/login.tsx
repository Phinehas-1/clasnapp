import axios from "axios";
import { useRef, useState } from "react";
import { FaExclamationCircle, FaKey, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const doSignin: string | any = async () => {
    if (!usernameRef?.current?.value || !passwordRef?.current?.value) {
      setErrorMessage("Username or password is blank or incorrect.");
      return;
    }
    try {
      setIsLoading(true);
      const credentials = JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(credentials);
      const { status, data } = await axios.post(
        `http://localhost:8080/auth/signin`,
        credentials
      );
      setIsLoading(false);
      console.log(`status is ${data}`);
      if (!status || status != 200) throw new Error(`Signin unsuccessful.`);
      if (data && typeof data?.accessToken === "string") {
        localStorage.setItem("clasnappAccessToken", data.accessToken);
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error?.response?.status) {
        setErrorMessage(
          "Sign in failed. Please make sure your credentials are accurate."
        );
      } else {
        setErrorMessage(error?.response?.data ?? error?.message ?? error);
      }
      setIsLoading(false);
    }
  };
  return (
    <form action="" className="bg-slate-100 rounded-lg shadow-lg">
      <div className="bg-blue-500 p-6 rounded-t-lg text-white text-2xl font-bold">
        <span>Sign in to Clasnapp</span>
      </div>
      <div className="p-5 flex flex-col gap-5 ">
        <div className="flex items-stretch">
          <label
            htmlFor="username"
            className="p-3 bg-blue-500 text-white inline-block rounded-l-lg"
          >
            <span>
              <FaUser />
            </span>
          </label>
          <input
            id="username"
            type="text"
            ref={usernameRef}
            placeholder="Enter username"
            className="px-6 md:px-11 rounded-r-lg  border-solid border-2 border-slate-200"
            required
          />
        </div>
        <div className="flex items-stretch">
          <label
            htmlFor="password"
            className="p-3 bg-blue-500 text-white inline-block rounded-l-lg"
          >
            <span>
              <FaKey />
            </span>
          </label>
          <input
            id="password"
            type="password"
            ref={passwordRef}
            placeholder="Enter password"
            className="px-6 md:px-11 rounded-r-lg border-solid border-2 border-slate-200"
            required
          />
        </div>
        <button
          className={
            isLoading
              ? "py-2 rounded-sm border-solid border-1 border-gray-400 text-gray-500"
              : "py-2 rounded-sm bg-blue-500 text-white"
          }
          onClick={(e) => {
            e.preventDefault();
            doSignin();
          }}
          disabled={isLoading}
        >
          {isLoading ? "Signing in" : "Login"}
        </button>
      </div>
      {errorMessage && (
        <div className="bg-red-100 p-3 rounded-b-lg text-red-600 text-sm font-semibold flex items-start gap-2">
          <span>
            <FaExclamationCircle />
          </span>
          <span className="inline-block max-w-xs">{errorMessage}</span>
        </div>
      )}
    </form>
  );
};
