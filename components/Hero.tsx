
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { ArrowRight, Play, ShieldCheck, Activity, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StethoscopeModel } from './Stethoscope3D';

import { TextReveal } from './ui/TextReveal';
import { MagneticButton } from './ui/MagneticButton';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Background Gradient & Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-100 rounded-full blur-[100px] animate-pulse-glow opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary-100 rounded-full blur-[100px] opacity-60" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-primary-600 text-sm font-medium mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Reimagining Healthcare with AI
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-cyan-500 to-secondary-500">
              <TextReveal text="Intelligent Care" delay={0.5} />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
            Medicomix combines advanced bio-analytics with generative AI to deliver personalized, real-time health insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticButton>
              <Link
                to="/consult"
                className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 overflow-hidden block"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-sm flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <Play size={18} className="fill-slate-900 text-slate-900 ml-1" />
                </div>
                <span>Watch Demo</span>
              </button>
            </MagneticButton>
          </div>

          <div className="mt-12 flex items-center gap-8 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary-600" size={18} />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary-600" size={18} />
              <span>End-to-End Encrypted</span>
            </div>
          </div>
        </motion.div>

        {/* Right Visual - 3D Interactive Stethoscope */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] w-full hidden lg:block"
        >
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <StethoscopeModel />
              </Float>
              <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Canvas>

          {/* Floating UI Cards */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl max-w-[220px] z-20 pointer-events-none"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                <Star size={16} fill="currentColor" />
              </div>
              <div className="text-xs text-slate-500 font-medium">Trusted by Patients</div>
            </div>
            <div className="text-slate-900 font-bold text-2xl">99%</div>
            <div className="text-sm text-slate-600 font-medium">Patient Satisfaction</div>
            <div className="w-full bg-slate-100 h-1 mt-2 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full w-[99%]"></div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-32 left-0 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl max-w-[240px] z-20 pointer-events-none"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Heart size={16} fill="currentColor" />
              </div>
              <div className="text-xs text-slate-500 font-medium">Our Promise</div>
            </div>
            <div className="text-slate-900 font-bold text-2xl">100%</div>
            <div className="text-sm text-slate-600 font-medium">Commitment to your well-being</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
