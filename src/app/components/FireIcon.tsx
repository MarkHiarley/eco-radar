
import React from 'react';
import Image from 'next/image';
import Icone from '@/app/assets/ecoradar-icone.png';

const FireIcon = () => {
  return (
    
      <Image 
        src={Icone}
        alt="Logo do EcoRadar" 
        className='w-25'
      />
   
  );
};

export default FireIcon;