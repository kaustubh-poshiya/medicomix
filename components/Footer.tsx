import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Twitter, Linkedin, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-tr from-teal-500 to-blue-600 p-1.5 rounded-lg text-white">
                <Activity size={20} />
              </div>
              <span className="text-xl font-bold text-white">Medicomix</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Pioneering the future of healthcare with advanced diagnostics and personalized wellness solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* For Patients */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Patients</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/consult" className="hover:text-white transition-colors">Consult a Doctor</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Health Products</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Doctors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/join" className="hover:text-white transition-colors">Join Platform</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Partner with Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>123 Innovation Drive, Tech Valley,<br />CA 94025, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>contact@medicomix.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Medicomix Healthcare. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with precision and care.</p>
        </div>
      </div>
    </footer>
  );
};
