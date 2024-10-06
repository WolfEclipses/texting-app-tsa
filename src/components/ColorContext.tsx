import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { hsvaToHex } from '@uiw/color-convert';
import toast from 'react-hot-toast';

// Define the shape of the HSVA color object
interface HSVA {
  h: number;
  s: number;
  v: number;
  a: number;
}

// Define the shape of the context value
interface ColorContextType {
  hsva: HSVA;
  setHsva: React.Dispatch<React.SetStateAction<HSVA>>;
  saveColor: () => void;
}

// Create a Context
const ColorContext = createContext<ColorContextType | undefined>(undefined);

// Create a Provider Component
export const ColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hsva, setHsva] = useState<HSVA>({ h: 214, s: 43, v: 90, a: 1 });

  // Load saved color from localStorage when the component mounts
  useEffect(() => {
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
      const parsedColor: HSVA = JSON.parse(savedColor);
      setHsva(parsedColor);
    }
  }, []);

  // Update CSS variable and localStorage whenever hsva changes
  useEffect(() => {
    const accentColor = hsvaToHex(hsva);
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [hsva]);

  // Function to save the current color to localStorage
  const saveColor = () => {
    localStorage.setItem('accentColor', JSON.stringify(hsva));
    toast.success("Color saved!")
  };

  return (
    <ColorContext.Provider value={{ hsva, setHsva, saveColor }}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook to use the ColorContext
export const useColor = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};
