function InputPlace({ placeholder, value, onChange, type = "text" }){
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="bg-gray-200 text-gray-800 pr-6 pl-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
    );
}

export default InputPlace