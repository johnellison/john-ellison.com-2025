import { NextRequest, NextResponse } from 'next/server';

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || '';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

interface ScrapedContent {
  title?: string;
  description?: string;
  content: string[];
  techStack?: string[];
  aiMentions?: string[];
  leadershipAI?: string[];
  metadata?: {
    favicon?: string;
    ogImage?: string;
    language?: string;
  };
}

async function scrapeCompany(website: string): Promise<ScrapedContent> {
  try {
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: website,
        formats: ['markdown'],
        onlyMainContent: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.status}`);
    }

    const data = await response.json();

    // Firecrawl v1 returns { success: true, data: { markdown, metadata } }
    const scraped = data.data || data;

    return {
      title: scraped.metadata?.title || '',
      description: scraped.metadata?.description || '',
      content: [scraped.markdown || ''],
      metadata: {
        favicon: scraped.metadata?.favicon,
        ogImage: scraped.metadata?.ogImage,
        language: scraped.metadata?.language,
      },
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      content: [],
    };
  }
}

async function analyzeWithAI(content: ScrapedContent, linkedin?: string): Promise<any> {
  try {
    const prompt = `Analyze this company's content and provide insights about their AI maturity.

Content from website:
${content.content.join('\n\n')}

${linkedin ? `\n\nLinkedIn page: ${linkedin}` : ''}

Please analyze and provide a JSON response with:
{
  "company_summary": "brief 2-3 sentence overview",
  "ai_maturity": {
    "score": 0-100,
    "signals": ["signal1", "signal2"],
    "confidence": "high|medium|low"
  },
  "tech_insights": {
    "has_roadmap": true/false,
    "mentions_ai": true/false,
    "ai_use_cases": ["case1", "case2"]
  },
  "readiness_clues": {
    "likely_dimensions": ["Leadership & Strategy", "Data Readiness"],
    "strengths": ["strength1"],
    "gaps": ["gap1"]
  },
  "leadership_team": [
    { "name": "Full Name", "title": "Role/Title", "linkedin": "url if found" }
  ],
  "company_metadata": {
    "employee_range": "estimate if visible (e.g., '50-200', '1000+')",
    "founded_year": "if mentioned",
    "headquarters": "location if found"
  }
}

For leadership_team: Look for About page sections listing executives/team, footer links to LinkedIn profiles, Team/Leadership page content, or founder bios. Return empty array if not found. Do not invent data.

Respond with valid JSON only, no other text.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const aiContent = data?.content?.[0]?.text;

    if (typeof aiContent !== 'string' || !aiContent.trim()) {
      throw new Error('Empty AI response');
    }

    // Strip markdown code blocks if present
    const jsonContent = aiContent.replace(/^```(?:json)?\s*\n?|\n?```$/g, '').trim();
    const parsed = JSON.parse(jsonContent);
    if (!isValidInsights(parsed)) {
      throw new Error('Invalid AI response shape');
    }

    return parsed;
  } catch (error) {
    console.error('AI analysis error:', error);
    return null;
  }
}

function isValidInsights(value: any): boolean {
  if (!value || typeof value !== 'object') return false;

  const aiMaturity = value.ai_maturity;
  const techInsights = value.tech_insights;
  const readinessClues = value.readiness_clues;

  if (typeof value.company_summary !== 'string') return false;
  if (!aiMaturity || typeof aiMaturity !== 'object') return false;
  if (typeof aiMaturity.score !== 'number') return false;
  if (!['high', 'medium', 'low'].includes(aiMaturity.confidence)) return false;
  if (!Array.isArray(aiMaturity.signals)) return false;
  if (!aiMaturity.signals.every((signal: unknown) => typeof signal === 'string')) return false;

  if (!techInsights || typeof techInsights !== 'object') return false;
  if (typeof techInsights.has_roadmap !== 'boolean') return false;
  if (typeof techInsights.mentions_ai !== 'boolean') return false;
  if (!Array.isArray(techInsights.ai_use_cases)) return false;
  if (!techInsights.ai_use_cases.every((useCase: unknown) => typeof useCase === 'string')) return false;

  if (!readinessClues || typeof readinessClues !== 'object') return false;
  if (!Array.isArray(readinessClues.likely_dimensions)) return false;
  if (!Array.isArray(readinessClues.strengths)) return false;
  if (!Array.isArray(readinessClues.gaps)) return false;

  return true;
}

export async function POST(request: NextRequest) {
  try {
    if (!FIRECRAWL_API_KEY || !ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Company analysis is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();

    const { website, linkedin } = body;

    if (!website) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      );
    }

    const scrapedContent = await scrapeCompany(website);

    // Check if we have meaningful content to analyze
    const hasContent = scrapedContent.content.length > 0 &&
      scrapedContent.content.some(c => c && c.trim().length > 50);

    if (!hasContent) {
      return NextResponse.json({
        success: false,
        error: 'Unable to retrieve content from website for analysis',
        scraped: scrapedContent,
      });
    }

    const aiInsights = await analyzeWithAI(scrapedContent, linkedin);

    if (!aiInsights) {
      return NextResponse.json(
        {
          error: 'Failed to analyze company',
          scraped: scrapedContent,
        },
        { status: 500 }
      );
    }

    // Merge scraped metadata into AI insights
    const enrichedInsights = {
      ...aiInsights,
      metadata: {
        ...aiInsights.company_metadata,
        favicon: scrapedContent.metadata?.favicon,
        ogImage: scrapedContent.metadata?.ogImage,
        pageTitle: scrapedContent.title,
        pageDescription: scrapedContent.description,
      },
    };
    // Remove duplicate company_metadata field
    delete enrichedInsights.company_metadata;

    return NextResponse.json({
      success: true,
      scraped: scrapedContent,
      insights: enrichedInsights,
      usage_hint: 'These insights can be used to pre-fill or personalize the AI Readiness Assessment',
    });
  } catch (error) {
    console.error('Company analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
