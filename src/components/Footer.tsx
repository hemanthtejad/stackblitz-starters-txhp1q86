import React from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-20" role="contentinfo">
      <div className="enterprise-container">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-gray-900" />
              <span className="text-xl font-display font-bold text-gray-900" aria-label="HorizonLync">HorizonLync</span>
            </div>
            <p className="text-sm">
              Bridging the gap between education and employment through practical training
              and mentorship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-gray-900 transition-colors">Services</a></li>
              <li><a href="/blog" className="hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-gray-900 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/practical-training" className="hover:text-gray-900 transition-colors">Practical Training</Link></li>
              <li><Link to="/services/interview-prep" className="hover:text-gray-900 transition-colors">Interview Preparation</Link></li>
              <li><Link to="/services/resume-building" className="hover:text-gray-900 transition-colors">Resume Building</Link></li>
              <li><Link to="/services/mentorship" className="hover:text-gray-900 transition-colors">Personalized Mentorship</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>contact@horizonlync.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>123 Innovation Drive, Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} HorizonLync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;