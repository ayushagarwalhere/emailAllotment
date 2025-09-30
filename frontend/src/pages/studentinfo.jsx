import NavbarAdmin from "../components/navbarAdmin";
import Button from "../components/Button"; 
import Dropdown from "../components/dropdown";
import StudentCard from "../components/studentcards";
import Footer from "./footer";
import { useEffect, useState } from "react";

function StudentInfo(){

    const [students, setStudents] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        const getStudents = async()=>{
            const response = await axios.get("/api/admin");
            setStudents(response.data.users);
            setCount(response.data.count);
        }
        getStudents();
    },[])
   
    return(
        <div className="min-h-screen overflow-hidden">
            <NavbarAdmin></NavbarAdmin>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 px-4 sm:px-8 mt-8">
           <div className="mt-4 mb-4 sm:mb-10 sm:ml-10 sm:mt-15"> 
              <h1 className=" font-bold text-2xl sm:text-3xl" >Students Requests</h1>
              <h2 className="text-sm sm:text-base">Review and verify students details here</h2>
           </div>
              <div className="px-4 sm:px-0 mb-3"><Dropdown></Dropdown></div>
        </div>

        <div className="px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {students.map((student,index)=>(
                <StudentCard key={index} name={student.name} roll={student.roll}/>
            ))}
        </div>
        
        </div>
    );
}
export default StudentInfo;