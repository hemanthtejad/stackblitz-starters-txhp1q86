import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ServiceHeroProps {
  title: string;
  description: string;
  category: string;
}

const ServiceHero = ({ title, description, category }: ServiceHeroProps) => {
  return (
    <div className="enterprise-container">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 mb-6">
          {category}
        </span>
        <h1 className="heading-xl mb-8">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">{description}</p>
        <button className="btn-primary">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5 inline-block" />
        </button>
      </div>
    </div>
  );
};

export default ServiceHero;