import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <div className="section-padding bg-gray-900">
      <div className="enterprise-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join over 1,000+ professionals who have transformed their careers through 
            HorizonLync's enterprise-grade training and mentorship.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary bg-white text-gray-900 hover:bg-gray-100">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 inline-block" />
            </button>
            <button className="btn-secondary text-white border-gray-700 hover:border-white hover:bg-white/10">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;