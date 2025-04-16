'use client'    
export const abreLateral = (isOpen: boolean, setIsOpen: (state: boolean) => void) => {
    setIsOpen(!isOpen);
};