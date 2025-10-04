import { useState } from "react";
import InputPlace from "./inputPlace";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdminForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [middleName, setMiddleName]= useState("");
    const [lastName, setLastName]= useState("");
    const [email, setEmail] = useState("");
    const [branch, setBranch] = useState("");
    const [password, setPassword] = useState("");
    const branches = [
        "CS", "DCS", "EC", "DEC", "EE", "ME", "MNC", "CH", "CE", "EP", "CH", "MS"
    ]

    const onSubmit = async(e) => {
        e.preventDefault();
            const user = {
            name,
            middlename : middleName,
            lastname: lastName,
            email,
            branch,
            password,
        }
        try {
            const response = await axios.post('http://localhost:5000/superaAdmin/createAdmin', user);
            console.log(response);
            alert("Admin created successfully");
            navigate('/superadmin');
        } catch (error) {
            console.error(error);
        }
        
    };

    return(
        <div className="w-full bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center sm:text-left">Create Admin</h2>
            <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <InputPlace 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Middle Name</label>
                    <InputPlace 
                        placeholder="Enter name" 
                        value={middleName} 
                        onChange={(e)=>setMiddleName(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <InputPlace 
                        placeholder="Enter name" 
                        value={lastName} 
                        onChange={(e)=>setLastName(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <InputPlace 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        required
                    />
                </div>

                <div>         
                    <label htmlFor="branch" className='font-medium'>Branch</label>
                    <select 
                        name="Role" 
                        className='w-full bg-neutral-800 rounded-md px-2 py-1 mt-2'
                        value={branch}
                        onChange={(e)=>{setBranch(e.target.value)}}
                        required
                    >
                    {branches.map((branch, i)=>{
                        return (<option className='rounded-md px-2 py-1' value={branch} key={i}>{branch}</option>)
                    })}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <InputPlace type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <div className="pt-2">
                    <button type="submit" className="w-full bg-black text-white rounded-md py-2 font-medium">Create</button>
                </div>
            </form>
        </div>
    )
}

export default AdminForm