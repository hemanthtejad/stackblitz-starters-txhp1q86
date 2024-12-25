import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { ResumeData } from '../types/resume';
import { analyzeForATS } from './atsOptimizer';
import { scoreResume } from './resumeScorer';

const generateResumeHTML = (data: ResumeData, template: string): string => {
  const { personalInfo, summary, experience, education, skills } = data;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px;">${personalInfo.firstName} ${personalInfo.lastName}</h1>
        <p style="margin: 10px 0;">
          ${personalInfo.city}, ${personalInfo.state} | ${personalInfo.phone} | ${personalInfo.email}
        </p>
        ${personalInfo.linkedin ? `<p style="margin: 5px 0;">${personalInfo.linkedin}</p>` : ''}
        ${personalInfo.portfolio ? `<p style="margin: 5px 0;">${personalInfo.portfolio}</p>` : ''}
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="border-bottom: 2px solid #333; padding-bottom: 5px;">Professional Summary</h2>
        <p>${summary}</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="border-bottom: 2px solid #333; padding-bottom: 5px;">Experience</h2>
        ${experience.map(exp => `
          <div style="margin-bottom: 20px;">
            <h3 style="margin: 0;">${exp.position}</h3>
            <p style="margin: 5px 0;"><strong>${exp.company}</strong>, ${exp.location}</p>
            <p style="margin: 5px 0; color: #666;">${exp.startDate} - ${exp.endDate || 'Present'}</p>
            <ul style="margin-top: 10px;">
              ${exp.achievements.map(achievement => 
                achievement.trim() ? `<li>${achievement}</li>` : ''
              ).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="border-bottom: 2px solid #333; padding-bottom: 5px;">Education</h2>
        ${education.map(edu => `
          <div style="margin-bottom: 20px;">
            <h3 style="margin: 0;">${edu.school}</h3>
            <p style="margin: 5px 0;">${edu.degree} in ${edu.field}</p>
            <p style="margin: 5px 0; color: #666;">Graduated: ${edu.graduationDate}</p>
            ${edu.gpa ? `<p style="margin: 5px 0;">GPA: ${edu.gpa}</p>` : ''}
          </div>
        `).join('')}
      </div>

      <div>
        <h2 style="border-bottom: 2px solid #333; padding-bottom: 5px;">Skills</h2>
        ${skills.map(skill => `
          <p style="margin: 10px 0;">
            <strong>${skill.category}:</strong> ${skill.items.join(', ')}
          </p>
        `).join('')}
      </div>
    </div>
  `;
};

export const downloadPDF = async (data: ResumeData, template: string): Promise<boolean> => {
  try {
    const content = generateResumeHTML(data, template);
    const element = document.createElement('div');
    element.innerHTML = content;
    document.body.appendChild(element);

    const options = {
      margin: 10,
      filename: `${data.personalInfo.firstName.toLowerCase()}_${data.personalInfo.lastName.toLowerCase()}_resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(options).from(element).save();
    document.body.removeChild(element);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

const generateWordDocument = (data: ResumeData): Document => {
  const { personalInfo, summary, experience, education, skills } = data;

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header with contact info
        new Paragraph({
          children: [
            new TextRun({
              text: `${personalInfo.firstName} ${personalInfo.lastName}`,
              bold: true,
              size: 28
            })
          ],
          heading: HeadingLevel.TITLE,
          spacing: { after: 200 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${personalInfo.city}, ${personalInfo.state} | ${personalInfo.phone} | ${personalInfo.email}`,
              size: 24
            })
          ],
          spacing: { after: 200 }
        }),

        // Summary
        new Paragraph({
          text: 'Professional Summary',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: summary,
          spacing: { after: 400 }
        }),

        // Experience
        new Paragraph({
          text: 'Professional Experience',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        ...experience.flatMap(exp => [
          new Paragraph({
            children: [
              new TextRun({ text: exp.position, bold: true }),
              new TextRun({ text: ` at ${exp.company}`, italics: true })
            ],
            spacing: { before: 200 }
          }),
          new Paragraph({
            text: `${exp.startDate} - ${exp.endDate || 'Present'}`,
            spacing: { after: 200 }
          }),
          ...exp.achievements.map(achievement =>
            new Paragraph({
              text: `• ${achievement}`,
              spacing: { before: 100 }
            })
          )
        ]),

        // Education
        new Paragraph({
          text: 'Education',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        ...education.flatMap(edu => [
          new Paragraph({
            children: [
              new TextRun({ text: edu.school, bold: true })
            ],
            spacing: { before: 200 }
          }),
          new Paragraph({
            text: `${edu.degree} in ${edu.field}`,
            spacing: { after: 100 }
          }),
          new Paragraph({
            text: `Graduated: ${edu.graduationDate}`,
            spacing: { after: edu.gpa ? 100 : 200 }
          }),
          ...(edu.gpa ? [
            new Paragraph({
              text: `GPA: ${edu.gpa}`,
              spacing: { after: 200 }
            })
          ] : [])
        ]),

        // Skills
        new Paragraph({
          text: 'Skills',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        ...skills.map(skill =>
          new Paragraph({
            children: [
              new TextRun({ text: `${skill.category}: `, bold: true }),
              new TextRun({ text: skill.items.join(', ') })
            ],
            spacing: { before: 100 }
          })
        )
      ]
    }]
  });

  return doc;
};

