import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error: any = useRouteError();
  return (
    <div>
      <span>{error?.statusText || error?.message}</span>
    </div>
  );
};
