'use client'

import { useState } from "react";
import { BiCircle, BiHome, BiBell } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineBugReport } from "react-icons/md";
const LateralBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const alignmentClass = isOpen ? "items-start" : "items-center";
    return (

        <div className="flex">
            <div
                className={`h-screen transition-all duration-300 ${isOpen ? "w-64 items-start" : "w-16 items-center"
                    } bg-black gap-8 flex flex-col p-3`}>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none">
                    <BiCircle className="h-8 w-8 text-white" />
                </button>
                <button className={`p-2 focus:outline-none ${isOpen ? "self-start" : ""}`}>
                    <BiHome className="text-white h-8 w-8" />
                </button>
                <button className={`p-2 focus:outline-none ${isOpen ? "self-start" : ""}`}>
                    <BiBell className="text-white h-8 w-8" />
                </button>
                <button className={`p-2 focus:outline-none ${isOpen ? "self-start" : ""}`}>
                    <MdOutlineBugReport className="text-white h-8 w-8" />
                </button>
                <button className={`p-2 focus:outline-none ${isOpen ? "self-start" : ""}`}>
                    <IoExitOutline className="text-white h-8 w-8" />
                </button>
            </div>

        </div>
    );
};

export default LateralBar;