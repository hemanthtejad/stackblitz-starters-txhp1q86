import React from 'react';
import { Download, Star, Check } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  downloadUrl: string;
  features: string[];
  rating: number;
  downloads: number;
  category: string;
}

const templates: Template[] = [
  {
    id: 'tech-modern',
    title: 'Modern Tech Professional',
    description: 'Clean and minimalist design optimized for tech roles',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600',
    downloadUrl: '/templates/modern-tech-resume.docx',
    features: [
      'ATS-optimized layout',
      'Skills matrix section',
      'Project showcase format',
      'GitHub integration space'
    ],
    rating: 4.9,
    downloads: 12500,
    category: 'Technology'
  },
  {
    id: 'executive',
    title: 'Executive Leadership',
    description: 'Professional template for senior management positions',
    image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=600',
    downloadUrl: '/templates/executive-resume.docx',
    features: [
      'Achievement-focused layout',
      'Leadership summary section',
      'Key metrics highlights',
      'Board experience section'
    ],
    rating: 4.8,
    downloads: 8900,
    category: 'Executive'
  },
  {
    id: 'creative',
    title: 'Creative Professional',
    description: 'Stylish design for creative industry roles',
    image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=600',
    downloadUrl: '/templates/creative-resume.docx',
    features: [
      'Portfolio integration',
      'Visual skills display',
      'Brand identity section',
      'Project gallery layout'
    ],
    rating: 4.7,
    downloads: 10200,
    category: 'Creative'
  },
  {
    id: 'entry-level',
    title: 'Entry Level Professional',
    description: 'Perfect for recent graduates and career starters',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600',
    downloadUrl: '/templates/entry-level-resume.docx',
    features: [
      'Education-focused layout',
      'Skills development section',
      'Internship highlights',
      'Extracurricular activities'
    ],
    rating: 4.8,
    downloads: 15600,
    category: 'Entry Level'
  }
];

const ResumeTemplates = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const categories = ['All', 'Technology', 'Executive', 'Creative', 'Entry Level'];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="mb-32">
      <h2 className="heading-lg text-center mb-6">ATS-Optimized Templates</h2>
      <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Download and customize our professionally designed, ATS-friendly resume templates
        that have helped thousands land interviews at top companies.
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-xl font-medium transition-all
              ${selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredTemplates.map(template => (
          <div key={template.id} className="enterprise-card group">
            {/* Preview Image */}
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-medium flex items-center">
                  Preview Template
                </button>
              </div>
            </div>

            {/* Template Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{template.title}</h3>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-2 font-medium">{template.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{template.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {template.features.map(feature => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-gray-900 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Download Stats & Button */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {template.downloads.toLocaleString()} downloads
                </span>
                <a
                  href={template.downloadUrl}
                  className="btn-primary inline-flex items-center"
                  download
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Template
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;