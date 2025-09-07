//SignUp page for Students Only
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
        <div className="flex items-center justify-center bg-gradient-to-b from-green-200 to-pink-200 h-screen w-screen rounded-xl">

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center mb-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
          Sign up with college details
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create your account using your college information.
        </p>

   
        <form className="space-y-4" /*onSubmit=(then ask for otp sent on their email and redirect to studentDashboard page)*/>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email ID"
              name="collegeEmail"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Roll Number"
              name="rollNumber"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Branch (e.g., Computer Science, Electronics)"
              name="branch"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white py-2 font-medium hover:bg-gray-800 transition"
          >
            Create Account
          </button>
        </form>

      </div>
    </div>

    </div>
  )
}

export default SignUp