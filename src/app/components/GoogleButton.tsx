'use client'
import React from "react";
import { useRouter } from "next/navigation";
import GoogleLogo from "@/app/assets/google-logo.png";
import Image from "next/image";


const GoogleButton = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center space-y-4">
      <button className="flex flex-row gap-5 items-center px-6 py-2 bg-gray-50 rounded-lg shadow-md hover:bg-gray-300 text-black text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-200 cursor-pointer"
      onClick={() => {router.push('/desenvolvimento')}}>
      <Image
        src={GoogleLogo}
        alt="Google Logo"
        width={30}
        />
        Conecte-se com Google
      </button>
      <button className="px-6 py-2 bg-gray-50 rounded-lg shadow-md hover:bg-gray-300 text-black text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-200 cursor-pointer" 
      onClick={()=>{
        router.push('/users')
      
      }}>
        Entrar como visitante
      </button>
    </div>
  );
};

export default GoogleButton;