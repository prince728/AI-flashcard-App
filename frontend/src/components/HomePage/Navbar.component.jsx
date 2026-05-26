import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutApi } from "../../services/ApiService/user.apiService";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isLoggedIn,setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {  
      logoutApi();
      setIsLoggedIn(false);
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-blue-600">Flashcard Generator</h1>

      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/flashcards" className="hover:text-blue-600">My Flashcards</Link>
        <Link to="/about" className="hover:text-blue-600">About</Link>


        {isLoggedIn ? (
          <>
            <Link to="/profile" className="hover:text-blue-600">Profile</Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
