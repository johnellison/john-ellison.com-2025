import { Document, Page, View, Text } from '@react-pdf/renderer';
import { whitepaperStyles as styles, colors } from './WhitepaperStyles';
import WhitepaperCover from './WhitepaperCover';
import WhitepaperTOC from './WhitepaperTOC';
import WhitepaperSection, { Subsection, Paragraph, BulletList, Divider } from './WhitepaperSection';
import WhitepaperTable, { MaturityTable, ComparisonTable, TimelineTable } from './WhitepaperTable';
import { StatCallout, StatGrid, ExecSummaryCard, FunnelChart, InsightBox, SuccessFactorCard, ScoreTier } from './WhitepaperCallout';
import WhitepaperCTA, { ReferencesPage } from './WhitepaperCTA';
import {
  whitepaperMeta,
  tableOfContents,
  executiveSummary,
  maturityModelTable,
  caseStudiesTable,
  industryROIData,
  funnelData,
  barriersTable,
  mythVsTruthTable,
  productivityImpacts,
  useCaseTiers,
  readinessFramework,
  criticalSuccessFactors,
  timelineComparisonTable,
  implementationRoadmap,
  highPerformerProfile,
  readinessDiagnostic,
  governanceChecklist,
  recommendationsByScore,
  references,
} from '@/lib/whitepaper-content';

