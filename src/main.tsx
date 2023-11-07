import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./pages/app.tsx";
import { Dashboard } from "./pages/dashboard.tsx";
import { ErrorPage } from "./pages/error.tsx";
import { Admin } from "./pages/adminstration.tsx";
import { StudentPage } from "./pages/manage-students/student.tsx";
import { Reports } from "./pages/report/report.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "student",
        element: <StudentPage />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
