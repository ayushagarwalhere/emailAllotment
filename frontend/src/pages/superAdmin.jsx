import AdminForm from "../components/adminForm";
import NavbarAdmin from "../components/navbarAdmin";
import Footer from "./footer";       

function SuperAdmin() {
    return(
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
        <div className="min-h-screen w-full flex flex-col  p-4 sm:p-6 mt-11">
            <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Super Admin</h1>
                <AdminForm />
            </div>
        </div>
        
        </div>
    )
}

export default SuperAdmin