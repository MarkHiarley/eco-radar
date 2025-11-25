"use client";

import { BiCircle, BiHome, BiBell } from "react-icons/bi";
import { useRouter } from "next/navigation";

const LateralBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}) => {
  const router = useRouter();
  const buttonLabels = [
    { icon: <BiHome className="text-white h-8 w-8 cursor-pointer" />, label: "Propriedades" },
    { icon: <BiBell className="text-white h-8 w-8 cursor-pointer" />, label: "Notificações" },
  ];

  return (
    <div
      className={`h-screen transition-all duration-300 ${
        isOpen
          ? "w-64 items-start relative"
          : "w-20 items-start md:relative max-md:hidden"
      } bg-black gap-8 flex flex-col p-3 `}
    >
      <div>
        <button className="p-2 focus:outline-none cursor-pointer">
          <BiCircle
            className="h-8 w-8 text-white"
            onClick={() => setIsOpen(!isOpen)}
          />
        </button>
      </div>
      {buttonLabels.map((button, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer text-nowrap"
          onClick={() => router.push('/desenvolvimento')}
        >
          <button
            className={`p-2 focus:outline-none ${isOpen ? "self-start" : ""}`}
          >
            {button.icon}
          </button>
          {isOpen && (
            <span className="text-white ml-2 cursor-pointer">
              {button.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default LateralBar;