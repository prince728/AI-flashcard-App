import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutApi } from "../../services/ApiService/user.apiService";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    logoutApi();
    setIsLoggedIn(false);
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-gray-700 shadow-lg">
      <h1 className="text-2xl font-extrabold text-teal-400 drop-shadow-lg">
        Flashcard Generator
      </h1>

      <div className="space-x-6 flex items-center">
        <Link to="/" className="text-gray-300 hover:text-teal-400 transition">
          Home
        </Link>
        <Link to="/flashcards" className="text-gray-300 hover:text-teal-400 transition">
          My Flashcards
        </Link>
        <Link to="/about" className="text-gray-300 hover:text-teal-400 transition">
          About
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/profile" className="text-gray-300 hover:text-teal-400 transition">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition shadow-md"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 border border-teal-500 text-teal-400 rounded-lg hover:bg-teal-600 hover:text-white transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
