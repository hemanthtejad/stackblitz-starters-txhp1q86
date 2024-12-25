import React, { useState, useCallback } from 'react';
import { FileText, Download, Save, Trash2 } from 'lucide-react';
import type { ResumeData, ResumeTemplate } from '../types/resume';
import ResumePreview from './ResumePreview';

const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: []
};

const ResumeGenerator = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>('modern-tech');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now().toString(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        achievements: ['']
      }]
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addAchievement = (experienceId: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === experienceId 
          ? { ...exp, achievements: [...exp.achievements, ''] }
          : exp
      )
    }));
  };

  const updateAchievement = (experienceId: string, index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === experienceId 
          ? {
              ...exp,
              achievements: exp.achievements.map((a, i) => i === index ? value : a)
            }
          : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        school: '',
        degree: '',
        field: '',
        graduationDate: '',
        gpa: ''
      }]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        id: Date.now().toString(),
        category: '',
        items: ['']
      }]
    }));
  };

  const updateSkill = (id: string, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowPreview(true);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Your Resume</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {['modern-tech', 'executive', 'creative', 'entry-level'].map(template => (
            <button
              key={template}
              onClick={() => setSelectedTemplate(template)}
              className={`p-4 border rounded-xl text-left transition-all ${
                selectedTemplate === template 
                  ? 'border-gray-900 bg-gray-50' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <FileText className="h-6 w-6 mb-2" />
              <div className="font-medium text-gray-900">
                {template.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="enterprise-card mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={resumeData.personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={resumeData.personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={resumeData.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={resumeData.personalInfo.city}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={resumeData.personalInfo.state}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolio"
                  value={resumeData.personalInfo.portfolio}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="enterprise-card mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Professional Summary</h3>
            <textarea
              value={resumeData.summary}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
              rows={4}
              required
            />
          </div>

          {/* Professional Experience */}
          <div className="enterprise-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Professional Experience</h3>
              <button
                type="button"
                onClick={addExperience}
                className="btn-secondary"
              >
                Add Experience
              </button>
            </div>
            
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="mb-6 p-6 border border-gray-200 rounded-lg">
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Achievements
                  </label>
                  {exp.achievements.map((achievement, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => updateAchievement(exp.id, index, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                        placeholder="Describe your achievement..."
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addAchievement(exp.id)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    + Add Achievement
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="enterprise-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Education</h3>
              <button
                type="button"
                onClick={addEducation}
                className="btn-secondary"
              >
                Add Education
              </button>
            </div>
            
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="mb-6 p-6 border border-gray-200 rounded-lg">
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Graduation Date
                    </label>
                    <input
                      type="month"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                      placeholder="e.g., 3.8"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="enterprise-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Skills</h3>
              <button
                type="button"
                onClick={addSkill}
                className="btn-secondary"
              >
                Add Skill Category
              </button>
            </div>
            
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="mb-6 p-6 border border-gray-200 rounded-lg">
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                      placeholder="e.g., Programming Languages"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={skill.items.join(', ')}
                      onChange={(e) => updateSkill(skill.id, 'items', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                      placeholder="e.g., JavaScript, TypeScript, React"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Job Description */}
          <div className="enterprise-card mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Job Description (Optional)</h3>
            <p className="text-gray-600 mb-4">
              Paste the job description to optimize your resume for ATS and keyword matching
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
              rows={6}
              placeholder="Paste job description here..."
            />
          </div>

          {error && (
            <div className="text-red-600 mb-4 text-center">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setResumeData(initialResumeData)}
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Clear Form
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => console.log('Saving draft...')}
            >
              <Save className="h-5 w-5 mr-2" />
              Save Draft
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isGenerating || showPreview}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin h-5 w-5 mr-2 border-2 border-white rounded-full border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Preview Resume
                </>
              )}
            </button>
          </div>
        </form>

        {/* Resume Preview */}
        {showPreview && (
          <div className="mt-12">
            <h2 className="heading-lg mb-8">Resume Preview & Analysis</h2>
            <ResumePreview resumeData={resumeData} template={selectedTemplate} jobDescription={jobDescription} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeGenerator;