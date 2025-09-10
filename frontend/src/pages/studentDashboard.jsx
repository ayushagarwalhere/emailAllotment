import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    branch: '',
    year: '',
    semester: ''
  })

  useEffect(() => {
    const savedData = localStorage.getItem('studentData')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setStudentData({
        name: parsedData.name || '',
        email: parsedData.collegeEmail || '',
        rollNumber: parsedData.rollNumber || '',
        branch: parsedData.branch || '',
      })
    }
  }, [])

  const handleLogout = () => {
    console.log('Logging out...')
    // For now, just redirect to home
    window.location.href = '/'
  }

  const handleOpenForm = () => {
    // open the form 
  }

 
  if (!studentData.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student information...</p>
          <p className="text-sm text-gray-500 mt-2">
            If this takes too long, please <Link to="/signup" className="text-blue-600 hover:underline">sign up</Link> first.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-400">
      <nav className="bg-blue-300 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#640f12]">NIT HAMIRPUR</h1>
              <span className="ml-4 text-md text-gray-500">Student Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg text-gray-600">Welcome, {studentData.name} !!</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>


      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
            <p className="text-blue-100">
              Welcome to your student portal. View your information and submit your email allotment request.
            </p>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
                Your Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Full Name</h3>
                  <p className="mt-1 text-lg text-gray-900">{studentData.name}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</h3>
                  <p className="mt-1 text-lg text-gray-900">{studentData.email}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Roll Number</h3>
                  <p className="mt-1 text-lg text-gray-900">{studentData.rollNumber}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Branch</h3>
                  <p className="mt-1 text-lg text-gray-900">{studentData.branch}</p>
                </div>

              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Email Allotment Request</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Fill out the form to request your email allotment. Make sure all information is accurate before submitting.
                </p>
                <button
                  onClick={handleOpenForm}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Fill Email Allotment Form
                </button>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Form Status</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>No form submitted yet. Click the button above to fill out your email allotment request.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
