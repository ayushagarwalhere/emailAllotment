//Login page for students and CC
import React from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <div>
      <div className="flex items-center justify-center bg-gradient-to-b from-blue-200 to-red-200 h-screen w-screen rounded-xl">
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-center mb-4">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
            Login to your account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Enter your email and password to continue.
          </p>

          <form
            className="space-y-4" /*onSubmit=(then ask for otp sent on their email-id for students and CC too and redirect to their Dashboard based on their role)*/
          >
            <div>
              <input
                type="email"
                placeholder="Email ID"
                name="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-black text-white py-2 font-medium hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

