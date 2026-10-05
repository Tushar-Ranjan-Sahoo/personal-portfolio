import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#080808] text-[#c4b9a8] font-sans antialiased selection:bg-[#cba864] selection:text-black">
      <Navbar />
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col bg-[#070707] w-full" data-purpose="main-layout">
        {children}
      </main>
      <Footer />
    </div>
  );
};

