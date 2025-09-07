import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/studentSignUp'
import LogIn from './pages/logIn'
import LandingPage from './pages/landingPage'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App