import NavbarAdmin from "../components/navbarAdmin";
import Dropdown from "../components/dropdown";
import AdminCard from "../components/adminCard";
import NithNav from "../components/nithnav";
import Footer from "./footer";

function CreateAdmin(){
    const admins = [
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },
        { name: "xxx", role: "Admin" },

    ];

    return(
        <div>
            <NithNav></NithNav>
            <div className="flex justify-between items-center gap-2 pr-8">
                <div className="mt-19 mb-10 ml-10">
                    <h1 className="font-bold text-3xl">Admins</h1>
                    <h2>Manage and review admin users here</h2>
                </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 ">
                {admins.map((admin, index) => (
                    <AdminCard key={index} name={admin.name} role={admin.role} />
                ))}
            </div>
           
        </div>
    )
}

export default CreateAdmin;