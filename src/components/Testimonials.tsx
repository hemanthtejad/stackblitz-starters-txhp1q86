import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Developer',
    company: 'Tech Corp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    content: 'The practical training at HorizonLync was transformative. Within weeks of completing the program, I landed my dream role at a top tech company.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Marketing Specialist',
    company: 'Brand Solutions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    content: "The mentorship program was a game-changer. My mentor's guidance helped me navigate the industry and accelerate my career growth.",
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Data Analyst',
    company: 'Analytics Pro',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    content: "The interview preparation was exceptional. I went from nervous candidate to confident professional, and it showed in my interviews.",
  },
];

const Testimonials = () => {
  return (
    <div className="section-padding bg-white">
      <div className="enterprise-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg mb-6">Success Stories</h2>
          <p className="text-xl text-gray-600">
            Hear from our alumni about how HorizonLync helped them achieve their career goals
            and land their dream jobs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  name,
  role,
  company,
  image,
  content,
}: {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
}) => (
  <div className="enterprise-card">
    <Quote className="h-8 w-8 text-gray-300 mb-6" />
    <p className="text-gray-600 mb-8">{content}</p>
    <div className="flex items-center">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600">
          {role} at {company}
        </p>
      </div>
    </div>
  </div>
);

export default Testimonials;