export const downloadWord = async (data: ResumeData, template: string): Promise<boolean> => {
  try {
    const doc = generateWordDocument(data);
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${data.personalInfo.firstName.toLowerCase()}_${data.personalInfo.lastName.toLowerCase()}_resume.docx`);
    return true;
  } catch (error) {
    console.error('Error generating Word document:', error);
    return false;
  }
};
export const generateResumeContent = (data: ResumeData, template: string): string => {
  const { personalInfo, summary, experience, education, skills } = data;
  
  // Common header section
  let content = `${personalInfo.firstName} ${personalInfo.lastName}\n`;
  content += `${personalInfo.city}, ${personalInfo.state} | ${personalInfo.phone} | ${personalInfo.email}\n`;
  if (personalInfo.linkedin) content += `${personalInfo.linkedin}\n`;
  if (personalInfo.github) content += `${personalInfo.github}\n`;
  if (personalInfo.portfolio) content += `${personalInfo.portfolio}\n`;
  content += '\n';

  // Summary section
  content += `PROFESSIONAL SUMMARY\n`;
  content += `------------------\n`;
  content += `${summary}\n\n`;

  // Experience section
  content += `PROFESSIONAL EXPERIENCE\n`;
  content += `---------------------\n`;
  experience.forEach(exp => {
    content += `${exp.company}, ${exp.location}\n`;
    content += `${exp.position} | ${exp.startDate} - ${exp.endDate || 'Present'}\n`;
    exp.achievements.forEach(achievement => {
      if (achievement.trim()) {
        content += `• ${achievement}\n`;
      }
    });
    content += '\n';
  });

  // Education section
  if (education.length > 0) {
    content += `EDUCATION\n`;
    content += `---------\n`;
    education.forEach(edu => {
      content += `${edu.school}\n`;
      content += `${edu.degree} in ${edu.field} | ${edu.graduationDate}\n`;
      if (edu.gpa) content += `• GPA: ${edu.gpa}\n`;
      content += '\n';
    });
  }

  // Skills section
  if (skills.length > 0) {
    content += `TECHNICAL SKILLS\n`;
    content += `--------------\n`;
    skills.forEach(skill => {
      content += `• ${skill.category}: ${skill.items.join(', ')}\n`;
    });
  }

  // Projects section
  if (data.projects && data.projects.length > 0) {
    content += '\nPROJECTS\n';
    content += '--------\n';
    data.projects.forEach(project => {
      content += `${project.title}\n`;
      if (project.link) content += `${project.link}\n`;
      content += `• ${project.description}\n`;
      content += `• Technologies: ${project.technologies.join(', ')}\n`;
      content += `• ${project.startDate} - ${project.endDate || 'Present'}\n\n`;
    });
  }

  // Certifications section
  if (data.certifications && data.certifications.length > 0) {
    content += '\nCERTIFICATIONS\n';
    content += '--------------\n';
    data.certifications.forEach(cert => {
      content += `${cert.name} - ${cert.issuer}\n`;
      content += `• Issued: ${cert.date}`;
      if (cert.expiryDate) content += ` | Expires: ${cert.expiryDate}`;
      if (cert.credentialId) content += `\n• Credential ID: ${cert.credentialId}`;
      if (cert.url) content += `\n• Verify at: ${cert.url}`;
      content += '\n\n';
    });
  }

  // Awards section
  if (data.awards && data.awards.length > 0) {
    content += '\nAWARDS & ACHIEVEMENTS\n';
    content += '--------------------\n';
    data.awards.forEach(award => {
      content += `${award.title} - ${award.issuer} (${award.date})\n`;
      content += `• ${award.description}\n\n`;
    });
  }

  // Custom sections
  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach(section => {
      content += `\n${section.title.toUpperCase()}\n`;
      content += `${'-'.repeat(section.title.length)}\n`;
      content += `${section.content}\n\n`;
    });
  }

  return content;
};

export const downloadResume = async (data: ResumeData, template: string) => {
  try {
    const content = generateResumeContent(data, template);
    
    // Analyze resume before download
    const score = scoreResume(data);
    const atsFeedback = analyzeForATS(data);
    
    // Add analysis results at the end of the document
    const analysisContent = `

RESUME ANALYSIS
--------------
Resume Score: ${score.score}/100

Feedback:
${score.feedback.map(f => `• ${f}`).join('\n')}

ATS Analysis:
${atsFeedback.overall}

Formatting Suggestions:
${atsFeedback.formatting.map(f => `• ${f}`).join('\n')}

Content Suggestions:
${atsFeedback.suggestions.map(s => `• ${s}`).join('\n')}
`;

    const finalContent = content + analysisContent;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${data.personalInfo.firstName.toLowerCase()}_${data.personalInfo.lastName.toLowerCase()}_resume.txt`);
    return true;
  } catch (error) {
    console.error('Error generating resume:', error);
    return false;
  }
};