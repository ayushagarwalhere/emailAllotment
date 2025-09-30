import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const [errorMsg, setErrorMsg] = useState('')
    const [otp,setOtp] = useState('');
    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('/api/student/verify-otp', {email, otp});
            console.log(response);
            alert("OTP Verified successfully")
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error(error);
            setErrorMsg(error.message || "OTP Verification failed")
        }
    }
  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-black'>
      <div>
        <h1>Enter the OTP</h1>
        <form onSubmit={handleOnSubmit}>
            <input 
                type="number"
                maxLength={6}
                value={otp}
                onChange={(e)=>{setOtp(e.target.value)}}
            />
            <button type="submit">Verify</button>
        </form>
        {errorMsg && (
          <h1>{errorMsg}</h1>
        )}
      </div>
    </div>
  )
}

export default VerifyOTP
