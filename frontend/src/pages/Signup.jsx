import React, { useRef } from 'react'


const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const branches = [
        "CS", "DCS", "EC", "DEC", "EE", "ME", "MNC", "CH", "CE", "EP", "CH", "MS"
    ]
    const handleOnSubmit = ()=>{
        console.log("submitted");
    }
  return (
    <div className='min-h-screen w-full flex'>
        <div className='w-1/2 h-full bg-neutral-950 text-white'>
            <div className='flex flex-col gap-3 items-center justify-center w-full h-full py-5'>
                <h1 className='w-full text-center font-bold text-2xl'>Login to your account</h1>
                <p className='w-full text-center text-neutral-400'>Login to Online Email Allotment System by NITH</p>
                <form onSubmit={handleOnSubmit} className='flex flex-col gap-5 w-full items-center justify-around '>
                    <div className='w-2/3'>
                        <label htmlFor="firstName" className='font-medium'>Name</label>
                        <input 
                            placeholder='hello@gmail.com'
                            type='email'
                            ref={emailRef}
                            className='bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md'
                        />
                    </div>
                    <div className='w-2/3'>
                        <label htmlFor="maidenName" className='font-medium'>Madien Name</label>
                        <input 
                            placeholder='hello@gmail.com'
                            type='email'
                            ref={emailRef}
                            className='bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md'
                        />
                    </div>
                    <div className='w-2/3'>
                        <label htmlFor="lastName" className='font-medium'>Last Name</label>
                        <input 
                            placeholder='hello@gmail.com'
                            type='email'
                            ref={emailRef}
                            className='bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md'
                        />
                    </div>
                    <div className='w-2/3'>
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input 
                            placeholder='hello@gmail.com'
                            type='email'
                            ref={emailRef}
                            className='bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md'
                        />
                    </div>
                    <div className='w-2/3'>
                        <label htmlFor="password" className='font-medium'>Password</label>
                        <input 
                            placeholder=''
                            type='password'
                            ref={passwordRef}
                            className='bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md'
                        />
                    </div>
                    <div className='w-2/3'>
                        <label htmlFor="branch" className='font-medium'>Branch</label>
                        <select name="Role" className='w-full bg-neutral-800 rounded-md px-2 py-1 mt-2'>
                        {branches.map((branch, i)=>{
                            return (<option className='rounded-md  px-2 py-1 ' value={branch}>{branch}</option>)
                        })}
                        </select>
                    </div>
                    <button type="submit" className='bg-white w-2/3 rounded-md px-3 py-1 font-medium text-black'>Sign Up</button>
                    <h1 className='text-sm'>Already have a account? <span className='underline underline-offset-1'>Login</span></h1>
                </form>
            </div>
        </div>
        <div className='w-1/2 h-full bg-neutral-500'></div>
    </div>
  )
}

export default Signup
