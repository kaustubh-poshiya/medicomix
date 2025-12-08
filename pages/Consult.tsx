import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const Consult: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    symptom: '',
    urgency: 'normal',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-blue-600 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 text-sm font-bold uppercase tracking-wider mb-6">
              <User size={16} />
              <span>Patient Care</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Book Your Consultation
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
              Connect with a specialist in minutes. Our AI-powered matching ensures you get the right care, right away.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 order-2 lg:order-1"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Tell us about your needs</h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Primary Symptom / Reason</label>
                  <input
                    type="text"
                    name="symptom"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="e.g., Persistent headache, Skin rash..."
                    value={formData.symptom}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Urgency Level</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['low', 'normal', 'high'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: level })}
                        className={`py-3 rounded-xl text-sm font-bold capitalize border-2 transition-all ${formData.urgency === level
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes (Optional)</label>
                  <textarea
                    name="notes"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Any other details..."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  Find My Doctor <ArrowRight size={20} />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Request Submitted</h3>
                <p className="text-slate-600 mb-8">
                  We've received your request. Our AI is currently matching you with the best available specialist. Check your email for confirmation and next steps.
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Return to Home
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8">How It Works</h2>

            <div className="space-y-10 relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block"></div>

              {[
                {
                  icon: Calendar,
                  title: 'Submit Your Request',
                  desc: 'Tell us about your symptoms and urgency level.'
                },
                {
                  icon: ShieldCheck,
                  title: 'AI Matching',
                  desc: 'Our algorithm finds the perfect specialist for your specific condition.'
                },
                {
                  icon: Clock,
                  title: 'Connect Instantly',
                  desc: 'Start a video consultation or chat within minutes.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 relative z-10">
                  <div className="w-12 h-12 bg-white border-2 border-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <item.icon size={20} />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-slate-900 rounded-3xl text-white text-center">
              <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="text-slate-300 mb-6">
                For medical emergencies, please call your local emergency number immediately.
              </p>
              <div className="inline-block bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg text-sm font-bold">
                Emergency: 911
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
