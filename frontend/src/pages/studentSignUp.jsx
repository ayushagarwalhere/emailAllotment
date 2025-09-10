//SignUp page for Students Only
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    collegeEmail: '',
    rollNumber: '',
    branch: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Store student data this would go to backend
    localStorage.setItem('studentData', JSON.stringify(formData))
    
    // Show OTP verification message and also add a input box so that user can enter otp 
    alert('OTP sent to your email! Please check your inbox.')
    
    navigate('/student-dashboard')
  }

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

   
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email ID"
              name="collegeEmail"
              value={formData.collegeEmail}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Roll Number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 hover:border-black hover:bg-gray-100 transition-colors"
              required
            >
              <option value="" disabled>Select Branch</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics and Communication</option>
              <option value="EE">Electrical</option>
              <option value="ME">Mechanical</option>
              <option value="DCS">Dual Computer Science</option>
              <option value="DEC">Dual Electronics & Communication</option>
              <option value="MNC">Mathematics & Scientific Computing</option>
              <option value="CE">Civil</option>
              <option value="CHE">Chemical</option>
              <option value="MS">Material Science</option>
              <option value="EP">Engineering Physics</option>
              <option value="AR">Architecture</option>
            </select>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
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