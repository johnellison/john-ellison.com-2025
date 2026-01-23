import { NextRequest, NextResponse } from 'next/server';
import { saveAssessment } from '@/lib/supabase';
import { calculateDimensionScore, calculateOverallScore, getReadinessLevel, identifyBlockers, generateRecommendations, calculateAxisScores, determineArchetype } from '@/lib/scoring';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Anthropic API key for industry analysis
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { companyData, answers, companyInsights } = body;

    if (!companyData || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!companyData.name || !companyData.website || !companyData.email) {
      return NextResponse.json(
        { error: 'Company name, website, and email are required' },
        { status: 400 }
      );
    }

    if (typeof answers !== 'object' || Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Invalid answers payload' },
        { status: 400 }
      );
    }

    const dimensionScores = [
      { dimension: 'Leadership & Strategy', score: calculateDimensionScore(answers, Object.keys(answers).filter(k => k.startsWith('l'))), weight: 0.2 },
      { dimension: 'Data Readiness', score: calculateDimensionScore(answers, Object.keys(answers).filter(k => k.startsWith('d'))), weight: 0.25 },
      { dimension: 'Technology Infrastructure', score: calculateDimensionScore(answers, Object.keys(answers).filter(k => k.startsWith('t'))), weight: 0.15 },
      { dimension: 'Talent & Capability', score: calculateDimensionScore(answers, Object.keys(answers).filter(k => k.startsWith('ta'))), weight: 0.15 },
      { dimension: 'Governance & Responsible AI', score: calculateDimensionScore(answers, Object.keys(answers).filter(k => k.startsWith('g'))), weight: 0.1 },
      { dimension: 'Culture & Change Readiness', score: calculateDimensionScore(answers, Object.keys(answers).filter(k => k.startsWith('c'))), weight: 0.15 },
    ];

    const overallScore = calculateOverallScore(dimensionScores);
    const readiness = getReadinessLevel(overallScore);
    const blockers = identifyBlockers(dimensionScores);
    const recommendations = generateRecommendations(overallScore, dimensionScores);
    
    // New Calculations for Archetypes
    const axisScores = calculateAxisScores(dimensionScores);
    const archetype = determineArchetype(axisScores);

    // Generate industry-specific AI analysis if we have company insights
    let industryAnalysis = '';
    if (ANTHROPIC_API_KEY && companyInsights?.company_summary) {
      try {
        const strengthDimensions = dimensionScores
          .filter(d => d.score >= 70)
          .map(d => d.dimension)
          .join(', ');
        const gapDimensions = blockers.map(b => b.dimension).join(', ');

        const analysisPrompt = `You are analyzing an AI readiness assessment for ${companyData.name}.

COMPANY CONTEXT (from website analysis):
${companyInsights.company_summary}

${companyInsights.ai_maturity?.signals ? `Website signals detected:\n${companyInsights.ai_maturity.signals.join('\n')}` : ''}

ASSESSMENT RESULTS:
- Overall AI Readiness: ${overallScore}/100
- AI Archetype: ${archetype.name} - "${archetype.hook}"
- Strategic Vision Score: ${axisScores.vision}/100
- Operational Capability Score: ${axisScores.ops}/100

Key Strengths: ${strengthDimensions || 'Building foundational capabilities'}
Critical Gaps: ${gapDimensions || 'No critical blockers identified'}

TASK: Generate a highly personalized 3-paragraph analysis that:

**Paragraph 1 - Industry Context & Opportunities:**
- Reference specific details from their website/business
- Identify 2-3 AI opportunities tailored to their industry and current state
- Show you understand their market positioning

**Paragraph 2 - Realistic Challenges:**
- Based on their ${archetype.name} profile, what friction points will they face?
- What gaps need addressing before scaling AI?
- Be specific to their dimension scores and detected signals

**Paragraph 3 - Actionable Starting Point:**
- Given their ${axisScores.vision} vision and ${axisScores.ops} ops scores, where should they start?
- Recommend 1-2 specific first initiatives
- Connect back to their identified strengths

Tone: Professional consultant speaking directly to the company ("you", "your organization")
Length: 2-3 sentences per paragraph
Style: Conversational but authoritative - show domain expertise

Format as clean markdown:
- Use **bold** for emphasis on key terms
- No headers (just 3 paragraphs)
- No bullet points in the main text`;

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': ANTHROPIC_API_KEY,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 800,
            messages: [{
              role: 'user',
              content: analysisPrompt,
            }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiContent = data?.content?.[0]?.text;
          if (typeof aiContent === 'string' && aiContent.trim()) {
            industryAnalysis = aiContent.trim();
          }
        }
      } catch (error) {
        console.error('Error generating industry analysis:', error);
        // Continue without industry analysis if it fails
      }
    }

    const assessmentData = {
      company_name: companyData.name,
      website: companyData.website,
      linkedin: companyData.linkedin || '',
      email: companyData.email,
      dimension_scores: dimensionScores.reduce((acc, dim) => ({ ...acc, [dim.dimension]: dim.score }), {}),
      overall_score: overallScore,
      readiness_level: readiness.level,
      blockers,
      recommendations,
      company_insights: companyInsights || null,
      archetype,   // Save new field
      axis_scores: axisScores, // Save new field
      // Note: industry_analysis is not saved to DB, only returned in API response
    };

    const { success, data } = await saveAssessment(assessmentData);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save assessment' },
        { status: 500 }
      );
    }

    // Send email in background (don't block response)
    sendAssessmentEmail(companyData.email, {
      overallScore,
      readiness,
      dimensionScores,
      blockers,
      recommendations,
      archetype,
    }).catch(err => console.error('Background email error:', err));

    return NextResponse.json({
      success: true,
      assessmentId: data?.[0]?.id,
      report: {
        overallScore,
        readiness,
        dimensionScores,
        blockers,
        recommendations,
        archetype,
        axisScores,
        companyData, // Pass back for dashboard
        companyInsights: companyInsights || null, // Include company insights
        industryAnalysis: industryAnalysis || null, // Include AI-generated analysis
      },
    });
  } catch (error) {
    console.error('Assessment submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendAssessmentEmail(email: string, report: any) {
  try {
    if (!resend) {
      console.warn('RESEND_API_KEY is not configured. Skipping email delivery.');
      return;
    }

    const { data, error } = await resend.emails.send({
      from: 'John Ellison <no-reply@updates.john-ellison.com>',
      to: email,
      cc: 'john@john-ellison.com',
      subject: 'Your AI Readiness Assessment Report',
      html: generateEmailContent(report),
    });

    if (error) {
      console.error('Email send error:', error);
    }
  } catch (err) {
    console.error('Exception sending email:', err);
  }
}

function generateEmailContent(report: any): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Inter', sans-serif; background: #0c0c10; color: #fff; margin: 0; padding: 40px 20px; }
          .container { max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 40px; }
          .score-display { background: linear-gradient(135deg, #7c3aed, #3b82f6); padding: 30px; border-radius: 12px; margin: 30px 0; }
          .score-value { font-size: 72px; font-weight: 700; color: #fff; }
          .score-label { font-size: 18px; opacity: 0.9; }
          .section { margin: 30px 0; padding: 24px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
          .section-title { font-size: 24px; font-weight: 600; margin-bottom: 20px; }
          .dimension { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .dimension-name { font-size: 16px; }
          .dimension-score { font-size: 32px; font-weight: 700; }
          .blocker { background: rgba(239, 68, 68, 0.1); padding: 16px; border-radius: 8px; margin: 12px 0; border-left: 3px solid #ef4444; }
          .blocker-title { font-weight: 600; margin-bottom: 8px; }
          .recommendation { background: rgba(34, 197, 94, 0.1); padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 3px solid #22c55e; }
          .cta { text-align: center; margin: 40px 0; }
          .btn { display: inline-block; background: #7c3aed; color: #fff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your AI Readiness Assessment</h1>
            <p>Here's your personalized report based on the 40 questions you completed.</p>
          </div>

          <div class="score-display">
            <div class="score-value">${report.overallScore}/100</div>
            <div class="score-label">${report.readiness.level}</div>
          </div>

          <div class="section">
            <div class="section-title">Dimension Scores</div>
            ${report.dimensionScores.map((dim: any) => `
              <div class="dimension">
                <span class="dimension-name">${dim.dimension}</span>
                <span class="dimension-score">${dim.score}/100</span>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Top Blockers</div>
            ${report.blockers.map((blocker: any) => `
              <div class="blocker">
                <div class="blocker-title">${blocker.dimension}: ${blocker.issue}</div>
                <p><strong>Impact:</strong> ${blocker.impact}</p>
                <p><strong>Cost to Fix:</strong> ${blocker.costRange}</p>
                <p><strong>Timeline:</strong> ${blocker.timeline}</p>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Recommendations</div>
            ${report.recommendations.map((rec: any) => `
              <div style="margin: 20px 0;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">${rec.phase}: ${rec.title}</h3>
                <p style="margin-bottom: 16px;">${rec.description}</p>
                <ul>
                  ${rec.actions.map((action: string) => `<li style="padding: 8px 0;">• ${action}</li>`).join('')}
                </ul>
                <p style="font-size: 14px; opacity: 0.8;">Timeframe: ${rec.timeframe}</p>
              </div>
            `).join('')}
          </div>

          <div class="cta">
            <a href="https://calendar.app.google/wirgV6a4Vcz7cZAcA" class="btn">Schedule Strategy Call</a>
            <p style="margin-top: 16px; opacity: 0.7; font-size: 14px;">
              Let's discuss your results and build your transformation roadmap.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
