import { useState } from "react";
import InputPlace from "./inputPlace";

function AdminForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [branch, setBranch] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        // TODO: wire to backend once available
        console.log({ name, email, rollNumber, branch, role, password });
    };

    return(
        <div className="w-full bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center sm:text-left">Create Admin</h2>
            <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <InputPlace placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <InputPlace type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Branch</label>
                    <select
                        className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        value={branch}
                        onChange={(e)=>setBranch(e.target.value)}
                    >
                        <option value="">Select branch</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EE</option>
                        <option value="ME">ME</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Architechure">Architechure</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
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