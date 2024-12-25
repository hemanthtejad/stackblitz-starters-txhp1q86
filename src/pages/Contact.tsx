import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Users } from 'lucide-react';
import { supabase, ContactForm } from '../lib/supabase';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Validate required fields
      const contactData: ContactForm = {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
      };

      // Validate all fields are present
      if (Object.values(contactData).some(value => !value)) {
        throw new Error('Please fill in all required fields');
      }
      
      const { error } = await supabase
        .from('contacts')
        .insert([contactData]);
      
      if (error) {
        console.error('Database error:', error.message);
        throw error;
      }

      setSubmitStatus('success');
      form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error instanceof Error ? error.message : 'Unknown error');
      setSubmitStatus('error');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="enterprise-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 mb-6">
            Contact Us
          </span>
          <h1 className="heading-xl mb-8">
            Let's Start Your Journey Together
          </h1>
          <p className="text-xl text-gray-600">
            Have questions about our programs? We're here to help you take the next step in your career journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {/* Contact Information */}
          <div>
            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: <MessageSquare className="h-6 w-6" />,
                  title: '24/7 Support',
                  description: 'Get help whenever you need it',
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: 'Dedicated Team',
                  description: 'Personal attention guaranteed',
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: 'Quick Response',
                  description: 'Response within 24 hours',
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: 'Global Reach',
                  description: 'Supporting students worldwide',
                },
              ].map(item => (
                <div key={item.title} className="enterprise-card group">
                  <div className="mb-4 text-gray-400 group-hover:text-gray-900 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="enterprise-card">
              <h2 className="heading-md mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-gray-400 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@horizonlync.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-gray-400 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-gray-400 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Innovation Drive<br />
                      Tech City, TC 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="enterprise-card">
            <h2 className="heading-md mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2" required>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2" required>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2" required>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2" required>
                  Subject
                </label>
                <select
                  name="subject"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="training">Training Programs</option>
                  <option value="mentorship">Mentorship</option>
                  <option value="resume">Resume Building</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2" required>
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                Send Message
                <Send className="ml-2 h-5 w-5 inline-block" />
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">
                  Thank you for your message! We'll get back to you soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-center">
                  There was an error sending your message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;