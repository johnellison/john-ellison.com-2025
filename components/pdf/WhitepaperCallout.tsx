import { View, Text } from '@react-pdf/renderer';
import { whitepaperStyles as styles, colors } from './WhitepaperStyles';

// Statistic Callout
interface StatCalloutProps {
  value: string;
  label: string;
  source?: string;
}

export function StatCallout({ value, label, source }: StatCalloutProps) {
  return (
    <View style={styles.calloutStat}>
      <Text style={styles.calloutStatValue}>{value}</Text>
      <Text style={styles.calloutStatLabel}>{label}</Text>
      {source && <Text style={styles.calloutStatSource}>Source: {source}</Text>}
    </View>
  );
}

// Quote Callout
interface QuoteCalloutProps {
  quote: string;
  source?: string;
}

export function QuoteCallout({ quote, source }: QuoteCalloutProps) {
  return (
    <View style={styles.calloutQuote}>
      <Text style={styles.calloutQuoteText}>"{quote}"</Text>
      {source && <Text style={styles.calloutQuoteSource}>- {source}</Text>}
    </View>
  );
}

// Warning Callout
interface WarningCalloutProps {
  title: string;
  message: string;
}

export function WarningCallout({ title, message }: WarningCalloutProps) {
  return (
    <View style={styles.calloutWarning}>
      <Text style={styles.calloutWarningTitle}>{title}</Text>
      <Text style={styles.calloutWarningText}>{message}</Text>
    </View>
  );
}

// Stat Grid (multiple stats in a row)
interface StatGridProps {
  stats: { value: string; label: string }[];
}

export function StatGrid({ stats }: StatGridProps) {
  return (
    <View style={styles.statGrid}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

// Key Insights Box
interface InsightBoxProps {
  title: string;
  insights: string[];
}

export function InsightBox({ title, insights }: InsightBoxProps) {
  return (
    <View style={styles.insightBox}>
      <Text style={styles.insightTitle}>{title}</Text>
      {insights.map((insight, index) => (
        <View key={index} style={styles.insightRow}>
          <Text style={styles.insightNumber}>{index + 1}</Text>
          <Text style={styles.insightText}>{insight}</Text>
        </View>
      ))}
    </View>
  );
}

// Executive Summary Card
interface ExecSummaryCardProps {
  headline: string;
  stats: string;
  details: string;
  color?: string;
}

export function ExecSummaryCard({ headline, stats, details, color }: ExecSummaryCardProps) {
  return (
    <View style={styles.execSummaryCard}>
      <Text style={[styles.execSummaryHeadline, color ? { color } : {}]}>{headline}</Text>
      <Text style={styles.execSummaryStats}>{stats}</Text>
      <Text style={styles.execSummaryDetails}>{details}</Text>
    </View>
  );
}

// Funnel Chart
interface FunnelStage {
  stage: string;
  percentage: number;
  description: string;
}

interface FunnelChartProps {
  title?: string;
  stages: FunnelStage[];
}

export function FunnelChart({ title, stages }: FunnelChartProps) {
  const maxWidth = 400;

  return (
    <View style={styles.funnelContainer}>
      {title && (
        <Text style={{
          fontSize: 12,
          fontWeight: 600,
          color: colors.textPrimary,
          marginBottom: 20,
        }}>
          {title}
        </Text>
      )}

      {stages.map((stage, index) => {
        const width = (stage.percentage / 100) * maxWidth;
        const bgColor = index === stages.length - 1 ? colors.violet : colors.blue;
        const opacity = 1 - (index * 0.15);

        return (
          <View key={index} style={styles.funnelStage}>
            <View
              style={[
                styles.funnelBar,
                {
                  width,
                  backgroundColor: bgColor,
                  opacity,
                },
              ]}
            >
              <Text style={styles.funnelLabel}>
                {stage.percentage}% - {stage.stage}
              </Text>
            </View>
            <Text style={styles.funnelPercent}>{stage.description}</Text>
          </View>
        );
      })}
    </View>
  );
}

// Success Factor Card
interface SuccessFactorProps {
  number: number;
  title: string;
  description: string;
  impact: string;
}

export function SuccessFactorCard({ number, title, description, impact }: SuccessFactorProps) {
  return (
    <View style={{
      marginBottom: 16,
      padding: 16,
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderLeft: `4px solid ${colors.violet}`,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <View style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.violet,
          marginRight: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: colors.white, fontSize: 12, fontWeight: 600 }}>{number}</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>{title}</Text>
      </View>
      <Text style={{ fontSize: 10, color: colors.textSecondary, lineHeight: 1.5, marginBottom: 8 }}>
        {description}
      </Text>
      <Text style={{ fontSize: 10, color: colors.teal, fontWeight: 500 }}>
        Impact: {impact}
      </Text>
    </View>
  );
}

// Readiness Score Tier
interface ScoreTierProps {
  range: string;
  level: string;
  recommendation: string;
  isActive?: boolean;
}

export function ScoreTier({ range, level, recommendation, isActive }: ScoreTierProps) {
  return (
    <View style={{
      padding: 16,
      marginBottom: 12,
      backgroundColor: isActive ? colors.violet : colors.surface,
      borderRadius: 8,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 700,
          color: isActive ? colors.white : colors.violet,
        }}>
          {range}
        </Text>
        <Text style={{
          fontSize: 12,
          fontWeight: 500,
          color: isActive ? colors.white : colors.textSecondary,
        }}>
          {level}
        </Text>
      </View>
      <Text style={{
        fontSize: 10,
        color: isActive ? 'rgba(255,255,255,0.9)' : colors.textSecondary,
        lineHeight: 1.5,
      }}>
        {recommendation}
      </Text>
    </View>
  );
}
