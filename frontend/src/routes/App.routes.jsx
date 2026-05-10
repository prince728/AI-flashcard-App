import React from "react";
import { createBrowserRouter } from "react-router";

import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/profilePage";
import AboutPage from "../pages/AboutPage";
import FlashCardPage from "../pages/FlashCardPage";


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
]);

export default router;

