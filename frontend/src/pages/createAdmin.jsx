import NavbarAdmin from "../components/navbarAdmin";
import Dropdown from "../components/dropdown";
import AdminCard from "../components/adminCard";
import NithNav from "../components/nithnav";
import Footer from "./footer";
import { useEffect, useState } from "react";

function CreateAdmin(){
    const [admins, setAdmins] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        const getAdmins = async()=>{
            try {
                const response = await axios.get('/superadmin');
                console.log(response.data.message);
                setCount(response.data.count);
                setAdmins(response.data.admins)
            } catch (error) {
                console.error("Error while fetching admins", error)
            }
        }
        getAdmins();
    },[])

    return(
        <div>
            <NithNav></NithNav>
            <div className="flex justify-between items-center gap-2 pr-8">
                <div className="mt-19 mb-10 ml-10">
                    <h1 className="font-bold text-3xl">Admins</h1>
                    <h2>Manage and review admin users here</h2>
                </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 px-5 py-3">
                    {count===0? (<h1 className="text-xl font-medium">No admins Found</h1>): (admins.map((admin, index) => (
                        <AdminCard key={index} name={admin.name} role={admin.role.role} />
                    )))}
            </div>
           
        </div>
    )
}

export default CreateAdmin;