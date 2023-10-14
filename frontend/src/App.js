import React from 'react'
import { InstituteRegister,StudentRegister,InstituteLogin,StudentList,Universitylist,StudentLogin } from './Pages'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <InstituteRegister />,
    },
    {
      path:"/student",
      element:<StudentRegister/>
    },
    {
      path:"/institutelogin",
      element:<InstituteLogin/>
    },
    {
      path:"/studentlogin",
      element:<StudentLogin/>
    },
    {
      path:"/universitylist",
      element:<Universitylist/>
    },
    {
      path:"/studentlist",
      element:<StudentList/>
    }
    
  ]);
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
