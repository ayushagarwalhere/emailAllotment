import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="max-h-screen bg-[#640f12]  overflow-hidden">
      <nav className="bg-[#02263c] shadow-sm rounded-xl">
        <div className="max-w-7xl mx-auto ">
         <div className="flex justify-between items-center h-24 px-4 sm:px-6 lg:px-8">
          <div className="flex gap-5 items-center h-24 ">
            <div>
              <img src="/nit_hamirpur_logo.png" alt="NIT Hamirpur Logo" className="h-20 w-20"/>
            </div>
            <div className="flex-col gap-8  text-center">
              <h1 className="text-lg font-bold font-serif text-gray-200">राष्ट्रीय प्रौद्योगिकी संस्थान, हमीरपुर</h1>
              <h1 className="text-lg font-bold font-serif text-gray-200">National Institute Of Technology, HAMIRPUR</h1>
              <h1 className="text-xs font-medium text-gray-300">(An Institute of National Importance under Ministry of Education, Govt. of India)</h1>
            </div>
           </div>
             <div className="flex space-x-4">
               <Link to="/signup" className="text-gray-300 hover:text-blue-500 hover:underline px-3 py-2 rounded-md text-xl font-medium">
                 SignUp
               </Link>
               <Link to="/login" className="text-gray-300 hover:text-blue-500 hover:underline px-3 py-2 rounded-md text-xl font-medium">
                 LogIn
               </Link>
             </div>
          </div>
        </div>
      </nav>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        
          <h1 className="text-4xl md:text-6xl font-bold text-gray-50">
            Streamline Your
            <span className="text-blue-600"> Email Allotment</span>
          </h1>
          <h2 className="text-xl text-gray-100 max-w-3xl mx-auto">
            A comprehensive portal for managing email allotments
          </h2>
      </div>

      <div className="h-2 bg-white"> </div>
      <div className="bg-gradient-to-b from-[#02263c] to-gray-200 py-20 rounded-xl ">

          <div className="text-center">
            <h2 className="text-3xl text-gray-200 font-bold ">How It Works</h2>
            <p className="text-lg text-gray-200">Simple steps to get your email allotment</p>
          </div>

          <div className="grid md:grid-cols-4 gap-10">
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
              <p className="text-gray-600">FI (Computer Centre) will review and verify your submission</p>
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
