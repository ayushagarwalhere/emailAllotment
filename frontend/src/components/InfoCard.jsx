import { useState } from "react";
import InutPlace from "./inputPlace";
import axios from "axios";

function InfoCard(){
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email,setEmail] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [branch,setBranch]= useState('CS');
    const branches = [
        "CS", "DCS", "EC", "DEC", "EE", "ME", "MNC", "CH", "CE", "EP", "CH", "MS"
    ]
    const handleOnSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <div className="bg-gray-100 shadow-md p-6 sm:p-10 rounded-2xl mx-auto max-w-[700px] mt-1 flex flex-col items-center">
           
            <h2 className="font-bold text-black text-xl mb-6 sm:w-[400px] text-center">Your Information</h2>
            <form className="space-y-4 w-full px-4 " onSubmit={handleOnSubmit}>
                <InutPlace 
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    required
                />
                <InutPlace 
                    placeholder="Roll Number"
                    value = {rollNumber}
                    onChange = {(e)=>{setRollNumber(e.target.value)}}
                    required    
                />
                <InutPlace 
                    type="email"
                    placeholder="Email"
                    value = {email}
                    onChange= {(e)=>setEmail(e.target.value)}
                    required
                />
                <InutPlace 
                    type="tel"
                    placeholder="Phone Number"
                    value={number}
                    onChange={(e)=>{setNumber(e.target.value)}}
                    required
                />
                <div>
                        <label htmlFor="branch" className='font-medium'>Branch</label>
                        <select 
                            name="Role" 
                            className='w-full bg-gray-200 rounded-md px-2 py-1 mt-2'
                            value={branch}
                            onChange={(e)=>{setBranch(e.target.value)}}
                            required
                        >
                        {branches.map((branch, i)=>{
                            return (<option className='rounded-md px-2 py-1' value={branch} key={i}>{branch}</option>)
                        })}
                        </select>
                    </div>
                <button type="submit" className="mt-6 bg-gray-800 text-white font-semibold py-3 px-3 rounded-lg items-center justify-center hover:bg-gray-900 ">
                    Fill form to generate request 
                </button>
            </form>
        </div>
    )
}
export default InfoCard