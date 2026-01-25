import { NextRequest, NextResponse } from 'next/server';
import { getAssessment, updateAssessmentAnalysis } from '@/lib/supabase';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

// GET: Check if analysis exists and return it
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing assessment ID' }, { status: 400 });
    }

    const assessment = await getAssessment(id);

    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }

    return NextResponse.json({
      hasAnalysis: !!assessment.industry_analysis,
      industryAnalysis: assessment.industry_analysis || null,
    });
  } catch (error) {
    console.error('Error fetching analysis:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Generate analysis for an assessment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing assessment ID' }, { status: 400 });
    }

    const assessment = await getAssessment(id);

    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }

    // If analysis already exists, return it
    if (assessment.industry_analysis) {
      return NextResponse.json({
        success: true,
        industryAnalysis: assessment.industry_analysis,
        cached: true,
      });
    }

    // Check if we have the required data
    if (!ANTHROPIC_API_KEY || !assessment.company_insights?.company_summary) {
      return NextResponse.json({
        success: false,
        error: 'Cannot generate analysis: missing API key or company insights',
      });
    }

    // Generate the analysis
    const dimensionScores = Object.entries(assessment.dimension_scores || {}).map(
      ([dimension, score]) => ({ dimension, score: score as number })
    );

    const strengthDimensions = dimensionScores
      .filter(d => d.score >= 70)
      .map(d => d.dimension)
      .join(', ');

    const gapDimensions = (assessment.blockers || [])
      .map((b: { dimension: string }) => b.dimension)
      .join(', ');

    const archetype = assessment.archetype || { name: 'Unknown', hook: '' };
    const axisScores = assessment.axis_scores || { vision: 0, ops: 0 };

    const analysisPrompt = `You are analyzing an AI readiness assessment for ${assessment.company_name}.

COMPANY CONTEXT (from website analysis):
${assessment.company_insights.company_summary}

${assessment.company_insights.ai_maturity?.signals ? `Website signals detected:\n${assessment.company_insights.ai_maturity.signals.join('\n')}` : ''}

ASSESSMENT RESULTS:
- Overall AI Readiness: ${assessment.overall_score}/100
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

    // Add timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Anthropic API error:', errorText);
        return NextResponse.json({
          success: false,
          error: 'Failed to generate analysis',
        });
      }

      const data = await response.json();
      const aiContent = data?.content?.[0]?.text;

      if (typeof aiContent !== 'string' || !aiContent.trim()) {
        return NextResponse.json({
          success: false,
          error: 'Empty response from AI',
        });
      }

      const industryAnalysis = aiContent.trim();

      // Save to database
      const updateResult = await updateAssessmentAnalysis(id, industryAnalysis);

      if (!updateResult.success) {
        console.error('Failed to save analysis:', updateResult.error);
        // Still return the analysis even if save failed
      }

      return NextResponse.json({
        success: true,
        industryAnalysis,
        cached: false,
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if ((fetchError as Error).name === 'AbortError') {
        return NextResponse.json({
          success: false,
          error: 'Analysis generation timed out',
        });
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Error generating analysis:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
