import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerApi } from "../services/ApiService/user.apiService";

export default function SignupPage() {
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
      await registerApi(data.fullName, data.email, data.password);
      navigate("/");
    } catch (err) {
      console.error(err);

      setServerError(
        err.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-teal-400">
            Create Your Account
          </h2>

          <p className="mt-2 text-gray-400">
            Join us and start generating flashcards.
          </p>
        </div>

        {/* Backend Error */}
        {serverError && (
          <div className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
            <p className="text-sm font-medium text-red-300">
              {serverError}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Full Name */}
          <div>
            <label className="mb-2 block font-medium text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                onChange: () => setServerError(""),
              })}
              className={`w-full rounded-lg border bg-gray-800 px-4 py-3 text-white placeholder-gray-400 outline-none transition ${
                errors.fullName
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              }`}
            />

            {errors.fullName && (
              <p className="mt-2 text-sm text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-gray-300">
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
            <label className="mb-2 block font-medium text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
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
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-teal-400 hover:text-teal-300 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}