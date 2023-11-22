import React from "react";
import LogUp from "../pages/LogUp";
import LogIn from "../pages/LogIn";
import Home from "../pages/Home";
import SentEmails from "../pages/SentEmails";
import Notifications from "../pages/Notifications";
import { Navigate, createBrowserRouter } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    if (token) {
        return children
    } else {
        return <Navigate to='/' replace/>
    }
  }

const Routering = createBrowserRouter([

    {
        path: "/",
        element: <LogIn/>,
    },
    
    {
        path: "/logup",
        element: <LogUp/>,
    },
    
    {
        path: "/home",
        element: <Home/>,
        // <PrivateRoute>
        //     <Home />
        // </PrivateRoute>
    },

    {
        path: "/sent-emails",
        element: <SentEmails/>,
    },

    {
        path: "/notifications",
        element: <Notifications/>,
    },
    
]);

export default Routering;