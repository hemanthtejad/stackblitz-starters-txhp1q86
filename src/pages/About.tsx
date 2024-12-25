import React from 'react';
import { Users, Target, Award, ArrowRight, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      {/* Hero Section */}
      <div className="enterprise-container">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 mb-6">
            About HorizonLync
          </span>
          <h1 className="heading-xl mb-8">
            Transforming Education into Career Success
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We're on a mission to bridge the gap between academic knowledge and real-world success through practical training and mentorship.
          </p>
          <button className="btn-primary">
            Join Our Mission
            <ArrowRight className="ml-2 h-5 w-5 inline-block" />
          </button>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="enterprise-card">
            <h2 className="heading-md mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-8">
              To empower students and recent graduates with the practical skills, confidence, and connections needed to 
              successfully transition from education to meaningful employment.
            </p>
            <ul className="space-y-4">
              {[
                'Practical skill development through hands-on training',
                'One-on-one mentorship from industry professionals',
                'Career guidance and placement support',
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-gray-900 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="enterprise-card">
            <h2 className="heading-md mb-6">Our Vision</h2>
            <p className="text-gray-600 mb-8">
              To create a world where every graduate can confidently step into their career, equipped with the 
              skills and knowledge that employers truly value.
            </p>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="Team collaboration"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-32">
          <h2 className="heading-lg mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-12 w-12" />,
                title: 'Student-First Approach',
                description: "Every decision we make is guided by what's best for our students' success.",
              },
              {
                icon: <Award className="h-12 w-12" />,
                title: 'Excellence',
                description: 'We maintain high standards in our training programs and mentorship quality.',
              },
              {
                icon: <Target className="h-12 w-12" />,
                title: 'Innovation',
                description: 'We continuously adapt our methods to meet evolving industry needs.',
              },
            ].map((value) => (
              <div key={value.title} className="enterprise-card group">
                <div className="mb-6 text-gray-400 group-hover:text-gray-900 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="heading-lg mb-16">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Mitchell',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
                bio: '15+ years in education and career development',
              },
              {
                name: 'James Wilson',
                role: 'Head of Mentorship',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
                bio: 'Former Fortune 500 HR Director',
              },
              {
                name: 'Lisa Chen',
                role: 'Director of Training',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
                bio: '10+ years in professional development',
              },
            ].map((member) => (
              <div key={member.name} className="enterprise-card group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-900 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;