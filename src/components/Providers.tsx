'use client'

import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { ColorProvider } from './ColorContext'; // Adjust the path as needed

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <ColorProvider>
        {children}
      </ColorProvider>
    </>
  );
}

export default Providers;