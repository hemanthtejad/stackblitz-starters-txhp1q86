import React from 'react';
import ServiceHero from '../../components/ServiceHero';
import ServiceCTA from '../../components/ServiceCTA';
import { Compass, Users, Target, Check } from 'lucide-react';

const Mentorship = () => {
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <ServiceHero
        category="Personalized Mentorship"
        title="Navigate Your Career Path"
        description="One-on-one guidance from industry veterans who provide personalized strategies, insights, and support to accelerate your career growth"
      />

      <div className="enterprise-container">
        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Compass className="h-12 w-12" />,
              title: 'Career Navigation',
              description: 'Get expert guidance on your career direction',
            },
            {
              icon: <Users className="h-12 w-12" />,
              title: 'Industry Connections',
              description: 'Build valuable professional relationships',
            },
            {
              icon: <Target className="h-12 w-12" />,
              title: 'Goal Setting',
              description: 'Define and achieve your career objectives',
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

        {/* Core Focus Areas */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Core Focus Areas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Career Development',
                items: [
                  'Strategic career planning',
                  'Skill development roadmap',
                  'Leadership development',
                  'Personal brand building',
                  'Performance optimization',
                  'Work-life integration',
                  'Promotion strategies',
                  'Career transition guidance'
                ],
              },
              {
                title: 'Industry Expertise',
                items: [
                  'Market insights and trends',
                  'Strategic networking tactics',
                  'Industry best practices',
                  'Technology landscape',
                  'Competitive analysis',
                  'Innovation strategies',
                  'Regulatory compliance',
                  'Risk management'
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

        {/* Specialized Programs */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Specialized Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Leadership Excellence',
                description: 'Develop essential leadership skills',
                features: [
                  'Team management strategies',
                  'Decision-making frameworks',
                  'Change management',
                  'Executive presence'
                ]
              },
              {
                title: 'Technical Advancement',
                description: 'Stay ahead in technical roles',
                features: [
                  'Technology stack guidance',
                  'Architecture decisions',
                  'Technical leadership',
                  'Innovation practices'
                ]
              },
              {
                title: 'Business Growth',
                description: 'Scale your business impact',
                features: [
                  'Strategic planning',
                  'Stakeholder management',
                  'Business development',
                  'Market expansion'
                ]
              }
            ].map((program) => (
              <div key={program.title} className="enterprise-card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <ul className="space-y-3">
                  {program.features.map((feature) => (
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
        <ServiceCTA
          highlight="1:1 Mentorship"
          title="Accelerate Your Career Growth"
          description="Get personalized guidance from industry leaders who've been where you want to go."
          primaryAction="Match with a Mentor"
          secondaryAction="View Mentor Profiles"
        />
      </div>
    </div>
  );
};

export default Mentorship;