import { Link } from "react-router-dom"

function NavbarSuperAdmin(){
    return(
        <nav className=" text-black px-4 py-2.5 fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur">
            <div className="flex justify-between items-center gap-2 pr-4 sm:pr-8 ">
            <a href="nith.ac.in" className="flex items-center gap-2">
                <img
                   src="/src/assets/nithlogo.png"
                   alt="NITH Logo"
                   className="h-8 w-8 sm:h-10 sm:w-10"
                   />
                   <span className="text-black mt-1.5 font-bold text-[16px] sm:text-[20px]">NIT Hamirpur</span>
            </a>
            <div className="hidden sm:flex gap-4 font-bold text-[16px] sm:text-[18px] space-x-5 sm:space-x-7 z-10 ">
                <Link to='/superadmin/createAdmin' className="hover:text-blue-800">Create Admin</Link>
                <Link to='/superadmin/admins' className="hover:text-blue-800">Admins</Link>
            </div>  
            </div>   

            
        </nav>
    )
}
export default NavbarSuperAdmin