<<<<<<< HEAD
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

=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, verifyOtp } from '../services/authService';

const LogIn = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // Step 1: email+password, Step 2: otp
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await login({ email, password });

            if (result.error) {
                alert(result.error);
                return;
            }

            alert('Password verified! OTP sent to your email.');
            setStep(2); // Move to OTP step
        } catch (error) {
            console.error('Login error:', error);
            alert('Something went wrong. Try again.');
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await verifyOtp({ email, otp });

            if (result.error) {
                alert(result.error);
                return;
            }

            alert('OTP verified! Logging you in.');
            navigate('/student-dashboard'); // or redirect to admin dashboard based on email
        } catch (error) {
            console.error('OTP verification error:', error);
            alert('Something went wrong. Try again.');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center bg-gradient-to-b from-blue-200 to-red-200 h-screen w-screen rounded-xl">
                <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-lg">
                    <div className="text-center mb-4">
                        <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            ← Back to Home
                        </Link>
                    </div>
                    <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
                        {step === 1 ? 'Login to your account' : 'Enter OTP'}
                    </h2>
                    <p className="text-center text-sm text-gray-500 mb-6">
                        {step === 1
                            ? 'Enter your email and password to continue.'
                            : 'An OTP was sent to your email. Enter it below to log in.'}
                    </p>

                    {step === 1 ? (
                        <form className="space-y-4" onSubmit={handleLoginSubmit}>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email ID"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-black text-white py-2 font-medium hover:bg-gray-800 transition"
                            >
                                Verify Password
                            </button>
                        </form>
                    ) : (
                        <form className="space-y-4" onSubmit={handleOtpSubmit}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-black text-white py-2 font-medium hover:bg-gray-800 transition"
                            >
                                Verify OTP
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LogIn;
>>>>>>> 9e90e733662bc8197609ce74544facb6ce8437eb
