'use client'

import { useState } from "react";
import { BiCircle, BiHome, BiBell } from "react-icons/bi";
const LateralBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex">
            <div
                
                className={`h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-16"
                    } bg-black gap-8 flex flex-col p-3 items-center`}>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none" >
                    <BiCircle className="h-8 w-8 text-white" />
                </button>
                <button className="p-2 focus:outline-none" >
                    <BiHome className="text-white h-8 w-8" />
                </button>
                <button className="p-2 focus:outline-none" >
                    <BiBell className="text-white h-8 w-8" />
                </button>


                {isOpen && (
                    <div>
                        <h1 className="text-2xl font-bold text-center">Lateral Bar</h1>
                        <ul className="list-disc pl-5">
                            <li></li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex-1 bg-white">

            </div>
        </div>
    );
};

export default LateralBar;