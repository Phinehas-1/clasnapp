import { FaDoorOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../hooks";

export const LogOut = () => {
    const { setIsLoggedIn } = useAppContext();
    const navigate = useNavigate();
    function doLogout() {
        localStorage.removeItem("clasnappAccessToken");
        if (!localStorage.getItem("clasnappAccessToken")) {
            setIsLoggedIn(false);
            navigate("/");
        }
    }

    return (
        <div><button onClick={() => doLogout()}><FaDoorOpen className=" text-xl" /></button></div>
    )
}
