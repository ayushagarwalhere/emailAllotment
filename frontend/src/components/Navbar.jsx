function Navbar(){
    return(
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
            <div className="flex gap-4 font-bold text-[18px] space-x-7 z-60 ">
                <a href="#home" className="hover:text-blue-800">Home</a>   
                <a href="#about" className="hover:text-blue-800">About Us</a>   
            </div>  
            </div>   

            
        </nav>
    )
}
export default Navbar
