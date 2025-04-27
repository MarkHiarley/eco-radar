'use client'
import { BiCircle } from "react-icons/bi";

const ButtonMobile = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    return (
        <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-800 border border-gray-600 rounded-full shadow-lg
          focus:outline-none cursor-pointer z-[1000] bottom-5 right-5 fixed md:hidden"
        >
            <BiCircle className="h-8 w-8 text-white" />
        </button>
    );
};

export default ButtonMobile;