import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Twitter, Linkedin, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-tr from-secondary-500 to-primary-600 p-1.5 rounded-lg text-white shadow-sm">
                <Activity size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900">Medicomix</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 mb-6">
              Pioneering the future of healthcare with advanced diagnostics and personalized wellness solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* For Patients */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4">For Patients</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/consult" className="hover:text-primary-600 transition-colors">Consult a Doctor</Link></li>
              <li><Link to="/products" className="hover:text-primary-600 transition-colors">Health Products</Link></li>
              <li><Link to="/about" className="hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-600 transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4">For Doctors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/join" className="hover:text-primary-600 transition-colors">Join Platform</Link></li>
              <li><Link to="#" className="hover:text-primary-600 transition-colors">Resources</Link></li>
              <li><Link to="#" className="hover:text-primary-600 transition-colors">Case Studies</Link></li>
              <li><Link to="#" className="hover:text-primary-600 transition-colors">Partner with Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 shrink-0 mt-0.5" />
                <span>123 Innovation Drive, Tech Valley,<br />CA 94025, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <span>contact@medicomix.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Medicomix Healthcare. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with precision and care.</p>
        </div>
      </div>
    </footer>
  );
};
