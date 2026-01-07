import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Activity, Search, Home, Info, Package, Stethoscope, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchOverlay } from './SearchOverlay';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'For Doctors', path: '/join', icon: Stethoscope },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full shadow-lg shadow-slate-200/50 mx-4 mt-2' : ''}`}>
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-500 blur-lg opacity-20 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-gradient-to-tr from-primary-600 to-cyan-500 p-2 rounded-lg text-white group-hover:scale-105 transition-transform duration-300">
                  <Activity size={20} />
                </div>
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900'} group-hover:text-primary-600`}>
                Medicomix
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative hover:text-primary-600 ${location.pathname === link.path ? 'text-primary-600' : 'text-slate-600'
                    }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-primary-600 to-transparent"
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-slate-100 rounded-lg -z-10"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ))}

              <div className="w-px h-6 bg-slate-200 mx-2"></div>

              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 rounded-full transition-all"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                to="/consult"
                className="relative bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all group overflow-hidden shadow-lg shadow-slate-900/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <span className="block h-1.5 w-1.5 rounded-full bg-primary-400 box-shadow-glow"></span>
                </span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-600 hover:text-primary-600"
                aria-label="Search"
              >
                <Search size={24} />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-900 p-3 hover:bg-slate-100 rounded-lg transition-colors touch-manipulation"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden absolute top-full left-0 right-0 shadow-xl"
            >
              <div className="px-4 py-8 space-y-4 flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 text-lg font-medium p-4 rounded-xl transition-colors border border-transparent active:scale-95 transform ${location.pathname === link.path ? 'bg-primary-50 text-primary-600 border-primary-100' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <link.icon size={20} className={location.pathname === link.path ? 'text-primary-600' : 'text-slate-400'} />
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-slate-100">
                  <Link
                    to="/consult"
                    className="block w-full bg-slate-900 text-white text-center py-4 rounded-xl font-bold shadow-lg shadow-slate-900/20 active:scale-95 transition-transform"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
