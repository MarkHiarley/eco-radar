'use client'
import { BiCircle } from "react-icons/bi";
import { abreLateral } from "../utils/abreLateral";

const ButtonMobile = () => {
    return (
        <button
            onClick={()=> abreLateral}
            className="p-2 bg-gray-800 border border-gray-600 rounded-full shadow-lg
          focus:outline-none cursor-pointer z-[1000] bottom-5 right-5 fixed"
        >
            <BiCircle className="h-8 w-8 text-white" />
        </button>
    );
};

export default ButtonMobile;