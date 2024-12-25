import React from 'react';
import ServiceHero from '../../components/ServiceHero';
import ServiceCTA from '../../components/ServiceCTA';
import { FileText, Search, Award, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeBuilding = () => {
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <ServiceHero
        category="Resume Building"
        title="Craft Your Professional Story"
        description="Expert guidance on creating compelling resumes that highlight your achievements and get you noticed by top employers using ATS-optimized formats"
      />

      <div className="enterprise-container">
        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Search className="h-12 w-12" />,
              title: 'ATS Optimization',
              description: 'Ensure your resume passes applicant tracking systems',
            },
            {
              icon: <FileText className="h-12 w-12" />,
              title: 'Professional Templates',
              description: 'Access industry-specific resume formats',
            },
            {
              icon: <Award className="h-12 w-12" />,
              title: 'Achievement Focus',
              description: 'Highlight your accomplishments effectively',
            },
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

        {/* Resume Components */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Comprehensive Resume Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Resume Development',
                items: [
                  'Keyword-optimized professional summary',
                  'Industry-specific skills matrix',
                  'Quantified achievements and impact',
                  'Tailored education and certifications',
                  'Custom formatting and design',
                  'Technical skills presentation',
                  'Project portfolio integration',
                  'Multi-format delivery (PDF, DOC, TXT)'
                ],
              },
              {
                title: 'Additional Documents',
                items: [
                  'Targeted cover letters',
                  'LinkedIn profile enhancement',
                  'Professional bio writing',
                  'Reference sheet formatting',
                  'Thank you letter templates',
                  'Follow-up email templates',
                  'Portfolio curation guidance',
                  'Personal brand statement'
                ],
              },
            ].map((section) => (
              <div key={section.title} className="enterprise-card">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center">
                      <Check className="h-5 w-5 text-gray-900 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Industry-Specific Solutions */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Industry-Specific Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Technology',
                description: 'Highlight technical skills and projects',
                features: [
                  'Technical skills matrix',
                  'GitHub portfolio integration',
                  'Project showcase format',
                  'Code sample documentation'
                ]
              },
              {
                title: 'Business & Finance',
                description: 'Emphasize quantifiable achievements',
                features: [
                  'ROI and metrics focus',
                  'Leadership highlights',
                  'Strategic initiative results',
                  'Client success stories'
                ]
              },
              {
                title: 'Creative Industries',
                description: 'Showcase your creative portfolio',
                features: [
                  'Visual portfolio integration',
                  'Brand identity alignment',
                  'Creative project highlights',
                  'Multi-media presentation'
                ]
              }
            ].map((industry) => (
              <div key={industry.title} className="enterprise-card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{industry.title}</h3>
                <p className="text-gray-600 mb-6">{industry.description}</p>
                <ul className="space-y-3">
                  {industry.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-gray-900 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mb-32">
          <h2 className="heading-lg mb-8">Ready to Build Your Resume?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Use our ATS-optimized resume builder to create a professional resume that gets you noticed.
          </p>
          <Link to="/resume-builder" className="btn-primary">
            Build Your Resume Now
            <ArrowRight className="ml-2 h-5 w-5 inline-block" />
          </Link>
        </div>
        
        <ServiceCTA
          highlight="Professional Resume Review"
          title="Get Your Resume Noticed"
          description="Transform your resume into a powerful career tool that gets you interviews at top companies."
          primaryAction="Start Resume Review"
          secondaryAction="See Examples"
        />
      </div>
    </div>
  );
};

export default ResumeBuilding;