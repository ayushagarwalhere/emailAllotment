import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="max-h-screen bg-gradient-to-br from-green-800 via-white to-green-400 ">
      <nav className="bg-transparent shadow-sm rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold font-serif text-gray-900">NIT HAMIRPUR</h1>
            </div>
             <div className="flex space-x-4">
               <Link to="/signup" className="text-gray-600 hover:text-gray-900 hover:underline px-3 py-2 rounded-md text-xl font-medium">
                 SignUp
               </Link>
               <Link to="/login" className="text-gray-600 hover:text-gray-900 hover:underline px-3 py-2 rounded-md text-xl font-medium">
                 LogIn
               </Link>
             </div>
          </div>
        </div>
      </nav>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Streamline Your
            <span className="text-blue-600"> Email Allotment</span>
          </h1>
          <h2 className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive portal for managing email allotments
          </h2>
      </div>

      <div className="h-2 bg-white"> </div>
      <div className="bg-gradient-to-b from-gray-800 to-gray-200 py-20 rounded-xl ">

          <div className="text-center mb-2 ">
            <h2 className="text-3xl text-gray-200 font-bold mb-2">How It Works</h2>
            <p className="text-lg text-gray-200">Simple steps to get your email allotment</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ">Sign Up</h3>
              <p className="text-gray-600">Create your account with OTP verification</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ">Fill Form</h3>
              <p className="text-gray-600">Complete the required form with your details</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ">Verification</h3>
              <p className="text-gray-600">FI and CC review and verify your submission</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Get Email</h3>
              <p className="text-gray-600">Receive your email allotment upon approval</p>
            </div>
          </div>

      </div>

    </div>
  )
}

export default LandingPage
