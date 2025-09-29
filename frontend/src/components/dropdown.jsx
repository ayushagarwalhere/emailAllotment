import React, { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left ">
      <button variant="teriary" onClick={() => setIsOpen(!isOpen)} className="px-3 py-1 text-black rounded-md hover:bg-blue-100 outline-[1px]">
        Filters ▼
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Pending
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Approved
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Rejected
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