export default function WhitepaperPDF() {
  return (
    <Document
      title="AI Transformation: Optimism vs. Reality"
      author="John Ellison"
      subject="Enterprise AI Adoption Analysis"
      keywords="AI transformation, enterprise AI, digital transformation, AI strategy"
    >
      {/* Page 1: Cover */}
      <WhitepaperCover meta={whitepaperMeta} />

      {/* Page 2: Table of Contents */}
      <WhitepaperTOC items={tableOfContents} />

      {/* Pages 3-4: Executive Summary */}
      <WhitepaperSection title="Executive Summary" pageNumber={3}>
        <Text style={styles.paragraph}>
          Three years after generative AI entered mainstream use, organizations face a stark choice:
          transform meaningfully or stall indefinitely. The evidence is unambiguous.
        </Text>

        <ExecSummaryCard
          headline="The Opportunity"
          stats={executiveSummary.opportunity.stats}
          details={executiveSummary.opportunity.details}
          color={colors.teal}
        />

        <ExecSummaryCard
          headline="The Reality"
          stats={executiveSummary.reality.stats}
          details={executiveSummary.reality.details}
          color={colors.red}
        />

        <ExecSummaryCard
          headline="The Divide"
          stats={executiveSummary.divide.stats}
          details={executiveSummary.divide.details}
          color={colors.violet}
        />

        <InsightBox
          title="Four Critical Questions"
          insights={executiveSummary.questions}
        />
      </WhitepaperSection>

      {/* Pages 5-8: Section 1 - Framing AI Transformation */}
      <WhitepaperSection number="1" title="Framing AI Transformation" pageNumber={5}>
        <Subsection number="1.1" title="What 'AI Transformation' Means">
          <Paragraph>
            AI transformation is the fundamental redesign of business processes, workflows, and operating
            models to embed AI decision-making, automation, and augmentation into core functions.
            It differs materially from automation, analytics modernization, and GenAI copilots.
          </Paragraph>

          <Text style={styles.subsectionTitle}>True AI Transformation Involves:</Text>
          <BulletList items={[
            'Workflow redesign: Reimagining processes end-to-end, not bolting AI onto existing steps',
            'Organizational integration: Embedding AI into daily operations, not experimental silos',
            'Decision democratization: Enabling faster, data-driven decisions at scale',
            'Continuous learning loops: Building systems that adapt based on outcomes',
          ]} />
        </Subsection>

        <Subsection number="1.2" title="Maturity Models">
          <Paragraph>
            Most organizations measure AI readiness across six dimensions. Research shows only ~33% of
            mid-market and large enterprises have scaled AI beyond pilot phases, while 6% qualify as
            "high performers" achieving 5%+ EBIT impact.
          </Paragraph>
        </Subsection>
      </WhitepaperSection>

      {/* Maturity Matrix Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
          <Text style={{ fontSize: 9, color: colors.violet, textTransform: 'uppercase', letterSpacing: 2 }}>Section 1</Text>
        </View>

        <MaturityTable
          title={maturityModelTable.title}
          headers={maturityModelTable.headers}
          rows={maturityModelTable.rows}
        />

        <StatGrid stats={[
          { value: '33%', label: 'Have scaled AI beyond pilot phases' },
          { value: '6%', label: 'Qualify as "high performers"' },
          { value: '5%+', label: 'EBIT impact achieved by top tier' },
          { value: '94%', label: 'Remain in experimentation' },
        ]} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>6</Text>
        </View>
      </Page>

      {/* Pages 9-14: Section 2 - The Promise */}
      <WhitepaperSection number="2" title="The Promise: What AI Can Unlock" pageNumber={9}>
        <Subsection number="2.1" title="Quantified Productivity Impacts">
          <Paragraph>
            Evidence from real deployments shows consistent productivity gains across functions.
          </Paragraph>

          {productivityImpacts.categories.map((category, idx) => (
            <View key={idx} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 12, fontWeight: 600, color: colors.violet, marginBottom: 8 }}>
                {category.category}
              </Text>
              {category.impacts.map((impact, i) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: 700, color: colors.teal, width: 60 }}>
                    {impact.metric}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 10, color: colors.textSecondary }}>
                    {impact.description}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </Subsection>
      </WhitepaperSection>

      {/* Case Studies Table Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
          <Text style={{ fontSize: 9, color: colors.violet, textTransform: 'uppercase', letterSpacing: 2 }}>Section 2</Text>
        </View>

        <WhitepaperTable
          title={caseStudiesTable.title}
          columns={[
            { key: 'company', header: 'Company', width: '15%' },
            { key: 'industry', header: 'Industry', width: '12%' },
            { key: 'useCase', header: 'Use Case', width: '25%' },
            { key: 'outcome', header: 'Outcome', width: '33%' },
            { key: 'timeline', header: 'Timeline', width: '15%' },
          ]}
          data={caseStudiesTable.rows}
        />

        <Text style={styles.subsectionTitle}>Industry-Specific ROI Ranges</Text>
        <View style={{ marginTop: 12 }}>
          {industryROIData.data.map((item, idx) => (
            <View key={idx} style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center' }}>
              <Text style={{ width: 120, fontSize: 10, color: colors.textPrimary }}>{item.function}</Text>
              <View style={{ flex: 1, height: 24, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' }}>
                <View style={{
                  width: `${item.revenueIncrease}%`,
                  height: '100%',
                  backgroundColor: colors.violet,
                  justifyContent: 'center',
                  paddingLeft: 8,
                }}>
                  <Text style={{ fontSize: 9, color: colors.white, fontWeight: 600 }}>
                    {item.revenueIncrease}% report revenue increase
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>10</Text>
        </View>
      </Page>

      {/* Use Case Tiers Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
          <Text style={{ fontSize: 9, color: colors.violet, textTransform: 'uppercase', letterSpacing: 2 }}>Section 2</Text>
        </View>

        <Text style={styles.subsectionTitle}>Which Use Cases Deliver Value First?</Text>

        {useCaseTiers.tiers.map((tier, idx) => (
          <View key={idx} style={{
            marginBottom: 16,
            padding: 16,
            backgroundColor: idx === 0 ? 'rgba(45,212,191,0.1)' : colors.surface,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: idx === 0 ? 'rgba(45,212,191,0.3)' : colors.borderMedium,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: 600, color: colors.textPrimary }}>{tier.tier}</Text>
              <Text style={{ fontSize: 10, color: colors.violet, fontWeight: 500 }}>{tier.timeline}</Text>
            </View>
            {tier.examples.map((example, i) => (
              <Text key={i} style={{ fontSize: 10, color: colors.textSecondary, marginBottom: 4 }}>
                - {example}
              </Text>
            ))}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>14</Text>
        </View>
      </Page>

      {/* Pages 15-21: Section 3 - The Reality */}
      <WhitepaperSection number="3" title="The Reality: Why Most Initiatives Fail" pageNumber={15}>
        <Subsection number="3.1" title="Failure Rates: The Evidence">
          <Paragraph>
            The "95% fail" statistic traces to MIT's 2025 GenAI study of 150 executive interviews,
            350 employee surveys, and 300 public AI deployments. "Failure" is defined as pilots that
            don't advance to production, initiatives delivering little to no measurable impact, or
            projects abandoned or indefinitely stalled.
          </Paragraph>

          <StatGrid stats={[
            { value: '70-85%', label: 'Fail to meet expected outcomes (NTT Data, Gartner)' },
            { value: '85%', label: 'Of AI models fail due to poor data quality' },
            { value: '40%', label: 'Of agentic AI projects will be canceled by 2027' },
            { value: '42%', label: 'Of companies abandoned AI initiatives in 2025' },
          ]} />
        </Subsection>

        <Subsection number="3.2" title="The Pilot-to-Production Funnel">
          <FunnelChart stages={funnelData.stages} />
        </Subsection>
      </WhitepaperSection>

      {/* Top Barriers Table Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
          <Text style={{ fontSize: 9, color: colors.violet, textTransform: 'uppercase', letterSpacing: 2 }}>Section 3</Text>
        </View>

        <Text style={styles.subsectionTitle}>Top 10 AI Adoption Barriers</Text>

        <WhitepaperTable
          columns={[
            { key: 'rank', header: '#', width: '5%' },
            { key: 'barrier', header: 'Barrier', width: '20%' },
            { key: 'affected', header: '% Affected', width: '12%' },
            { key: 'rootCause', header: 'Root Cause', width: '30%' },
            { key: 'impact', header: 'Impact', width: '33%' },
          ]}
          data={barriersTable.rows}
          compact
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>17</Text>
        </View>
      </Page>

      {/* Learning Gap Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
          <Text style={{ fontSize: 9, color: colors.violet, textTransform: 'uppercase', letterSpacing: 2 }}>Section 3</Text>
        </View>

        <Text style={styles.subsectionTitle}>"Learning Gap" vs. "Model Gap": The Core Issue</Text>

        <Paragraph>
          MIT's research identifies the fundamental misconception that drives most failures.
        </Paragraph>

        <View style={{ flexDirection: 'row', gap: 16, marginVertical: 20 }}>
          <View style={{
            flex: 1,
            padding: 20,
            backgroundColor: 'rgba(239,68,68,0.1)',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'rgba(239,68,68,0.2)',
          }}>
            <Text style={{ fontSize: 10, fontWeight: 600, color: colors.red, marginBottom: 8 }}>INDUSTRY BELIEF</Text>
            <Text style={{ fontSize: 11, color: colors.textPrimary }}>
              The problem is model quality - we need better LLMs.
            </Text>
          </View>
          <View style={{
            flex: 1,
            padding: 20,
            backgroundColor: 'rgba(34,197,94,0.1)',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'rgba(34,197,94,0.2)',
          }}>
            <Text style={{ fontSize: 10, fontWeight: 600, color: colors.green, marginBottom: 8 }}>REALITY</Text>
            <Text style={{ fontSize: 11, color: colors.textPrimary }}>
              The problem is a "learning gap." Generic tools work for individuals but fail in enterprise.
            </Text>
          </View>
        </View>

        <InsightBox
          title="Success Requires"
          insights={[
            'Embedding AI into actual workflows (not sandbox testing)',
            'Collecting and acting on feedback loops',
            'Continuous retraining on domain-specific data',
            'Human-in-the-loop validation and learning',
          ]}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>21</Text>
        </View>
      </Page>

      {/* Pages 22-27: Section 4 - Operating Models */}
      <WhitepaperSection number="4" title="Operating Models & Governance" pageNumber={22}>
        <Subsection number="4.1" title="AI Readiness Assessment Framework">
          <Paragraph>
            Organizations successfully scaling AI typically assess readiness across seven pillars.
          </Paragraph>

          {readinessFramework.pillars.map((pillar, idx) => (
            <View key={idx} style={{
              flexDirection: 'row',
              marginBottom: 12,
              padding: 12,
              backgroundColor: colors.surface,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: colors.borderMedium,
            }}>
              <View style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: colors.violet,
                marginRight: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: colors.white, fontSize: 12, fontWeight: 600 }}>{pillar.number}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, fontWeight: 600, color: colors.textPrimary, marginBottom: 4 }}>
                  {pillar.name}
                </Text>
                <Text style={{ fontSize: 9, color: colors.textSecondary }}>{pillar.description}</Text>
                <Text style={{ fontSize: 9, color: colors.teal, marginTop: 4 }}>{pillar.keyMetric}</Text>
              </View>
            </View>
          ))}
        </Subsection>
      </WhitepaperSection>

      {/* Pages 28-31: Section 5 - Implementation Roadmap */}
      <WhitepaperSection number="5" title="Implementation Roadmap" pageNumber={28}>
        <Subsection number="5.1" title="Phased Implementation">
          <View style={styles.timelineContainer}>
            {implementationRoadmap.phases.map((phase, idx) => (
              <View key={idx} style={styles.timelinePhase}>
                <View style={styles.timelineLeft}>
                  <Text style={styles.timelineNumber}>{phase.phase}</Text>
                  {idx < implementationRoadmap.phases.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{phase.name}</Text>
                  <Text style={styles.timelineTimeline}>{phase.timeline}</Text>
                  <View style={styles.timelineActivities}>
                    {phase.activities.map((activity, i) => (
                      <Text key={i} style={{ fontSize: 9, color: colors.textSecondary, marginBottom: 2 }}>
                        - {activity}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.timelineDeliverable}>Deliverable: {phase.deliverable}</Text>
                </View>
              </View>
            ))}
          </View>
        </Subsection>
      </WhitepaperSection>

      {/* Timeline Comparison Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
          <Text style={{ fontSize: 9, color: colors.violet, textTransform: 'uppercase', letterSpacing: 2 }}>Section 5</Text>
        </View>

        <TimelineTable
          title={timelineComparisonTable.title}
          rows={timelineComparisonTable.rows}
        />

        <InsightBox
          title="Key Accelerators"
          insights={[
            'Off-the-shelf models & managed platforms: 40% timeline reduction',
            'Clean, accessible data: 40% timeline reduction',
            'Strong executive sponsorship: 20-30% reduction',
            'Agentic AI platforms: 75% faster deployment',
          ]}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>30</Text>
        </View>
      </Page>

      {/* Pages 32-34: Section 6 - Case Studies */}
      <WhitepaperSection number="6" title="Case Studies: High Performers vs. Laggards" pageNumber={32}>
        <Subsection number="6.1" title="High Performer Profile (6% of Enterprises)">
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 10, fontWeight: 600, color: colors.violet, marginBottom: 12 }}>
              CHARACTERISTICS
            </Text>
            {highPerformerProfile.characteristics.map((char, idx) => (
              <View key={idx} style={{ flexDirection: 'row', marginBottom: 6 }}>
                <Text style={{ color: colors.teal, marginRight: 8 }}>+</Text>
                <Text style={{ fontSize: 10, color: colors.textPrimary, flex: 1 }}>{char}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 10, fontWeight: 600, color: colors.green, marginBottom: 12 }}>
              OUTCOMES
            </Text>
            {highPerformerProfile.outcomes.map((outcome, idx) => (
              <View key={idx} style={{ flexDirection: 'row', marginBottom: 6 }}>
                <Text style={{ color: colors.green, marginRight: 8 }}>+</Text>
                <Text style={{ fontSize: 10, color: colors.textPrimary, flex: 1 }}>{outcome}</Text>
              </View>
            ))}
          </View>
        </Subsection>

        <Subsection number="6.2" title="Laggard Profile (94% of Enterprises)">
          <BulletList items={[
            'AI viewed as tool to optimize existing processes (cost reduction first)',
            'Pilots remain disconnected from workflows; never embedded operationally',
            'No clear business case; ROI unclear or not measured',
            'Governance absent or reactive',
            'Leaders not actively championing AI',
          ]} />
        </Subsection>
      </WhitepaperSection>

      {/* Pages 35-36: Section 7 - Critical Success Factors */}
      <WhitepaperSection number="7" title="Critical Success Factors" pageNumber={35}>
        <Paragraph>
          Based on analysis of 50+ successful AI transformations, the following factors most strongly
          correlate with measurable business impact.
        </Paragraph>

        {criticalSuccessFactors.slice(0, 4).map((factor) => (
          <SuccessFactorCard
            key={factor.number}
            number={factor.number}
            title={factor.title}
            description={factor.description}
            impact={factor.impact}
          />
        ))}
      </WhitepaperSection>

      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
          <Text style={{ fontSize: 9, color: colors.violet, textTransform: 'uppercase', letterSpacing: 2 }}>Section 7</Text>
        </View>

        {criticalSuccessFactors.slice(4).map((factor) => (
          <SuccessFactorCard
            key={factor.number}
            number={factor.number}
            title={factor.title}
            description={factor.description}
            impact={factor.impact}
          />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>36</Text>
        </View>
      </Page>

      {/* Pages 37-38: Section 8 - AI Readiness Diagnostic */}
      <WhitepaperSection number="8" title="AI Readiness Diagnostic" pageNumber={37}>
        <Paragraph>
          Self-assessment tool (30 minutes) to evaluate your organization's AI readiness across seven dimensions.
        </Paragraph>

        {readinessDiagnostic.dimensions.map((dimension, idx) => (
          <View key={idx} style={{
            marginBottom: 12,
            padding: 12,
            backgroundColor: colors.surface,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: colors.borderMedium,
          }}>
            <Text style={{ fontSize: 11, fontWeight: 600, color: colors.violet, marginBottom: 8 }}>
              Dimension {idx + 1}: {dimension.name}
            </Text>
            {dimension.questions.map((q, i) => (
              <Text key={i} style={{ fontSize: 9, color: colors.textSecondary, marginBottom: 4 }}>
                - {q}
              </Text>
            ))}
          </View>
        ))}
      </WhitepaperSection>

      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
          <Text style={{ fontSize: 9, color: colors.violet, textTransform: 'uppercase', letterSpacing: 2 }}>Section 8</Text>
        </View>

        <Text style={styles.subsectionTitle}>Scoring Guide</Text>

        {readinessDiagnostic.scoringGuide.map((tier, idx) => (
          <ScoreTier
            key={idx}
            range={tier.range}
            level={tier.level}
            recommendation={tier.recommendation}
          />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>38</Text>
        </View>
      </Page>

      {/* Page 39: Section 9 - Governance Checklist */}
      <WhitepaperSection number="9" title="Governance & Compliance Checklist" pageNumber={39}>
        <Paragraph>
          Before deploying any AI system to production, enterprises should validate the following.
        </Paragraph>

        <View style={styles.checklist}>
          {governanceChecklist.categories.map((category, idx) => (
            <View key={idx} style={styles.checklistCategory}>
              <Text style={styles.checklistCategoryTitle}>{category.category}</Text>
              {category.items.map((item, i) => (
                <View key={i} style={styles.checklistItem}>
                  <View style={styles.checklistBox} />
                  <Text style={styles.checklistText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </WhitepaperSection>

      {/* Myth vs Truth Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
        </View>

        <ComparisonTable
          title={mythVsTruthTable.title}
          rows={mythVsTruthTable.rows.slice(0, 3)}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>40</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
        </View>

        <ComparisonTable rows={mythVsTruthTable.rows.slice(3)} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>41</Text>
        </View>
      </Page>

      {/* Recommendations by Score */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
          <Text style={{ fontSize: 9, color: colors.violet, textTransform: 'uppercase', letterSpacing: 2 }}>Conclusion</Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{
            width: 40,
            height: 3,
            backgroundColor: colors.violet,
            marginBottom: 16,
            borderRadius: 2,
          }} />
          <Text style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary }}>
            Recommendations by Readiness Score
          </Text>
        </View>

        {recommendationsByScore.map((rec, idx) => (
          <View key={idx} style={{
            marginBottom: 16,
            padding: 20,
            backgroundColor: colors.surface,
            borderRadius: 8,
            borderLeftWidth: 4,
            borderLeftColor: idx === 0 ? colors.red : idx === 1 ? colors.amber : colors.green,
            borderWidth: 1,
            borderColor: colors.borderMedium,
          }}>
            <Text style={{ fontSize: 16, fontWeight: 700, color: colors.textPrimary, marginBottom: 8 }}>
              Score {rec.scoreRange}
            </Text>
            <Text style={{ fontSize: 10, color: colors.textSecondary, marginBottom: 4 }}>
              <Text style={{ fontWeight: 600, color: colors.textPrimary }}>Priority: </Text>{rec.priority}
            </Text>
            <Text style={{ fontSize: 10, color: colors.textSecondary, marginBottom: 4 }}>
              <Text style={{ fontWeight: 600, color: colors.textPrimary }}>Quick Wins: </Text>{rec.quickWins || rec.agenda}
            </Text>
            {rec.defer && (
              <Text style={{ fontSize: 10, color: colors.textMuted }}>
                <Text style={{ fontWeight: 600 }}>Defer: </Text>{rec.defer}
              </Text>
            )}
            {rec.outcome && (
              <Text style={{ fontSize: 10, color: colors.teal, marginTop: 4 }}>
                <Text style={{ fontWeight: 600 }}>Target Outcome: </Text>{rec.outcome}
              </Text>
            )}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>john-ellison.com</Text>
          <Text style={styles.pageNumber}>42</Text>
        </View>
      </Page>

      {/* References Page */}
      <ReferencesPage references={references} pageNumber={43} />

      {/* CTA Page */}
      <WhitepaperCTA pageNumber={44} />
    </Document>
  );
}
