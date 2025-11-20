import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Package, Users, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS, TEAM } from '../constants';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when opened and lock body scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Filter Logic
  const filteredProducts = query.length > 1 
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4) 
    : [];

  const filteredTeam = query.length > 1
    ? TEAM.filter(t => 
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.role.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2)
    : [];

  const hasResults = filteredProducts.length > 0 || filteredTeam.length > 0;

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />
          
          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl border-b border-slate-100 max-h-[85vh] overflow-hidden flex flex-col"
          >
            <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
              {/* Header / Input */}
              <div className="relative flex items-center p-6 md:p-8 border-b border-slate-50 shrink-0">
                <Search className="w-6 h-6 text-slate-400 mr-4 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories, or team members..."
                  className="w-full text-xl md:text-2xl font-medium text-slate-900 placeholder:text-slate-300 border-none focus:ring-0 focus:outline-none bg-transparent"
                />
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors ml-4 shrink-0"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Results Area */}
              <div className="overflow-y-auto p-6 md:p-8 bg-slate-50/50 flex-1 min-h-[300px]">
                {query.length <= 1 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                    <Search className="w-12 h-12 mb-4" />
                    <p className="text-lg">Start typing to search...</p>
                  </div>
                ) : !hasResults ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <p className="text-lg mb-2">No results found for "{query}"</p>
                    <p className="text-sm">Try checking for typos or using different keywords.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Products Section */}
                    {filteredProducts.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Package size={14} /> Products
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {filteredProducts.map(product => (
                            <div 
                              key={product.id}
                              onClick={() => handleNavigate('/products')}
                              className="group bg-white p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
                            >
                              <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-grow min-w-0">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{product.name}</h4>
                                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-2">{product.price}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-1">{product.category}</p>
                                <p className="text-sm text-slate-600 truncate">{product.description}</p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Team Section */}
                    {filteredTeam.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Users size={14} /> Team
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {filteredTeam.map(member => (
                            <div 
                              key={member.id}
                              onClick={() => handleNavigate('/about')}
                              className="group bg-white p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
                            >
                              <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{member.name}</h4>
                                <p className="text-sm text-slate-500">{member.role}</p>
                              </div>
                              <div className="ml-auto">
                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-400 flex justify-between">
                <span>Press <strong>ESC</strong> to close</span>
                <span>{hasResults ? `${filteredProducts.length + filteredTeam.length} results found` : ''}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
