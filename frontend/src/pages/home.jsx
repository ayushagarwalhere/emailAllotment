import Button from "../components/Button"   
import Navbar from "../components/Navbar"
import Nithlogo from "../assets/nithlogo.png"
import RadialGradient from "../components/gradient" 
import Footer from "./footer"
import { useState } from "react"



function Home(){
    
    return <div className="min-h-screen w-full flex flex-col justify-center items-center">
        
           
        <h1 className="text-6xl text-center font-bold z-10" >Online email Allotement</h1>
        <h2 className="text-center mt-3 font-medium z-10">one stop solution for students to get their verified NIT Hamirpur Email ID and access campus services </h2>
        <div className="flex gap-10 mt-10 z-10">
        <Button variant = "primary"  > login</Button>
        <Button variant="secondary" >Sign Up</Button>
        
        </div>
        <div className="w-full fixed top-0 left-0 font-medium ">
            <Navbar></Navbar>
        </div>
         <RadialGradient></RadialGradient> 
         
        
        
        
        
        
         
    </div>
    
}
    export default Home
   