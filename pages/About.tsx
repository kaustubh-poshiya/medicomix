import React from 'react';
import { motion } from 'framer-motion';
import { TEAM } from '../constants';
import { User, Stethoscope, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TeamCard } from '../components/TeamCard';
import { PageHeader } from '../components/ui/PageHeader';

export const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header */}
      <PageHeader
        title="About Medicomix"
        subtitle="We are a collective of doctors, engineers, and visionaries dedicated to making advanced healthcare accessible to everyone through technology."
        variant="gradient"
        backgroundImage="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop"
      />

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

      {/* Two Worlds, One Platform */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Worlds, One Platform</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We believe the best healthcare outcomes happen when patients and doctors are perfectly synced.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-slate-800 p-10 rounded-3xl border border-slate-700"
            >
              <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <User size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Empowering Patients</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                We give individuals ownership of their health data. With our intuitive apps and wearables, understanding your body's signals has never been easier.
              </p>
              <Link to="/consult" className="text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-2">
                Find a Specialist <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-slate-800 p-10 rounded-3xl border border-slate-700"
            >
              <div className="w-14 h-14 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center mb-6">
                <Stethoscope size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Equipping Doctors</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                We provide clinicians with AI-powered diagnostic support and real-time patient monitoring, allowing for proactive rather than reactive care.
              </p>
              <Link to="/join" className="text-teal-400 font-semibold hover:text-teal-300 flex items-center gap-2">
                Join Our Network <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            <span>Powered by Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Engine Behind the Care</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
            Our proprietary AI engine processes millions of data points daily to identify trends, predict risks, and suggest personalized interventions. It's not just code; it's a lifeline.
          </p>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
            alt="Data Visualization"
            className="rounded-3xl shadow-2xl w-full max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-slate-50">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Ready to Experience Medicomix?
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Join thousands of patients and healthcare providers who are already benefiting from our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consult"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20"
              >
                Book a Consultation <ArrowRight size={20} />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};