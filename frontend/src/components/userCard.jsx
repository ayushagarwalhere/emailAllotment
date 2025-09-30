import { useState } from "react";
import axios from "axios";

export default function UserCard({id, name= "John",middlename="", lastname="",rollno, email="hello@gmail.com", branch="CSE", role="Student", status}){
    const [isOpen, setIsOpen] = useState(false);
    const approveUser = async()=>{
        try {
            const response = await axios.post(`/superadmin/approve/${id}`);
            alert("User Approved Successfully");
            console.log(response.data.message);
        } catch (error) {
            console.error("Error while approving user", error);
        }}

    const rejectUser = async()=>{
        try {
            const response = await axios.post(`/superadmin/reject/${id}`);
            console.log(response.data.message);
        } catch (error) {
            console.error("Error while rejecting user", error);
        }}
    return (
        <>
            <div className="rounded-2xl border-1 border-neutral-300 shadow-2xl p-4 bg-white w-70 h-70 m-2 hover:scale-102 transition-transform flex flex-col justify-between">
                <div className="w-full flex-1 border-b-1 border-neutral-300 mb-2 pb-2">
                    <h1 className="font-semibold text-3xl text-wrap">{name}</h1>
                    <div className="text-sm text-gray-600 mt-2 space-y-1">
                        <h1 className="font-medium text-xl text-wrap">{role}</h1>
                        <h1>{branch}</h1>
                        <h1>{email}</h1>
                    </div>
                </div>
                <button 
                    className="rounded-md w-full bg-black text-white py-1 text-sm mt-3"
                    onClick={()=>setIsOpen(true)}
                >
                    View User
                </button>
            </div>

            {isOpen &&(
                <div className="absolute z-10 bottom-0 rounded-t-2xl shadow-2xl w-110 h-110 bg-neutral-800 flex flex-col justify-between p-6 text-white">
                    <div className="flex-1 p-2 mb-2 border-b-1 border-neutral-100">
                        <h1 className="font-bold text-4xl">{`${name} ${middlename} ${lastname}`}</h1>
                        <div className="mt-5 flex flex-col gap-2">
                            <h1 className="font-semibold text-2xl">{`Role: ${role} `}</h1>
                            <h1 className=" text-xl">{`Email: ${email} `}</h1>
                            <h1 className=" text-xl">{`Roll No.: ${rollno} `}</h1>
                            <h1 className=" text-xl">{`Branch: ${branch} `}</h1>
                            <h1 className=" text-xl">{`Status: ${status} `}</h1>
                            <h1>Other details...</h1>
                        </div>
                        <h1>{}</h1>
                    </div>
                    <div className="flex justify-between">
                        <button 
                            className="rounded-md bg-green-500 text-white py-1 px-2 text-sm mt-3"
                            onClick={()=>{approveUser()}}
                        >
                            Approve
                        </button>
                        <button onClick={()=>{setIsOpen(false)}} className="rounded-md bg-white text-black py-1 px-2 text-sm mt-3">Close</button>
                        <button onClick={()=>{rejectUser()}} className="rounded-md bg-red-500 text-white py-1 px-2 text-sm mt-3">Reject</button>
                    </div>
                </div>
            )}
        </>
    )
}