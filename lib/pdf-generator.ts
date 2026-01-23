import jsPDF from 'jspdf';
import { AssessmentResult } from '@/types/assessment';

export function generateAssessmentPDF(result: AssessmentResult): void {
  const doc = new jsPDF();
  let yPos = 20;

  // Colors
  const primaryColor: [number, number, number] = [124, 58, 237]; // Purple
  const darkText: [number, number, number] = [30, 30, 30];
  const lightText: [number, number, number] = [100, 100, 100];

  // Header
  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.text('AI Readiness Assessment', 20, yPos);
  yPos += 10;

  // Company name and date
  doc.setFontSize(14);
  doc.setTextColor(...darkText);
  doc.text(result.companyData.name, 20, yPos);
  yPos += 6;

  doc.setFontSize(10);
  doc.setTextColor(...lightText);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, 20, yPos);
  yPos += 15;

  // Score Section with background
  doc.setFillColor(248, 245, 255);
  doc.roundedRect(20, yPos, 170, 40, 3, 3, 'F');

  doc.setFontSize(12);
  doc.setTextColor(...lightText);
  doc.text('Overall AI Readiness Score', 30, yPos + 12);

  doc.setFontSize(42);
  doc.setTextColor(...primaryColor);
  doc.text(`${result.overallScore}`, 30, yPos + 32);
  doc.setFontSize(16);
  doc.setTextColor(...lightText);
  doc.text('/100', 65, yPos + 32);

  // Archetype on the right
  doc.setFontSize(12);
  doc.setTextColor(...lightText);
  doc.text('AI Archetype', 120, yPos + 12);
  doc.setFontSize(16);
  doc.setTextColor(...darkText);
  doc.text(result.archetype.name, 120, yPos + 24);
  doc.setFontSize(10);
  doc.setTextColor(...lightText);
  const hookLines = doc.splitTextToSize(`"${result.archetype.hook}"`, 60);
  doc.text(hookLines, 120, yPos + 32);

  yPos += 50;

  // Axis Scores
  doc.setFontSize(12);
  doc.setTextColor(...darkText);
  doc.text('Axis Scores', 20, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setTextColor(...lightText);
  doc.text(`Strategic Vision: ${result.axisScores.vision}/100`, 20, yPos);
  doc.text(`Operational Capability: ${result.axisScores.ops}/100`, 100, yPos);
  yPos += 15;

  // Dimension Scores - Manual table rendering
  doc.setFontSize(12);
  doc.setTextColor(...darkText);
  doc.text('Dimension Scores', 20, yPos);
  yPos += 8;

  // Table header
  doc.setFillColor(...primaryColor);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('Dimension', 25, yPos + 6);
  doc.text('Score', 120, yPos + 6);
  doc.text('Status', 155, yPos + 6);
  yPos += 10;

  // Table rows
  result.dimensionScores.forEach((d, i) => {
    const status = d.score >= 70 ? 'Strong' : d.score >= 50 ? 'Developing' : 'Needs Work';
    const bgColor: [number, number, number] = i % 2 === 0 ? [250, 250, 252] : [255, 255, 255];

    doc.setFillColor(...bgColor);
    doc.rect(20, yPos, 170, 7, 'F');

    doc.setFontSize(9);
    doc.setTextColor(...darkText);
    doc.text(d.dimension, 25, yPos + 5);
    doc.text(`${d.score}/100`, 120, yPos + 5);

    // Color-code status
    if (status === 'Strong') {
      doc.setTextColor(22, 163, 74);
    } else if (status === 'Developing') {
      doc.setTextColor(202, 138, 4);
    } else {
      doc.setTextColor(220, 38, 38);
    }
    doc.text(status, 155, yPos + 5);

    yPos += 7;
  });

  yPos += 10;

  // Company Insights (if available)
  if (result.companyInsights?.company_summary) {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(...darkText);
    doc.text('Company Analysis', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(...lightText);
    const summaryLines = doc.splitTextToSize(result.companyInsights.company_summary, 170);
    doc.text(summaryLines, 20, yPos);
    yPos += summaryLines.length * 5 + 10;
  }

  // Industry Analysis (if available)
  if (result.industryAnalysis) {
    if (yPos > 180) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(...darkText);
    doc.text('Industry-Specific Insights', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(...lightText);
    // Strip markdown formatting for PDF
    const cleanAnalysis = result.industryAnalysis
      .replace(/\*\*/g, '')
      .replace(/##/g, '')
      .replace(/\n{3,}/g, '\n\n');
    const analysisLines = doc.splitTextToSize(cleanAnalysis, 170);
    doc.text(analysisLines, 20, yPos);
    yPos += analysisLines.length * 5 + 15;
  }

  // Blockers
  if (result.blockers.length > 0) {
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(...darkText);
    doc.text('Critical Blockers', 20, yPos);
    yPos += 8;

    result.blockers.forEach((blocker) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFillColor(254, 242, 242);
      doc.roundedRect(20, yPos - 3, 170, 25, 2, 2, 'F');

      doc.setFontSize(11);
      doc.setTextColor(153, 27, 27);
      doc.text(`${blocker.dimension}: ${blocker.issue}`, 25, yPos + 5);

      doc.setFontSize(9);
      doc.setTextColor(...lightText);
      doc.text(`Impact: ${blocker.impact}`, 25, yPos + 12);
      doc.text(`Cost: ${blocker.costRange} | Timeline: ${blocker.timeline}`, 25, yPos + 18);

      yPos += 30;
    });
  }

  // Roadmap
  if (result.recommendations.length > 0) {
    if (yPos > 160) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(...darkText);
    doc.text('Recommended Roadmap', 20, yPos);
    yPos += 12;

    result.recommendations.forEach((rec) => {
      if (yPos > 240) {
        doc.addPage();
        yPos = 20;
      }

      // Phase badge
      doc.setFillColor(...primaryColor);
      doc.roundedRect(20, yPos - 4, 50, 8, 2, 2, 'F');
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text(rec.phase, 25, yPos + 1);

      // Timeframe
      doc.setFontSize(9);
      doc.setTextColor(...lightText);
      doc.text(rec.timeframe, 75, yPos + 1);
      yPos += 10;

      // Title and description
      doc.setFontSize(12);
      doc.setTextColor(...darkText);
      doc.text(rec.title, 20, yPos);
      yPos += 6;

      doc.setFontSize(10);
      doc.setTextColor(...lightText);
      const descLines = doc.splitTextToSize(rec.description, 170);
      doc.text(descLines, 20, yPos);
      yPos += descLines.length * 5 + 4;

      // Actions
      rec.actions.forEach((action) => {
        if (yPos > 275) {
          doc.addPage();
          yPos = 20;
        }
        doc.setFontSize(9);
        doc.setTextColor(...lightText);
        const actionLines = doc.splitTextToSize(`• ${action}`, 165);
        doc.text(actionLines, 25, yPos);
        yPos += actionLines.length * 4 + 2;
      });

      yPos += 8;
    });
  }

  // CTA Page
  doc.addPage();
  yPos = 60;

  doc.setFillColor(248, 245, 255);
  doc.roundedRect(20, yPos - 20, 170, 80, 5, 5, 'F');

  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.text('Ready to Transform?', 105, yPos, { align: 'center' });
  yPos += 12;

  doc.setFontSize(11);
  doc.setTextColor(...lightText);
  const ctaText = 'Book a strategy call to review your results and build your custom AI transformation roadmap.';
  const ctaLines = doc.splitTextToSize(ctaText, 150);
  doc.text(ctaLines, 105, yPos, { align: 'center' });
  yPos += 25;

  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.textWithLink('Schedule Strategy Call', 105, yPos, {
    url: 'https://calendar.app.google/wirgV6a4Vcz7cZAcA',
    align: 'center',
  });

  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    doc.text(
      'john-ellison.com/ai-transformation',
      20,
      doc.internal.pageSize.height - 10
    );
  }

  // Download
  const filename = `${result.companyData.name.replace(/[^a-zA-Z0-9]/g, '_')}_AI_Readiness_Assessment.pdf`;
  doc.save(filename);
}
