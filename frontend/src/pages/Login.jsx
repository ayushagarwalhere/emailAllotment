import React, { useState } from 'react'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = async(e)=>{
    e.preventDefault();
    console.log({ name, middleName, lastName, email, password, branch });
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post("/api/student/login", user);
      localStorage.setItem("email", email);
      navigate("/verify-otp");
      console.log(response);
    } catch (error) {
        onsole.error(error);
    }
    }
  return (
    <div className='h-screen w-full flex'>
        <div className='w-1/2 h-full bg-neutral-950 text-white'>
            <div className='flex flex-col gap-3 items-center justify-center w-full h-full py-5'>
                <h1 className='w-full text-center font-bold text-2xl'>Login to your account</h1>
                <p className='w-full text-center text-neutral-400'>Login to Online Email Allotment System by NITH</p>
                <form onSubmit={handleOnSubmit} className='flex flex-col gap-5 w-full items-center justify-around '>
                    <div className='flex flex-col w-2/3 gap-3'>
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input 
                            placeholder='hello@gmail.com'
                            type='email'
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className='bg-neutral-800 text-sm outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md'
                        />
                    </div>
                    <div className='flex flex-col w-2/3 gap-3'>
                        <label htmlFor="password" className='font-medium'>Password</label>
                        <input 
                            placeholder=''
                            type='password'
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className='bg-neutral-800 text-sm outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md'
                        />
                        <a href="" className=''>Forgot Your <span className='underline underline-offset-1'>Password</span>?</a>
                    </div>
                    <select name="Role" ref={roleRef} className='w-2/3 bg-neutral-800 rounded-md px-2 py-1 mt-2'>
                        <option className='rounded-md px-2 py-1 ' value="Student">Student</option>
                        <option className='rounded-md px-2 py-1' value="Admin">Admin</option>
                        <option className='rounded-md px-2 py-1' value="Super Admin">Super Admin</option>
                    </select>
                    <button type="submit" className='bg-white w-2/3 rounded-md px-3 py-1 font-medium text-black'>Login</button>
                    <h1>Don't have a account? <span className='underline underline-offset-1 text-sm'>SignUp</span></h1>
                </form>
            </div>
        </div>
        <div className='w-1/2 h-full bg-neutral-500'></div>
    </div>
  )
}

export default Login
