import React from 'react';
import { BookOpen, Users, FileText, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceLink {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

const services: ServiceLink[] = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Practical Training',
    description: 'Industry-focused curriculum for workplace success',
    path: '/services/practical-training'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Interview Preparation',
    description: 'Expert coaching for interview success',
    path: '/services/interview-prep'
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Resume Building',
    description: 'Craft compelling professional resumes',
    path: '/services/resume-building'
  },
  {
    icon: <Compass className="h-6 w-6" />,
    title: 'Personalized Mentorship',
    description: 'One-on-one guidance for career growth',
    path: '/services/mentorship'
  }
];

interface ServicesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesMenu = ({ isOpen, onClose }: ServicesMenuProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-1/2 transform -translate-x-1/2 w-[90vw] max-w-2xl bg-white shadow-xl border border-gray-100 rounded-xl mt-2"
      onMouseLeave={onClose}
    >
      <div className="p-6">
        <div className="flex flex-col space-y-2">
          {services.map((service) => (
            <Link
              key={service.path}
              to={service.path}
              className="group p-4 rounded-lg hover:bg-gray-50 transition-all hover:shadow-md border border-transparent hover:border-gray-200 flex items-center gap-4"
              onClick={onClose}
            >
              <div className="text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0">
                {service.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-900">Need help choosing?</span>
              <Link to="/contact" className="text-sm font-medium text-gray-900 hover:text-gray-600">
                Contact us
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/blog" className="text-sm font-medium text-gray-900 hover:text-gray-600">
                Read success stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMenu;