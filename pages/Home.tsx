import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Shield, Activity, Quote, Star, Stethoscope, User, Brain, Sparkles, CheckCircle, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../constants';

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

export const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden font-sans">
      {/* Unified Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-primary-900/80 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop"
            alt="Medical Technology"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-200 border border-primary-500/30 font-semibold text-sm mb-8 backdrop-blur-sm">
              <HeartPulse size={16} />
              <span>The Future of Healthcare is Here</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Connecting You to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Better Health</span>
            </h1>

            <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              Medicomix bridges the gap between patients and doctors with advanced AI diagnostics and seamless virtual care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/30 hover:-translate-y-1">
                Get Started
              </button>
              <Link to="/about" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Medicomix - Value Proposition */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Medicomix?</h2>
            <p className="text-slate-600 text-lg">Bridging the gap between patients and providers with cutting-edge technology.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {[
              {
                icon: Brain,
                title: 'AI-Powered Matching',
                desc: 'Our smart algorithms connect patients with the most suitable specialists based on symptoms and medical history.'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                desc: 'HIPAA-compliant platform ensuring your medical data is encrypted and protected at all times.'
              },
              {
                icon: Activity,
                title: 'Integrated Care',
                desc: 'Seamlessly sync data from wearables to give doctors a complete view of your health in real-time.'
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-white text-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ring-1 ring-slate-100">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Tool Overview Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/40 via-slate-900 to-slate-900"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles size={14} />
                <span>Medicomix AI Engine</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Smarter Diagnostics,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Faster Recovery</span>
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Our proprietary AI analyzes thousands of data points to assist doctors in making accurate diagnoses faster. From symptom checking to predictive health trends, Medicomix AI is your 24/7 health companion.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Instant Symptom Analysis',
                  'Predictive Risk Assessment',
                  'Automated Triage Support',
                  'Personalized Wellness Plans'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200">
                    <CheckCircle className="text-secondary-400 w-5 h-5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-primary-500/20">
                Start Self-Check
              </button>
            </motion.div>

            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm aspect-video flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"></div>
                {/* Abstract UI Representation */}
                <div className="relative z-10 w-3/4 h-3/4 bg-slate-900/80 rounded-xl border border-slate-600 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse"></div>
                    <div className="h-4 w-1/3 bg-slate-700 rounded animate-pulse"></div>
                  </div>
                  <div className="h-32 bg-slate-800/50 rounded-lg border border-slate-700 p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary-500/10 to-transparent animate-[shimmer_2s_infinite]"></div>
                    <div className="space-y-3">
                      <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                      <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                      <div className="h-2 w-5/6 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-end">
                    <div className="h-8 w-24 bg-primary-600/80 rounded-md"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 text-lg">Your journey to better health in three simple steps.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

            {[
              {
                step: '01',
                title: 'Connect',
                desc: 'Create your profile and input your symptoms or health data securely.',
                bg: 'bg-primary-50',
                text: 'text-primary-600'
              },
              {
                step: '02',
                title: 'Analyze',
                desc: 'Our AI engine processes your data to identify potential conditions and matches.',
                bg: 'bg-secondary-50',
                text: 'text-secondary-600'
              },
              {
                step: '03',
                title: 'Care',
                desc: 'Connect with a specialist for a consultation and personalized treatment plan.',
                bg: 'bg-primary-50',
                text: 'text-primary-600'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 bg-white p-8 rounded-2xl border border-slate-100 shadow-lg text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl ${item.bg} ${item.text} flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition-transform ring-1 ring-slate-100`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Professionals</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative">
            <div className="min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center relative">
                    <Quote className="w-12 h-12 text-primary-100 absolute top-8 left-8" />

                    <div className="flex justify-center gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    <p className="text-xl text-slate-700 mb-8 italic leading-relaxed">
                      "{TESTIMONIALS[currentTestimonial].content}"
                    </p>

                    <div>
                      <div className="font-bold text-slate-900 text-lg">{TESTIMONIALS[currentTestimonial].name}</div>
                      <div className="text-primary-600 font-medium text-sm">
                        {TESTIMONIALS[currentTestimonial].role}
                        {TESTIMONIALS[currentTestimonial].company && TESTIMONIALS[currentTestimonial].company !== 'N/A' && (
                          <span className="text-slate-400"> • {TESTIMONIALS[currentTestimonial].company}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentTestimonial === idx ? 'w-8 bg-primary-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="get-started" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-slate-600 text-lg">Choose your path and join the Medicomix community today.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Patient Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-primary-50 p-10 rounded-3xl border border-primary-100 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <User size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">For Patients</h3>
              <p className="text-slate-600 mb-8">
                Find the right specialist, get AI health insights, and take control of your wellbeing.
              </p>
              <Link to="/consult" className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/25">
                Consult a Doctor
              </Link>
            </motion.div>

            {/* Doctor Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-secondary-50 p-10 rounded-3xl border border-secondary-100 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mb-6">
                <Stethoscope size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">For Doctors</h3>
              <p className="text-slate-600 mb-8">
                Join our network, access advanced diagnostic tools, and expand your digital practice.
              </p>
              <Link to="/join" className="w-full py-4 bg-secondary-600 text-white rounded-xl font-bold hover:bg-secondary-700 transition-colors shadow-lg hover:shadow-secondary-500/25">
                I am a Doctor – Join Platform
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};