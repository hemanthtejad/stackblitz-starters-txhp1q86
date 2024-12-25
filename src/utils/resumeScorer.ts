import { ResumeData } from '../types/resume';

interface ScoreResult {
  score: number;
  feedback: string[];
}

interface SectionScore {
  score: number;
  feedback: string[];
}

export const scoreResume = (data: ResumeData): ScoreResult => {
  const sections: Record<string, () => SectionScore> = {
    personal: () => scorePersonalInfo(data.personalInfo),
    summary: () => scoreSummary(data.summary),
    experience: () => scoreExperience(data.experience),
    education: () => scoreEducation(data.education),
    skills: () => scoreSkills(data.skills),
    projects: () => scoreProjects(data.projects || []),
  };

  let totalScore = 0;
  const allFeedback: string[] = [];

  Object.values(sections).forEach(scoreFn => {
    const { score, feedback } = scoreFn();
    totalScore += score;
    allFeedback.push(...feedback);
  });

  // Normalize score to 0-100
  const finalScore = Math.min(100, Math.round(totalScore / Object.keys(sections).length));

  return {
    score: finalScore,
    feedback: allFeedback,
  };
};

const scorePersonalInfo = (info: ResumeData['personalInfo']): SectionScore => {
  const feedback: string[] = [];
  let score = 100;

  if (!info.linkedin) {
    feedback.push('Add your LinkedIn profile to improve visibility');
    score -= 10;
  }

  if (!info.portfolio && !info.github) {
    feedback.push('Consider adding a portfolio or GitHub profile');
    score -= 10;
  }

  return { score, feedback };
};

const scoreSummary = (summary: string): SectionScore => {
  const feedback: string[] = [];
  let score = 100;

  const words = summary.split(' ').length;
  if (words < 50) {
    feedback.push('Summary is too brief. Aim for 50-100 words');
    score -= 20;
  } else if (words > 200) {
    feedback.push('Summary is too long. Keep it under 200 words');
    score -= 10;
  }

  return { score, feedback };
};

const scoreExperience = (experience: ResumeData['experience']): SectionScore => {
  const feedback: string[] = [];
  let score = 100;

  if (experience.length === 0) {
    return {
      score: 0,
      feedback: ['Add professional experience to your resume'],
    };
  }

  experience.forEach(exp => {
    if (exp.achievements.length < 3) {
      feedback.push(`Add more achievements for ${exp.position} at ${exp.company}`);
      score -= 10;
    }

    const hasMetrics = exp.achievements.some(a => 
      /\d+%|\$\d+|\d+ [a-zA-Z]+/.test(a)
    );
    if (!hasMetrics) {
      feedback.push(`Add quantifiable metrics to achievements at ${exp.company}`);
      score -= 15;
    }
  });

  return { score, feedback };
};

const scoreEducation = (education: ResumeData['education']): SectionScore => {
  const feedback: string[] = [];
  let score = 100;

  if (education.length === 0) {
    return {
      score: 0,
      feedback: ['Add educational background to your resume'],
    };
  }

  education.forEach(edu => {
    if (!edu.field) {
      feedback.push(`Add field of study for ${edu.degree} at ${edu.school}`);
      score -= 10;
    }
  });

  return { score, feedback };
};

const scoreSkills = (skills: ResumeData['skills']): SectionScore => {
  const feedback: string[] = [];
  let score = 100;

  if (skills.length === 0) {
    return {
      score: 0,
      feedback: ['Add relevant skills to your resume'],
    };
  }

  skills.forEach(skill => {
    if (skill.items.length < 3) {
      feedback.push(`Add more items to ${skill.category} skills`);
      score -= 10;
    }
  });

  return { score, feedback };
};

const scoreProjects = (projects: ResumeData['projects']): SectionScore => {
  const feedback: string[] = [];
  let score = 100;

  if (projects.length === 0) {
    return {
      score: 70,
      feedback: ['Consider adding relevant projects to showcase your work'],
    };
  }

  projects.forEach(project => {
    if (!project.technologies || project.technologies.length === 0) {
      feedback.push(`Add technologies used in ${project.title}`);
      score -= 10;
    }
    if (!project.link) {
      feedback.push(`Consider adding a link to ${project.title}`);
      score -= 5;
    }
  });

  return { score, feedback };
};