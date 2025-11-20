import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TEAM } from '../constants';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const About: React.FC = () => {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            About Medicomix
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            We are a collective of doctors, engineers, and visionaries dedicated to making advanced healthcare accessible to everyone through technology.
          </motion.p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-100 rounded-2xl z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop" 
                alt="Team meeting" 
                className="rounded-2xl shadow-2xl relative z-10 w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Founded in 2020, Medicomix started with a simple question: Why is medical data so hard to understand? We set out to build tools that translate complex physiological signals into clear, actionable insights.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Today, we serve patients and providers in over 30 countries. Our commitment to clinical accuracy and user-centric design drives everything we do.
              </p>
              <div className="grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
                {[
                  { val: '2020', label: 'Founded' },
                  { val: '150+', label: 'Employees' },
                  { val: '12M+', label: 'Lives Impacted' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                  >
                    <div className="text-3xl font-bold text-blue-600 mb-1">{item.val}</div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Meet the experts guiding our vision towards a healthier future.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {TEAM.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-5 shadow-sm">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
                    <span className="text-white font-medium">View LinkedIn</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3 text-sm">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};