import React from "react";
import { createBrowserRouter } from "react-router";

import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/profilePage";
import AboutPage from "../pages/AboutPage";
import FlashCardPage from "../pages/FlashCardPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";


const router = createBrowserRouter([

  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/flashcards",
    element: <FlashCardPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  }
]);

export default router;

