import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState('')
    const [otp,setOtp] = useState('');
    
    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        const queryParams = new URLSearchParams(location.search);
        const userId = queryParams.get('id'); 
        try {
            const response = await axios.post(`/auth/verify-otp/${userId}`, {otp});
            console.log(response);
            alert("OTP Verified successfully")
            navigate('/login');
        } catch (error) {
            setErrorMsg(error.message || "OTP Verification failed")
        }
    }
  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-neutral-900'>
      <div className='bg-neutral-500 rounded-2xl p-5'>
        <h1>Enter the OTP</h1>
        <form onSubmit={handleOnSubmit}>
            <input 
                type="number"
                className='bg-white rounded-md m-2'
                maxLength={6}
                value={otp}
                onChange={(e)=>{setOtp(e.target.value)}}
            />
            <button className='bg-green-700 text-white p-3 rounded-md' type="submit">Verify</button>
        </form>
        {errorMsg && (
          <h1>{errorMsg}</h1>
        )}
      </div>
    </div>
  )
}

export default VerifyOTP
