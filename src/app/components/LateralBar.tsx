'use client'

import { useState } from "react";
import { BiCircle, BiHome, BiBell } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineBugReport } from "react-icons/md";
const LateralBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const buttonLabels = [
        { icon: <BiHome className="text-white h-8 w-8" />, label: "Propriedades" },
        { icon: <BiBell className="text-white h-8 w-8" />, label: "Notificações" },
        { icon: <MdOutlineBugReport className="text-white h-8 w-8" />, label: "Reporte Bug" },
    ];
    const buttonExit = [
        {icon: <IoExitOutline className="text-white h-8 w-8 align-bottom" />, label: "Sair" }
    ]

    return (
        <div className="flex">
            <div
                className={`h-screen transition-all duration-300 ${isOpen ? "w-64 items-start" : "w-18 items-start"
                    } bg-black gap-8 flex flex-col p-3`}>
                <div>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none cursor-pointer">
                        <BiCircle className="h-8 w-8 text-white" />
                    </button>
                    
                </div>
                {buttonLabels.map((button, index) => (
                    <div key={index} className="flex items-center cursor-pointer">
                        <button className={`p-2 focus:outline-none ${isOpen ? "self-start" : ""}`}>
                            {button.icon}
                        </button>
                        {isOpen && <span className="text-white ml-2 cursor-pointer">{button.label}</span>}
                    </div>
                ))}
                {buttonExit.map((button, index) => (
                    <div key={index} className="flex items-center mt-auto cursor-pointer ">
                        <button className={`p-2 focus:outline-none ${isOpen ? "self-baseline" : ""}`}>
                            {button.icon}
                        </button>
                        {isOpen && <span className="text-white ml-2">{button.label}</span>}
                    </div>
                ))}
            </div>
        </div>
    );

    
};

export default LateralBar;