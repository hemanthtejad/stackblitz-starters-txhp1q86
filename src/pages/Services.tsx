import React from 'react';
import { BookOpen, Users, FileText, Compass, ArrowRight, Check } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      {/* Hero Section */}
      <div className="enterprise-container">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 mb-6">
            Our Services
          </span>
          <h1 className="heading-xl mb-8">
            Enterprise-Grade Career Development
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive training and mentorship programs designed to accelerate your career growth.
          </p>
          <button className="btn-primary">
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5 inline-block" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {[
            {
              icon: <BookOpen className="h-12 w-12" />,
              title: 'Practical Training',
              description: 'Industry-focused curriculum designed to bridge the gap between academia and workplace requirements.',
              features: [
                'Hands-on project experience',
                'Industry-standard tools',
                'Real-world case studies',
                'Technical skill development'
              ],
              price: '$599/month'
            },
            {
              icon: <Users className="h-12 w-12" />,
              title: 'Interview Preparation',
              description: 'Comprehensive interview coaching to help you present your best self to potential employers.',
              features: [
                'Mock interview sessions',
                'Feedback and improvement',
                'Common question prep',
                'Industry-specific guidance'
              ],
              price: '$299/month'
            },
            {
              icon: <FileText className="h-12 w-12" />,
              title: 'Resume Building',
              description: 'Expert guidance on crafting compelling resumes that highlight your strengths and achievements.',
              features: [
                'Professional templates',
                'ATS optimization',
                'Cover letter writing',
                'LinkedIn optimization'
              ],
              price: '$199/month'
            },
            {
              icon: <Compass className="h-12 w-12" />,
              title: 'Personalized Mentorship',
              description: 'One-on-one guidance from experienced professionals in your field of interest.',
              features: [
                'Career path planning',
                'Industry insights',
                'Networking opportunities',
                'Ongoing support'
              ],
              price: '$399/month'
            }
          ].map((service) => (
            <div key={service.title} className="enterprise-card group">
              <div className="mb-6 text-gray-400 group-hover:text-gray-900 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-8">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-gray-900 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-gray-900">{service.price}</span>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="text-center mb-32">
          <h2 className="heading-lg mb-16">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '90%',
                label: 'Job placement rate',
                description: 'of our graduates land jobs within 3 months'
              },
              {
                stat: '1000+',
                label: 'Success stories',
                description: 'professionals placed in top companies'
              },
              {
                stat: '98%',
                label: 'Satisfaction rate',
                description: 'from our program participants'
              }
            ].map((item) => (
              <div key={item.stat} className="enterprise-card">
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{item.stat}</h3>
                <p className="text-lg font-semibold text-gray-900 mb-2">{item.label}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;