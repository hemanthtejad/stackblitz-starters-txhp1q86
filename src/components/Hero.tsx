import React from 'react';
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="pt-24 lg:pt-32 overflow-hidden">
      <div className="enterprise-container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 mb-4">
              Trusted by Leading Companies
            </span>
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-gray-900 animate-pulse" />
          </div>
          <h1 className="heading-xl mb-8 relative inline-block">
            Transform Your Career with Industry-Leading Training
            <Star className="absolute -right-8 top-0 h-6 w-6 text-gray-900/20 animate-float delay-100" />
            <Zap className="absolute -left-8 bottom-0 h-6 w-6 text-gray-900/20 animate-float delay-300" />
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Bridge the gap between education and employment with practical skills that matter.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 inline-block" />
            </Link>
            <Link to="/services/practical-training" className="btn-secondary">
              View Curriculum
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/5 to-transparent rounded-3xl" />
          <div className="enterprise-card text-center">
            <h3 className="heading-md mb-2 text-gray-900">90%</h3>
            <p className="text-gray-600">Job placement rate within 3 months</p>
          </div>
          <div className="enterprise-card text-center">
            <h3 className="heading-md mb-2 text-gray-900">1000+</h3>
            <p className="text-gray-600">Graduates placed in top companies</p>
          </div>
          <div className="enterprise-card text-center">
            <h3 className="heading-md mb-2 text-gray-900">98%</h3>
            <p className="text-gray-600">Student satisfaction rate</p>
          </div>
        </div>

        {/* Logos */}
        <div className="mt-20 text-center">
          <p className="text-sm font-medium text-gray-600 mb-8">
            TRUSTED BY LEADING COMPANIES
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Accenture-logo.png" 
              alt="Microsoft" 
              className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2b/%26pictures.png" 
              alt="Google" 
              className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2e/.meme_gTLD_logo.png" 
              alt="Amazon" 
              className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/01-Paylocity-Primary-LogoTag-Lock.png" 
              alt="Meta" 
              className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;