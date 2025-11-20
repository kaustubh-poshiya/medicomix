import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Shield, Activity, Heart, Microscope, Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, TESTIMONIALS } from '../constants';

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 0.8 
    } 
  }
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000); // Slightly slower for better readability
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctaRef.current.style.setProperty('--mouse-x', `${x}px`);
    ctaRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/90 to-slate-100/50 z-10"></div>
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }} // Subtle zoom effect
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2000&auto=format&fit=crop" 
              alt="Laboratory Background" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20">
          <motion.div 
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide mb-6 shadow-sm">
                Next Generation Healthcare
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
              Precision Medicine,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                Human-Centric Care
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
              Medicomix combines advanced biotechnology with AI-driven diagnostics to deliver personalized health solutions that empower you to live better, longer.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="group inline-flex justify-center items-center px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-600/20">
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="inline-flex justify-center items-center px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition-all hover:border-slate-300 hover:shadow-sm">
                Our Mission
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {[
              { label: 'Active Users', value: '50k+' },
              { label: 'Countries', value: '30+' },
              { label: 'Patents Filed', value: '120' },
              { label: 'Support', value: '24/7' },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Medicomix?</h2>
            <p className="text-slate-600 text-lg">We bridge the gap between complex medical data and actionable daily insights.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {[
              { icon: Microscope, title: 'Clinical Accuracy', desc: 'Rigorous testing ensures our devices meet the highest medical standards.' },
              { icon: Shield, title: 'Data Privacy', desc: 'Your health data is encrypted and protected with enterprise-grade security.' },
              { icon: Activity, title: 'Real-time Analytics', desc: 'Instant processing of vital signs for immediate health feedback.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-teal-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Snippet */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Innovations</h2>
              <p className="text-slate-600">Discover our latest breakthroughs in health tech.</p>
            </motion.div>
            <Link to="/products" className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-700 group">
              View all products <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {PRODUCTS.slice(0, 3).map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInScale}
                className="group block cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 shadow-sm border border-slate-100">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover relative z-10 transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                    {product.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                <p className="text-slate-600 mb-4 line-clamp-2 text-sm leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">{product.price}</span>
                  <Link to="/products" className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-1">
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/products" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
              View all products <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-16 text-center"
          >
            Trusted by Professionals
          </motion.h2>
          
          <div className="relative">
            <div className="min-h-[350px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-slate-700 relative shadow-2xl">
                    {/* Quote decoration */}
                    <div className="absolute top-6 left-8 text-slate-600 opacity-20">
                      <Quote size={64} />
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="flex gap-1 mb-8">
                        {[1,2,3,4,5].map((star) => (
                          <motion.div
                            key={star}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: star * 0.05 }}
                          >
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                      
                      <p className="text-xl md:text-3xl text-slate-100 mb-10 leading-relaxed font-light tracking-tight">
                        "{TESTIMONIALS[currentTestimonial].content}"
                      </p>
                      
                      <div className="flex flex-col items-center">
                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-lg font-bold text-white mb-3 shadow-lg">
                            {TESTIMONIALS[currentTestimonial].name.charAt(0)}
                         </div>
                        <div className="font-bold text-white text-lg tracking-wide">{TESTIMONIALS[currentTestimonial].name}</div>
                        <div className="text-blue-400 font-medium text-sm mt-1">
                          {TESTIMONIALS[currentTestimonial].role}
                          {TESTIMONIALS[currentTestimonial].company && TESTIMONIALS[currentTestimonial].company !== 'N/A' && (
                            <span className="text-slate-400"> • {TESTIMONIALS[currentTestimonial].company}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className="group p-2"
                  aria-label={`View testimonial ${idx + 1}`}
                >
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentTestimonial === idx 
                      ? 'w-8 bg-blue-500' 
                      : 'w-2 bg-slate-700 group-hover:bg-slate-600'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section 
        ref={ctaRef}
        onMouseMove={handleMouseMove}
        className="py-24 bg-gradient-to-br from-teal-500 to-blue-600 text-white text-center relative overflow-hidden group"
      >
        {/* Background Dots Effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 pointer-events-none"
        >
           {/* Base Dots */}
           <div 
             className="absolute inset-0 opacity-10"
             style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, white 2px, transparent 2.5px)',
                backgroundSize: '24px 24px'
             }}
           />
           {/* Highlight Dots (Masked) */}
           <div 
             className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
             style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, white 2px, transparent 2.5px)',
                backgroundSize: '24px 24px',
                WebkitMaskImage: 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)',
                maskImage: 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)'
             }}
           />
        </motion.div>
        
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
             <Heart className="w-16 h-16 mx-auto mb-8 text-white/90" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to prioritize your health?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-50 mb-12 font-light"
          >
            Join thousands of users who are taking control of their wellbeing with Medicomix.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/contact" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};