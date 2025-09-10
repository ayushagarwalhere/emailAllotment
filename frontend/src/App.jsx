import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/studentSignUp'
import LogIn from './pages/logIn'
import LandingPage from './pages/landingPage'
import StudentDashboard from './pages/studentDashboard'
import AdminDashboard from './pages/adminDashboard'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
      <AdminDashboard />
    </Router>
  )
}

export default App