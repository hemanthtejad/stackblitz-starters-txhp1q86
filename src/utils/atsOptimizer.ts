import { ResumeData } from '../types/resume';

interface ATSFeedback {
  keywords: string[];
  suggestions: string[];
  formatting: string[];
  overall: string;
}

export const analyzeForATS = (data: ResumeData, jobDescription?: string): ATSFeedback => {
  const feedback: ATSFeedback = {
    keywords: [],
    suggestions: [],
    formatting: [],
    overall: '',
  };

  // Check formatting
  checkFormatting(data, feedback);

  // Analyze keywords
  if (jobDescription) {
    analyzeKeywords(data, jobDescription, feedback);
  }

  // Check content
  checkContent(data, feedback);

  // Generate overall assessment
  generateOverallAssessment(feedback);

  return feedback;
};

const checkFormatting = (data: ResumeData, feedback: ATSFeedback) => {
  // Check for proper section headers
  if (!data.summary) {
    feedback.formatting.push('Add a clear "Professional Summary" section');
  }

  // Check for consistent date formats
  const dateFormats = new Set();
  data.experience.forEach(exp => {
    dateFormats.add(exp.startDate.split(' ')[0]);
    if (exp.endDate) dateFormats.add(exp.endDate.split(' ')[0]);
  });

  if (dateFormats.size > 1) {
    feedback.formatting.push('Use consistent date formats throughout the resume');
  }

  // Check for proper contact information formatting
  const { personalInfo } = data;
  if (!personalInfo.email.includes('@')) {
    feedback.formatting.push('Use a standard email format');
  }

  if (!personalInfo.phone.match(/^[\d\s\-\(\)]+$/)) {
    feedback.formatting.push('Use a standard phone number format');
  }
};

const analyzeKeywords = (data: ResumeData, jobDescription: string, feedback: ATSFeedback) => {
  const jobKeywords = extractKeywords(jobDescription.toLowerCase());
  const resumeContent = getResumeContent(data).toLowerCase();

  const missingKeywords = jobKeywords.filter(
    keyword => !resumeContent.includes(keyword.toLowerCase())
  );

  if (missingKeywords.length > 0) {
    feedback.keywords = missingKeywords;
    feedback.suggestions.push(
      'Consider incorporating these keywords from the job description: ' +
      missingKeywords.join(', ')
    );
  }
};

const checkContent = (data: ResumeData, feedback: ATSFeedback) => {
  // Check experience descriptions
  data.experience.forEach(exp => {
    if (exp.achievements.some(a => a.length > 100)) {
      feedback.suggestions.push(
        'Keep achievement descriptions concise (under 100 characters)'
      );
    }

    const hasMetrics = exp.achievements.some(a => 
      /\d+%|\$\d+|\d+ [a-zA-Z]+/.test(a)
    );
    if (!hasMetrics) {
      feedback.suggestions.push(
        `Add quantifiable metrics to achievements at ${exp.company}`
      );
    }
  });

  // Check skills section
  if (data.skills.length === 0) {
    feedback.suggestions.push('Add a dedicated skills section');
  } else {
    const skillCount = data.skills.reduce(
      (count, skill) => count + skill.items.length, 0
    );
    if (skillCount < 10) {
      feedback.suggestions.push('Include more relevant skills (aim for 10+)');
    }
  }
};

const generateOverallAssessment = (feedback: ATSFeedback) => {
  const totalIssues = 
    feedback.formatting.length +
    feedback.suggestions.length +
    feedback.keywords.length;

  if (totalIssues === 0) {
    feedback.overall = 'Excellent ATS optimization! Your resume is well-formatted and keyword-rich.';
  } else if (totalIssues <= 3) {
    feedback.overall = 'Good ATS optimization with minor improvements suggested.';
  } else if (totalIssues <= 6) {
    feedback.overall = 'Moderate ATS optimization. Address suggested improvements to increase visibility.';
  } else {
    feedback.overall = 'Significant improvements needed for better ATS optimization.';
  }
};

const extractKeywords = (text: string): string[] => {
  // This is a simple keyword extraction.
  // In a production environment, you might want to use NLP libraries
  // or maintain a curated list of industry-specific keywords
  const commonWords = new Set([
    'and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'up', 'about', 'into', 'over', 'after'
  ]);

  return text
    .split(/\W+/)
    .filter(word => 
      word.length > 3 && 
      !commonWords.has(word.toLowerCase()) &&
      !word.match(/^\d+$/)
    );
};

const getResumeContent = (data: ResumeData): string => {
  const sections = [
    data.summary,
    ...data.experience.map(exp => `${exp.position} ${exp.company} ${exp.achievements.join(' ')}`),
    ...data.education.map(edu => `${edu.degree} ${edu.field} ${edu.school}`),
    ...data.skills.map(skill => `${skill.category} ${skill.items.join(' ')}`),
  ];

  if (data.projects) {
    sections.push(...data.projects.map(
      proj => `${proj.title} ${proj.description} ${proj.technologies.join(' ')}`
    ));
  }

  return sections.join(' ');
};