import React, { useEffect, useState } from "react";
import { getmeApi, userUpdateApi, userDeleteApi } from "../../services/ApiService/user.apiService";
import { getAllFlashCard } from "../../services/ApiService/flashcard.apiService";


const AdminPage = () => {
  const [flashcardLength, setFlashcardLength] = useState(0);

  useEffect(() => {
    const fetchFlashCards = async () => {
      try {
        const response = await getAllFlashCard();
        setFlashcardLength(response.data.flashcards.length);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchFlashCards();
  }, []);


  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    fullName: "",
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getmeApi();
        setAdmin(response.data.user);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await userUpdateApi(admin);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating admin profile:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await userDeleteApi(admin._id);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-700 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-teal-400">Dashboard</h2>
        <nav className="space-y-3">
          <a href="/" className="block text-gray-300 hover:text-teal-400">Home</a>
          <a href="/flashcards" className="block text-gray-300 hover:text-teal-400">My Flashcards</a>
          <a href="/about" className="block text-gray-300 hover:text-teal-400">About</a>
          <a href="/profile" className="block text-gray-300 hover:text-teal-400">Profile</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-8">Welcome, {admin.fullName}!</h1>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-300">Total Flashcards</h3>
            <p className="text-2xl font-bold text-teal-400">{flashcardLength}</p>
          </div>

        </div>

        {/* Profile Section */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
          {!isEditing ? (
            <div className="space-y-4">
              <p><span className="font-medium text-gray-400">Full Name:</span> {admin.fullName}</p>
              <p><span className="font-medium text-gray-400">Email:</span> {admin.email}</p>
              <p><span className="font-medium text-gray-400">Member Since:</span> {new Date(admin.createdAt).toLocaleDateString()}</p>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition shadow-md"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
                >
                  Delete Account
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={admin.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
