import React from 'react';
import { useAuth } from '../lib/auth';
import { GraduationCap, User, Book, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="enterprise-container">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome back, {profile?.full_name}!
            </h1>
            <p className="text-lg text-gray-600">
              Your learning journey continues. Here's what's new today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <Book className="h-6 w-6" />,
                label: 'Courses',
                value: '12',
                color: 'bg-blue-500'
              },
              {
                icon: <Calendar className="h-6 w-6" />,
                label: 'Sessions',
                value: '48',
                color: 'bg-green-500'
              },
              {
                icon: <User className="h-6 w-6" />,
                label: 'Mentors',
                value: '3',
                color: 'bg-purple-500'
              },
              {
                icon: <GraduationCap className="h-6 w-6" />,
                label: 'Certificates',
                value: '5',
                color: 'bg-yellow-500'
              }
            ].map((stat) => (
              <div key={stat.label} className="enterprise-card">
                <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mb-4`}>
                  <div className={`${stat.color} text-white rounded-full p-2`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="enterprise-card mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Completed React Fundamentals',
                  type: 'Course',
                  date: '2 days ago',
                  icon: <Book className="h-5 w-5" />
                },
                {
                  title: 'Mentorship Session with John Doe',
                  type: 'Session',
                  date: '1 week ago',
                  icon: <User className="h-5 w-5" />
                },
                {
                  title: 'Earned TypeScript Certificate',
                  type: 'Achievement',
                  date: '2 weeks ago',
                  icon: <GraduationCap className="h-5 w-5" />
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-full p-2">
                    {activity.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">
                      {activity.type} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Resume Builder',
                description: 'Create or update your professional resume',
                link: '/resume-builder',
                icon: <Book className="h-6 w-6" />
              },
              {
                title: 'Book Mentorship',
                description: 'Schedule your next mentorship session',
                link: '/services/mentorship',
                icon: <User className="h-6 w-6" />
              },
              {
                title: 'View Courses',
                description: 'Browse available training courses',
                link: '/services/practical-training',
                icon: <GraduationCap className="h-6 w-6" />
              }
            ].map((action) => (
              <div key={action.title} className="enterprise-card group">
                <div className="mb-6 text-gray-400 group-hover:text-gray-900 transition-colors">
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                <a
                  href={action.link}
                  className="text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Get Started →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;