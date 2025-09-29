function AdminCard({ name, role }){
    return (
        <div className="border-3 border-blue-200 rounded-lg p-4 w-full max-w-sm mx-auto sm:mx-0 flex flex-col justify-between">
            <div className="ml-1">
                <h2 className="font-semibold">{name}</h2>
                <p className="text-sm text-gray-600">{role}</p>
            </div>
            <div className="flex justify-end">
                <button className="bg-black text-white px-3 py-1.5 rounded-2xl text-sm">
                    View Details
                </button>
            </div>
        </div>
    )
}

export default AdminCard


