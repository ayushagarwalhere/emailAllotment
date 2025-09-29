import Navbar from "../components/Navbar";
import InutPlace from "../components/inputPlace";
import InfoCard from "../components/InfoCard";
import Footer from "./footer";
function Dashboard(){
    return <div className="min-h-screen w-full flex flex-col items-center">
        <Navbar></Navbar>
        <h1 className="text-4xl font-bold pb-2 mt-15">User Dashboard</h1>
        <h2 className="text-1xl font-medium mb-8 px-5 ">welcome to your student portal.View your information and submit your email allotement request.</h2>
       <InfoCard  ></InfoCard>
       {/*  */}  
        
        
       
    </div>
}
    export default Dashboard