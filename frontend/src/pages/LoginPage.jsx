import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginApi } from "../services/ApiService/user.apiService";

export default function LoginPage() {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError("");

    try {
      const response = await loginApi(data.email, data.password);

      setUser(response.data.user);
      setIsLoggedIn(true);

      navigate("/");
    } catch (err) {
      console.error(err);

      setServerError(
        err.response?.data?.message ||
        "Unable to login. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-teal-400">
            Login
          </h2>

          <p className="text-gray-400 mt-2">
            Sign in to continue generating flashcards.
          </p>
        </div>

        {/* Backend Error */}
        {serverError && (
          <div className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-300 font-medium">
              {serverError}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email address",
                },
                onChange: () => setServerError(""),
              })}
              className={`w-full rounded-lg border bg-gray-800 px-4 py-3 text-white placeholder-gray-400 outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              }`}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                onChange: () => setServerError(""),
              })}
              className={`w-full rounded-lg border bg-gray-800 px-4 py-3 text-white placeholder-gray-400 outline-none transition ${
                errors.password
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              }`}
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-lg py-3 font-semibold transition ${
              isSubmitting
                ? "cursor-not-allowed bg-gray-600 text-gray-300"
                : "bg-teal-500 text-white hover:bg-teal-600"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-teal-400 hover:text-teal-300 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}