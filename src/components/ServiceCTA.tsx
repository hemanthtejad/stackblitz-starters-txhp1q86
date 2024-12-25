import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCTAProps {
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction?: string;
  highlight?: string;
}

const ServiceCTA = ({ title, description, primaryAction, secondaryAction, highlight }: ServiceCTAProps) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')] opacity-10 mix-blend-overlay"></div>
      <div className="enterprise-container">
        <div className="max-w-4xl mx-auto text-center">
          {highlight && (
            <span className="inline-block px-4 py-2 bg-white/10 rounded-2xl text-sm font-medium text-white mb-6">
              {highlight}
            </span>
          )}
          <h2 className="heading-lg text-white mb-6">{title}</h2>
          <p className="text-xl text-gray-300 mb-12">{description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-medium
                         hover:bg-gray-100 transform hover:translate-y-[-2px] transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
                         shadow-lg shadow-white/10">
              {primaryAction}
              <ArrowRight className="ml-2 h-5 w-5 inline-block" />
            </Link>
            {secondaryAction && (
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-2xl font-medium border-2 border-white/20
                         hover:bg-white/10 hover:border-white transform hover:translate-y-[-2px] transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
                         shadow-lg shadow-white/5"
              >
                {secondaryAction}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCTA;