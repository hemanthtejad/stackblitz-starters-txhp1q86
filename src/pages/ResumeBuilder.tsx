import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import ResumeGenerator from '../components/ResumeGenerator';

const ResumeBuilder = () => {
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="enterprise-container">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 mb-6">
            Resume Builder
          </span>
          <h1 className="heading-xl mb-8">
            Create Your ATS-Optimized Resume
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Build a professional resume that gets past applicant tracking systems and lands you interviews.
          </p>
          <button 
            className="btn-primary"
            onClick={() => document.getElementById('resume-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Building
            <ArrowRight className="ml-2 h-5 w-5 inline-block" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <FileText className="h-12 w-12" />,
              title: 'ATS-Optimized Format',
              description: 'Ensure your resume gets past applicant tracking systems'
            },
            {
              icon: <FileText className="h-12 w-12" />,
              title: 'Real-Time Analysis',
              description: 'Get instant feedback on your resume content and format'
            },
            {
              icon: <FileText className="h-12 w-12" />,
              title: 'Keyword Optimization',
              description: 'Match your resume with job description keywords'
            }
          ].map((feature) => (
            <div key={feature.title} className="enterprise-card group">
              <div className="mb-6 text-gray-400 group-hover:text-gray-900 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Resume Generator Form */}
        <div id="resume-form">
          <ResumeGenerator />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;