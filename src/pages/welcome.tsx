import { DecodedJwt } from "./dashboard";

export const WelcomePage = ({ sub }: DecodedJwt) => {
  // const { isLoggedIn } = useAppContext();
  
  return (
    <>
      <div className="grid justify-center w-full text-sm sm:text-sm">
        <div className="flex justify-center">
          <img src="../assets/img/takeoffrocketvector.jpg" alt="" />
        </div>
        <div className=" text-center max-w-xs mt-5">
          <h1>
            <span className=" font-semibold text-base inline-block mb-3">
              Welcome{" "}
              <span className="inline-block px-4 rounded-full bg-blue-50 text-blue-600">
                {sub}
              </span>
            </span>
          </h1>
          <p className=" text-gray-500">
            To get started open and choose from the navigation on the panel to
            the left of this page
          </p>
        </div>
      </div>
    </>
  );
};
