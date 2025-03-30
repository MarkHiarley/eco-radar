'use client'
import React from "react";
import { useRouter } from "next/navigation";



const GoogleButton = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center space-y-4">
      <button className="px-6 py-2 bg-gray-50 rounded-lg shadow-md hover:bg-gray-300 text-black text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-200">
        Conecte-se com Google
      </button>
      <button className="px-6 py-2 bg-gray-50 rounded-lg shadow-md hover:bg-gray-300 text-black text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-200" onClick={()=>{
        router.push('/users')
      
      }}>
        Descobrir
      </button>
    </div>
  );
};

export default GoogleButton;