import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, CheckCircle, ArrowRight, Shield, Activity } from 'lucide-react';

export const Join: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    license: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-slate-900/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-sm font-bold uppercase tracking-wider mb-6">
              <Stethoscope size={16} />
              <span>For Medical Professionals</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Future of Medical Practice
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
              Expand your reach, access AI-driven diagnostics, and collaborate with a global network of specialists.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Benefits Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Why Join Medicomix?</h2>

            <div className="space-y-8">
              {[
                {
                  icon: Activity,
                  title: 'AI Diagnostic Support',
                  desc: 'Get real-time, data-driven insights to support your clinical decisions.'
                },
                {
                  icon: Shield,
                  title: 'Secure Infrastructure',
                  desc: 'HIPAA-compliant platform that handles all administrative and security burdens.'
                },
                {
                  icon: CheckCircle,
                  title: 'Flexible Schedule',
                  desc: 'Set your own hours and consult with patients remotely from anywhere.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-blue-800 italic font-medium">
                "Since joining Medicomix, I've been able to help 3x more patients while reducing my administrative workload significantly."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Dr. Sarah Chen</div>
                  <div className="text-xs text-slate-500">Cardiologist</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Provider Application</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      placeholder="Dr. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Specialty</label>
                    <select
                      name="specialty"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
                      value={formData.specialty}
                      onChange={handleChange}
                    >
                      <option value="">Select Specialty</option>
                      <option value="general">General Practice</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="neurology">Neurology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="psychiatry">Psychiatry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Medical License Number</label>
                  <input
                    type="text"
                    name="license"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="License #"
                    value={formData.license}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      placeholder="doctor@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-2"
                >
                  Submit Application <ArrowRight size={20} />
                </button>

                <p className="text-xs text-slate-500 text-center mt-4">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Application Received!</h3>
                <p className="text-slate-600 mb-8">
                  Thank you for your interest in joining Medicomix. Our credentialing team will review your application and contact you within 48 hours.
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="text-teal-600 font-bold hover:underline"
                >
                  Return to Home
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
