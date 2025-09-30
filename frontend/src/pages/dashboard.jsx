import Navbar from "../components/Navbar";
import InutPlace from "../components/inputPlace";
import InfoCard from "../components/InfoCard";
import Footer from "./footer";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){
    const [status,setStatus] = useState("");
    const [studentName, setStudentName] = useState("");

    useEffect(()=>{
        const fetchStatus= async()=>{
            try {
                const response = await axios.get('/api/student/status');
                setStatus(response.data.status);
                setStudentName(response.data.name);
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        }
        fetchStatus();
    }, [])

    return <div className="min-h-screen w-full flex flex-col items-center">
        <Navbar></Navbar>
        <h1 className="text-4xl font-bold pb-2 mt-15">User Dashboard</h1>
        <h1 className='text-3xl font-medium'>Hello, {studentName}</h1>
        <h2 className="text-1xl font-medium mb-8 px-5 ">welcome to your student portal.View your information and submit your email allotement request.</h2>
        <h1>Your current form status is <span className='font-medium'>{status}</span></h1>
       <InfoCard  ></InfoCard>
       {/*  */}  
        
        
       
    </div>
}
    export default Dashboard