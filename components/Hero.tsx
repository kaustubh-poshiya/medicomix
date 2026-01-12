
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck, Activity, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { TextReveal } from './ui/TextReveal';
import { MagneticButton } from './ui/MagneticButton';
import { HeroBackground } from './HeroBackground';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <HeroBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Content - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            Reimagining Healthcare with AI
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            The Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary-400 to-secondary-400">
              <TextReveal text="Intelligent Care" delay={0.5} />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0">
            Medicomix combines advanced bio-analytics with generative AI to deliver personalized, real-time health insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <MagneticButton>
              <Link
                to="/consult"
                className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl overflow-hidden block text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3 group w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play size={18} className="fill-white text-white ml-1" />
                </div>
                <span>Watch Demo</span>
              </button>
            </MagneticButton>
          </div>

          <div className="mt-12 flex items-center gap-8 text-white/70 text-sm font-medium justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-cyan-400" size={18} />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-cyan-400" size={18} />
              <span>End-to-End Encrypted</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 lg:mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Patient Satisfaction Card */}
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400">
                  <Star size={14} fill="currentColor" />
                </div>
                <span className="text-xs text-white/70 font-medium">Patients Trust Us</span>
              </div>
              <div className="text-white font-bold text-3xl mb-1">99%</div>
              <div className="text-sm text-white/60">Satisfaction Rate</div>
              <div className="w-full bg-white/10 h-1.5 mt-3 rounded-full overflow-hidden">
                <div className="bg-yellow-400 h-full w-[99%]"></div>
              </div>
            </div>

            {/* Commitment Card */}
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-400/20 flex items-center justify-center text-red-400">
                  <Heart size={14} fill="currentColor" />
                </div>
                <span className="text-xs text-white/70 font-medium">Our Promise</span>
              </div>
              <div className="text-white font-bold text-3xl mb-1">100%</div>
              <div className="text-sm text-white/60">Commitment</div>
              <div className="w-full bg-white/10 h-1.5 mt-3 rounded-full overflow-hidden">
                <div className="bg-red-400 h-full w-full"></div>
              </div>
            </div>

            {/* Active Doctors Card */}
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary-400/20 flex items-center justify-center text-primary-400">
                  <Activity size={14} />
                </div>
                <span className="text-xs text-white/70 font-medium">Network</span>
              </div>
              <div className="text-white font-bold text-3xl mb-1">500+</div>
              <div className="text-sm text-white/60">Active Doctors</div>
            </div>

            {/* Global Reach Card */}
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <ShieldCheck size={14} />
                </div>
                <span className="text-xs text-white/70 font-medium">Coverage</span>
              </div>
              <div className="text-white font-bold text-3xl mb-1">30+</div>
              <div className="text-sm text-white/60">Countries</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
