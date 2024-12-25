import React from 'react';
import { FileQuestion } from 'lucide-react';

const BlankPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <FileQuestion className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Under Construction
          </h1>
          <p className="text-gray-600 mb-8">
            We're working on bringing you something amazing. Check back soon!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlankPage;