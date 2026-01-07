import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Shield, Activity, Quote, Star, Stethoscope, User, Brain, Sparkles, CheckCircle, Smartphone, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { OurServices } from '../components/OurServices';
import { TESTIMONIALS } from '../constants';
import { ThreeDImageRing } from "@/components/ui/draggable-3d-image-ring";

// Animation Variants removed as they are no longer used by the Bento Grid implementation

export const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="font-sans bg-white text-slate-900 overflow-hidden selection:bg-primary-100 selection:text-primary-900">

      <Hero />

      {/* Why Medicomix - Bento Grid Value Proposition */}
      <section className="py-16 md:py-32 relative bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 mb-6">Why Medicomix?</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Bridging the gap between patients and providers with cutting-edge technology designed for the modern era.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Big Card 1 - AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 row-span-1 md:row-span-1 rounded-3xl bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-purple-200 transition-colors"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-purple-600">
                  <Brain size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">AI-Powered Matching</h3>
                <p className="text-slate-600 max-w-md">Our smart algorithms connect patients with the most suitable specialists based on symptoms and medical history.</p>
              </div>

              <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-50 overflow-hidden">
                {/* Decorative graphic for AI */}
                <div className="w-full h-full bg-gradient-to-tl from-purple-100 to-transparent"></div>
              </div>
            </motion.div>

            {/* Tall Card - Secure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 row-span-1 md:row-span-2 rounded-3xl bg-slate-900 text-white p-8 flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 text-cyan-400">
                  <Shield size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Secure & Private</h3>
                <p className="text-slate-300 mb-8 flex-grow">HIPAA-compliant platform ensuring your medical data is encrypted and protected at all times. Your privacy is our priority.</p>

                <div className="mt-auto p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-mono text-slate-400">ENCRYPTION ACTIVE</span>
                  </div>
                  <div className="text-lg font-mono tracking-widest text-cyan-400">AES-256</div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Integrated Care */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-1 row-span-1 rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Integrated Care</h3>
                <p className="text-slate-600 text-sm">Seamlessly sync data from wearables to give doctors a complete view.</p>
              </div>
            </motion.div>

            {/* Card 4 - Global Access (New) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-1 row-span-1 rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Global Access</h3>
                <p className="text-slate-600 text-sm">Connect with specialists from around the world, anytime.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* AI Tool Overview Section */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white"></div>
        <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles size={14} />
                <span>Medicomix AI Engine</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Smarter Diagnostics,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-cyan-500">Faster Recovery</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Our proprietary AI analyses thousands of data points to assist doctors in making accurate diagnoses faster. From symptom checking to predictive health trends, Medicomix AI is your 24/7 health companion.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Instant Symptom Analysis',
                  'Predictive Risk Assessment',
                  'Automated Triage Support',
                  'Personalized Wellness Plans'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transform hover:-translate-y-0.5">
                Start Self-Check
              </button>
            </motion.div>

            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white backdrop-blur-xl aspect-video flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-purple-50"></div>

                {/* Abstract UI Representation */}
                <div className="relative z-10 w-3/4 h-3/4 bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 shadow-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse"></div>
                    <div className="h-4 w-1/3 bg-slate-100 rounded animate-pulse"></div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="h-32 bg-slate-50 rounded-lg border border-slate-100 p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
                    <div className="space-y-3">
                      <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                      <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                      <div className="h-2 w-5/6 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-end">
                    <div className="h-8 w-24 bg-primary-100/50 rounded-md border border-primary-200"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 text-lg">Your journey to better health in three simple steps.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-y-1/2 z-0"></div>

            {[
              {
                step: '01',
                title: 'Connect',
                desc: 'Create your profile and input your symptoms or health data securely.',
                icon: Smartphone
              },
              {
                step: '02',
                title: 'Analyze',
                desc: 'Our AI engine processes your data to identify potential conditions and matches.',
                icon: Brain
              },
              {
                step: '03',
                title: 'Care',
                desc: 'Connect with a specialist for a consultation and personalized treatment plan.',
                icon: Zap
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 bg-white border border-slate-200 p-8 rounded-3xl shadow-lg hover:shadow-xl text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-slate-50 to-white border border-slate-100 flex items-center justify-center text-slate-900 text-xl font-bold mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <item.icon size={28} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center font-mono font-bold text-primary-600 shadow-sm">
                  {item.step}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Our Services - 3D Image Ring Section */}
      <section className="py-16 md:py-32 relative bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 mb-4">Our Services</h2>
            <p className="text-slate-600 text-lg">Comprehensive care across multiple specialties</p>
          </motion.div>
          <div className="h-[500px] flex items-center justify-center">
            <ThreeDImageRing
              items={[
                { image: "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Cardiology" },
                { image: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Neurology" },
                { image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800", title: "General Surgery" },
                { image: "https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Orthopedics" },
                { image: "https://images.pexels.com/photos/6502019/pexels-photo-6502019.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Dentistry" },
                { image: "https://images.pexels.com/photos/5473185/pexels-photo-5473185.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Dermatology" },
                { image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Gynecology" },
                { image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Pediatrics" },
              ]}
              autoRotateSpeed={10}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-primary-100/30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Professionals</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto rounded-full"></div>
          </motion.div>

          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
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
                  <div className="bg-white/60 backdrop-blur-lg p-10 rounded-3xl border border-white/50 text-center relative shadow-xl">
                    <Quote className="w-12 h-12 text-primary-200 absolute top-8 left-8" />

                    <div className="flex justify-center gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>

                    <p className="text-xl text-slate-700 mb-8 italic leading-relaxed font-light">
                      "{TESTIMONIALS[currentTestimonial].content}"
                    </p>

                    <div>
                      <div className="font-bold text-slate-900 text-lg">{TESTIMONIALS[currentTestimonial].name}</div>
                      <div className="text-primary-600 font-medium text-sm">
                        {TESTIMONIALS[currentTestimonial].role}
                        {TESTIMONIALS[currentTestimonial].company && TESTIMONIALS[currentTestimonial].company !== 'N/A' && (
                          <span className="text-slate-500"> • {TESTIMONIALS[currentTestimonial].company}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-4 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${currentTestimonial === idx ? 'bg-primary-100' : 'bg-transparent hover:bg-slate-100'
                    }`}
                  aria-label={`View testimonial ${idx + 1}`}
                >
                  <span className={`block rounded-full transition-all duration-300 ${currentTestimonial === idx ? 'w-8 h-2.5 bg-primary-600' : 'w-2.5 h-2.5 bg-slate-300'
                    }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="get-started" className="py-16 md:py-32 relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-slate-600 text-lg">Choose your path and join the Medicomix community today.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Patient Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl border border-slate-200 text-center flex flex-col items-center group hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all shadow-lg"
            >
              <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">For Patients</h3>
              <p className="text-slate-600 mb-8">
                Find the right specialist, get AI health insights, and take control of your wellbeing.
              </p>
              <Link to="/consult" className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40">
                Consult a Doctor
              </Link>
            </motion.div>

            {/* Doctor Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl border border-slate-200 text-center flex flex-col items-center group hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/10 transition-all shadow-lg"
            >
              <div className="w-16 h-16 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">For Doctors</h3>
              <p className="text-slate-600 mb-8">
                Join our network, access advanced diagnostic tools, and expand your digital practice.
              </p>
              <Link to="/join" className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                I am a Doctor – Join Platform
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};