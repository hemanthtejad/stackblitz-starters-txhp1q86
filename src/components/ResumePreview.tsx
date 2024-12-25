import React from 'react';
import { AlertCircle, CheckCircle, FileText, File, FileEdit } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import { analyzeForATS } from '../utils/atsOptimizer';
import { scoreResume } from '../utils/resumeScorer';
import { downloadResume, downloadPDF, downloadWord } from '../utils/resumeGenerator';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: string;
  jobDescription?: string;
}

const ResumePreview = ({ resumeData, template, jobDescription }: ResumePreviewProps) => {
  const score = scoreResume(resumeData);
  const atsFeedback = analyzeForATS(resumeData, jobDescription);

  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = async (format: 'txt' | 'pdf' | 'docx') => {
    setIsExporting(true);
    try {
      switch (format) {
        case 'txt':
          await downloadResume(resumeData, template);
          break;
        case 'pdf':
          await downloadPDF(resumeData, template);
          break;
        case 'docx':
          await downloadWord(resumeData, template);
          break;
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Resume Preview */}
      <div className="enterprise-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Resume Preview</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport('txt')}
              className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-900 transition-colors"
              disabled={isExporting}
            >
              <FileText className="h-5 w-5 mr-2" aria-hidden="true" />
              Text
            </button>
            <button
              onClick={() => handleExport('docx')}
              className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-900 transition-colors"
              disabled={isExporting}
            >
              <FileEdit className="h-5 w-5 mr-2" aria-hidden="true" />
              Word
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              disabled={isExporting}
            >
              <File className="h-5 w-5 mr-2" aria-hidden="true" />
              PDF
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg font-mono text-sm overflow-auto max-h-[600px]">
          {/* Personal Info */}
          <div className="mb-6">
            <h1 className="text-lg font-bold">
              {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
            </h1>
            <p>{resumeData.personalInfo.city}, {resumeData.personalInfo.state}</p>
            <p>{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
            {resumeData.personalInfo.linkedin && <p>{resumeData.personalInfo.linkedin}</p>}
            {resumeData.personalInfo.github && <p>{resumeData.personalInfo.github}</p>}
            {resumeData.personalInfo.portfolio && <p>{resumeData.personalInfo.portfolio}</p>}
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-md font-bold mb-2">PROFESSIONAL SUMMARY</h2>
            <p>{resumeData.summary}</p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h2 className="text-md font-bold mb-2">EXPERIENCE</h2>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="font-bold">{exp.position}</h3>
                <p>{exp.company}, {exp.location}</p>
                <p className="text-sm">{exp.startDate} - {exp.endDate || 'Present'}</p>
                <ul className="list-disc pl-4 mt-2">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-md font-bold mb-2">EDUCATION</h2>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h3 className="font-bold">{edu.school}</h3>
                <p>{edu.degree} in {edu.field}</p>
                <p className="text-sm">Graduated: {edu.graduationDate}</p>
                {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-md font-bold mb-2">SKILLS</h2>
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="mb-2">
                <span className="font-bold">{skill.category}:</span>{' '}
                {skill.items.join(', ')}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ATS Analysis */}
      <div className="space-y-6">
        {/* Score Card */}
        <div className="enterprise-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Resume Score</h3>
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-gray-600" />
              <span className="text-2xl font-bold text-gray-900">{score.score}/100</span>
            </div>
          </div>
          <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gray-900 transition-all duration-500"
              style={{ width: `${score.score}%` }}
            />
          </div>
        </div>

        {/* ATS Feedback */}
        <div className="enterprise-card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">ATS Analysis</h3>
          
          <div className="space-y-6">
            {/* Overall Assessment */}
            <div className="flex items-start space-x-4">
              {atsFeedback.formatting.length + atsFeedback.suggestions.length > 3 ? (
                <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0" />
              ) : (
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              )}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Overall Assessment</h4>
                <p className="text-gray-600">{atsFeedback.overall}</p>
              </div>
            </div>

            {/* Formatting */}
            {atsFeedback.formatting.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Formatting Issues</h4>
                <ul className="space-y-2">
                  {atsFeedback.formatting.map((issue, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-gray-600">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content Suggestions */}
            {atsFeedback.suggestions.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Content Improvements</h4>
                <ul className="space-y-2">
                  {atsFeedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-gray-600">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Keywords */}
            {atsFeedback.keywords.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {atsFeedback.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;