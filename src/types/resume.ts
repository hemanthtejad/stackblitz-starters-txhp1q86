export type ResumeTemplate = 'modern-tech' | 'executive' | 'creative' | 'entry-level';

export type ResumeSection = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'awards';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}


export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    linkedin: string;
    github?: string;
    portfolio?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    category: string;
    items: string[];
  }>;
  projects?: Project[];
  certifications?: Certification[];
  awards?: Award[];
  customSections?: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  sections: ResumeSection[];
}