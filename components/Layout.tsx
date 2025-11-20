import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIChatWidget } from './AIChatWidget';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};
