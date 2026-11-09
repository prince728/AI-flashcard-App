import React from "react";
import { createBrowserRouter } from "react-router";

import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/profilePage";
import AboutPage from "../pages/AboutPage";
import FlashCardPage from "../pages/FlashCardPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/flashcards",
        element: <FlashCardPage />
      },
    ],
  },
]);

export default router;