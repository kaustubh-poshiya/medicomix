import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ShoppingBag, Check, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';

export const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header */}
      <div className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Our Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Cutting-edge technology designed to monitor, manage, and improve your health with the power of AI.
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 text-slate-400 pr-4 border-r border-slate-200 shrink-0">
              <Filter size={18} />
              <span className="text-sm font-medium hidden md:inline">Filter</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-transparent text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  {/* AI Badge if applicable - randomly adding for demo */}
                  {['Diagnostics', 'Wearables', 'Wellness'].includes(product.category) && (
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                      <Sparkles size={10} className="text-teal-400" />
                      <span>AI Enabled</span>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm shadow-lg p-2.5 rounded-full text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <ShoppingBag size={20} />
                  </motion.button>
                </div>

                <div className="p-6 flex flex-col flex-grow relative z-10 bg-white">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">{product.category}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">{product.description}</p>

                  <div className="mb-6 space-y-3">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-teal-600" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-2xl font-bold text-slate-900">{product.price}</span>
                    <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform active:scale-95 duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-500 text-lg">No products found in this category.</p>
            <button onClick={() => setActiveCategory('All')} className="mt-4 text-blue-600 font-medium hover:underline">
              Clear filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Not sure what you need?</h2>
            <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
              Consult with one of our specialists to find the perfect health solution for your lifestyle.
            </p>
            <Link to="/consult" className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
              Book a Consultation <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};