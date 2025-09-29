import fourOfour from "../assets/fourOfour.png"
import Footer from "./footer"   
function Error(){
    return (
        <div>

                <nav className=" text-black px-4 py-2.5 fixed top-0 left-0 w-full z-50 ">
            <div className="flex justify-between items-center gap-2 pr-8 ">
            <a href="nith.ac.in" className="flex items-center gap-2">
                <img
                   src="/src/assets/nithlogo.png"
                   alt="NITH Logo"
                   className="h-10 w-10"
                   />
                   <span className="text-black mt-1.5 font-bold text-[20px]">NIT Hamirpur</span>
            </a>
           
            </div>   

            
        </nav>
            
        <div className="flex flex-col justify-center items-center h-screen ">
            <img
                   src="/src/assets/fourOfour.png"
                   alt="404 Error"
                   className="h-50 w-80"
                   />
            <h2 className="mt-1">The page you're looking for is not available</h2>
        </div>
        
        </div>
    )
}
export default Error