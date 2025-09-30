import { useState } from "react";
import InutPlace from "./inputPlace";

function InfoCard(){
    const [name, setName] = useState("");
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
            <form className="space-y-4 w-full px-4 " onSubmit={()=>{handleOnSubmit()}}>
                <InutPlace placeholder="Name">Name</InutPlace>
                <InutPlace placeholder="Roll Number">Roll Number</InutPlace>
                <InutPlace placeholder="Email">Input Place</InutPlace>
                <InutPlace placeholder="Phone Number">Phone Number</InutPlace>
                <div className=''>
                        <label htmlFor="branch" className='font-medium'>Branch</label>
                        <select 
                            name="Role" 
                            className='w-full  rounded-md px-2 py-1 mt-2'
                            value={branch}
                            onChange={(e)=>{setBranch(e.target.value)}}
                            required
                        >
                        {branches.map((branch, i)=>{
                            return (<option className='rounded-md px-2 py-1' value={branch} key={i}>{branch}</option>)
                        })}
                        </select>
                    </div>

            </form>
            <button className="mt-6 bg-gray-800 text-white font-semibold py-3 px-3 rounded-lg items-center justify-center hover:bg-gray-900 ">
                Fill form to generate request 
            </button>
        </div>
    )
}
export default InfoCard