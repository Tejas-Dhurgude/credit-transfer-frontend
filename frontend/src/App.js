import React from "react";
import {
  InstituteRegister,
  StudentRegister,
  InstituteLogin,
  StudentList,
  Universitylist,
  StudentLogin,
} from "./Pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreditDashboard from "./Pages/CreditDashboard";
import Nad from "./Pages/Nad";
import University from "./Pages/University";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <InstituteRegister />,
    },
    {
      path: "/student",
      element: <StudentRegister />,
    },
    {
      path: "/institutelogin",
      element: <InstituteLogin />,
    },
    {
      path: "/studentlogin",
      element: <StudentLogin />,
    },
    {
      path: "/universitylist",
      element: <Universitylist />,
    },
    {
      path: "/studentlist",
      element: <StudentList />,
    },
    {
      path: "/creditdashboard",
      element: <CreditDashboard />,
    },
    {
      path: "/nad",
      element: <Nad />
    },
    {
      path:"/university",
      element:<University/>
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
