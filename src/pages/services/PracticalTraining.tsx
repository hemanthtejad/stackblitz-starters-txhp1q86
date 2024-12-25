import React from 'react';
import ServiceHero from '../../components/ServiceHero';
import ServiceCTA from '../../components/ServiceCTA';
import { BookOpen, Check, Target, Users } from 'lucide-react';

const PracticalTraining = () => {
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <ServiceHero
        category="Practical Training"
        title="Master Real-World Skills"
        description="Industry-aligned training programs that combine hands-on projects, real-world applications, and expert mentorship to build production-ready skills that employers demand"
      />

      <div className="enterprise-container">
        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Target className="h-12 w-12" />,
              title: 'Project-Based Learning',
              description: 'Work on real projects that simulate actual workplace scenarios',
            },
            {
              icon: <Users className="h-12 w-12" />,
              title: 'Expert Instructors',
              description: 'Learn from industry professionals with years of experience',
            },
            {
              icon: <BookOpen className="h-12 w-12" />,
              title: 'Flexible Learning',
              description: 'Access course materials and resources at your own pace',
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

        {/* Technical Tracks */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Specialized Technical Tracks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Full-Stack Development',
                items: [
                  'Modern JavaScript & TypeScript',
                  'React & Node.js ecosystem',
                  'Database design & optimization',
                  'API development & integration',
                  'Cloud deployment & DevOps',
                  'Testing & quality assurance',
                  'Security best practices',
                  'Performance optimization'
                ],
              },
              {
                title: 'Cloud & DevOps',
                items: [
                  'AWS/Azure/GCP platforms',
                  'Container orchestration',
                  'CI/CD pipeline automation',
                  'Infrastructure as Code',
                  'Monitoring & logging',
                  'Security & compliance',
                  'Cost optimization',
                  'Disaster recovery'
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

        {/* Industry Recognition */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Industry Recognition</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: "93%",
                label: "Employment Rate",
                description: "of graduates find relevant employment within 6 months"
              },
              {
                stat: "45+",
                label: "Industry Partners",
                description: "collaborating for internships and job placements"
              },
              {
                stat: "4.8/5",
                label: "Program Rating",
                description: "average rating from past participants"
              }
            ].map((item) => (
              <div key={item.label} className="enterprise-card text-center">
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{item.stat}</h3>
                <p className="text-lg font-semibold text-gray-900 mb-2">{item.label}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Projects */}
        <div className="mb-32">
          <h2 className="heading-lg text-center mb-16">Real-World Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'Build a scalable online marketplace',
                features: [
                  'Payment integration',
                  'Inventory management',
                  'User authentication',
                  'Analytics dashboard'
                ]
              },
              {
                title: 'Enterprise CRM',
                description: 'Develop a customer relationship system',
                features: [
                  'Contact management',
                  'Sales pipeline',
                  'Reporting tools',
                  'API integration'
                ]
              },
              {
                title: 'Social Platform',
                description: 'Create a real-time social network',
                features: [
                  'Real-time messaging',
                  'Content moderation',
                  'Media handling',
                  'Performance at scale'
                ]
              }
            ].map((project) => (
              <div key={project.title} className="enterprise-card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6">{project.description}</p>
                <ul className="space-y-3">
                  {project.features.map((feature) => (
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
          highlight="Limited Time Offer"
          title="Start Your Technical Journey Today"
          description="Join our next cohort and get hands-on experience with industry-standard tools and real-world projects."
          primaryAction="Enroll Now"
          secondaryAction="View Curriculum"
        />
      </div>
    </div>
  );
};

export default PracticalTraining;