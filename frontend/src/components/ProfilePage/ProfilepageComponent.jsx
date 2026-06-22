import React, { useEffect, useState } from "react";
import { getmeApi, userUpdateApi, userDeleteApi } from "../../services/ApiService/user.apiService";

const AdminPage = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch admin data on mount
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
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating admin profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    try {
      await userDeleteApi(admin._id); 
      alert("Account deleted successfully!");

      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Admin Page
        </h1>

        {!isEditing ? (
          <div className="space-y-4">
            <p><span className="font-medium text-gray-600">Full Name:</span> {admin.fullName}</p>
            <p><span className="font-medium text-gray-600">Email:</span> {admin.email}</p>
            <p><span className="font-medium text-gray-600">Password:</span> ********</p>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={admin.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
