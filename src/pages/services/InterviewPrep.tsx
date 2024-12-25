import React from 'react';
import ServiceHero from '../../components/ServiceHero';
import ServiceCTA from '../../components/ServiceCTA';
import { Users, MessageSquare, Target, Check } from 'lucide-react';

const InterviewPrep = () => {
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <ServiceHero
        category="Interview Preparation"
        title="Ace Your Interviews"
        description="Comprehensive interview preparation with industry veterans, focusing on both technical and behavioral aspects to help you stand out and secure your dream role"
      />

      <div className="enterprise-container">
        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Users className="h-12 w-12" />,
              title: 'Mock Interviews',
              description: 'Practice with industry professionals in realistic scenarios',
            },
            {
              icon: <MessageSquare className="h-12 w-12" />,
              title: 'Personalized Feedback',
              description: 'Receive detailed feedback to improve your performance',
            },
            {
              icon: <Target className="h-12 w-12" />,
              title: 'Industry Focus',
              description: 'Prepare for interviews in your specific field',
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

        {/* Technical Interview Prep */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Technical Interview Excellence</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Algorithm & Data Structures',
                items: [
                  'Time & space complexity analysis',
                  'Advanced data structure usage',
                  'Algorithm optimization techniques',
                  'Problem-solving strategies',
                  'Common patterns recognition',
                  'Edge case handling',
                  'Code efficiency improvement',
                  'Solution explanation skills'
                ],
              },
              {
                title: 'System Design',
                items: [
                  'Scalability principles',
                  'Database design patterns',
                  'Microservices architecture',
                  'Load balancing strategies',
                  'Caching mechanisms',
                  'API design best practices',
                  'Security considerations',
                  'Performance optimization'
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
        {/* Interview Types */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Comprehensive Interview Coverage</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Technical Interviews",
                description: "Master coding challenges and system design discussions",
                topics: [
                  "Data structures & algorithms",
                  "System design principles",
                  "Code optimization",
                  "Problem-solving strategies"
                ]
              },
              {
                title: "Behavioral Interviews",
                description: "Perfect your STAR method responses",
                topics: [
                  "Situation analysis",
                  "Task identification",
                  "Action description",
                  "Result quantification"
                ]
              },
              {
                title: "Case Interviews",
                description: "Excel in consulting and business scenarios",
                topics: [
                  "Market sizing",
                  "Business strategy",
                  "Problem frameworks",
                  "Data analysis"
                ]
              }
            ].map((type) => (
              <div key={type.title} className="enterprise-card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-3">
                  {type.topics.map((topic) => (
                    <li key={topic} className="flex items-center">
                      <Check className="h-5 w-5 text-gray-900 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Process */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Our Preparation Process</h2>
          <div className="space-y-8">
            {[
              {
                step: "1. Initial Assessment",
                description: "Evaluate your current interview skills and identify areas for improvement",
                details: [
                  "Mock interview evaluation",
                  "Skill gap analysis",
                  "Personalized improvement plan",
                  "Target role alignment"
                ]
              },
              {
                step: "2. Intensive Training",
                description: "Focused practice sessions with industry experts",
                details: [
                  "Role-specific scenarios",
                  "Real-time feedback",
                  "Communication coaching",
                  "Body language training"
                ]
              },
              {
                step: "3. Final Preparation",
                description: "Polish your performance and build confidence",
                details: [
                  "Company research strategies",
                  "Question preparation",
                  "Stress management",
                  "Follow-up techniques"
                ]
              }
            ].map((phase) => (
              <div key={phase.step} className="enterprise-card">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{phase.step}</h3>
                <p className="text-gray-600 mb-6">{phase.description}</p>
                <ul className="space-y-3">
                  {phase.details.map((detail) => (
                    <li key={detail} className="flex items-center">
                      <Check className="h-5 w-5 text-gray-900 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Interview Types */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Specialized Interview Formats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Technical Deep Dive',
                description: 'Master complex technical discussions',
                features: [
                  'Architecture reviews',
                  'Code debugging sessions',
                  'System optimization',
                  'Technical presentation'
                ]
              },
              {
                title: 'Leadership Assessment',
                description: 'Excel in senior role interviews',
                features: [
                  'Vision articulation',
                  'Team scaling strategies',
                  'Conflict resolution',
                  'Strategic planning'
                ]
              },
              {
                title: 'Cross-functional',
                description: 'Navigate diverse team dynamics',
                features: [
                  'Stakeholder management',
                  'Project prioritization',
                  'Resource allocation',
                  'Impact assessment'
                ]
              }
            ].map((type) => (
              <div key={type.title} className="enterprise-card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-3">
                  {type.features.map((feature) => (
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
          highlight="Success Guaranteed"
          title="Ace Your Next Interview"
          description="Get personalized interview coaching from industry veterans and boost your confidence."
          primaryAction="Schedule Mock Interview"
          secondaryAction="Learn More"
        />
      </div>
    </div>
  );
};

export default InterviewPrep;