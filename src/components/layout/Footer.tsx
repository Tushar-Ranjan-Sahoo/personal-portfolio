import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080808] border-t border-[#1a1917]/80 py-8 lg:py-10" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[10px] tracking-[0.25em] font-medium leading-relaxed uppercase text-[#887a64] text-center sm:text-left font-sans">
          <span>BUILT ON VALUES.</span>
          <span className="mx-2 hidden sm:inline text-[#3a352c]">•</span>
          <span>DRIVEN BY PURPOSE.</span>
        </div>
        <p className="text-[9px] uppercase tracking-[0.22em] text-[#554f45] text-center sm:text-right font-sans">
          © MR. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};
