import { Page, View, Text } from '@react-pdf/renderer';
import { whitepaperStyles as styles, colors } from './WhitepaperStyles';

interface WhitepaperCTAProps {
  pageNumber: number;
}

export default function WhitepaperCTA({ pageNumber }: WhitepaperCTAProps) {
  const features = [
    'Honest readiness score across 7 dimensions',
    'Prioritized list of 3-5 high-impact use cases (with ROI estimates)',
    'Governance checklist tailored to your industry (GDPR, EU AI Act, sector-specific)',
    '30/60/90-day execution plan to ship your first use case to production',
  ];

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
      </View>

      {/* CTA Content */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>Ready to Be in the 20%?</Text>
        <Text style={styles.ctaSubtitle}>
          The AI transformation window is real and accelerating.
          The gap between leaders and laggards is widening exponentially.
        </Text>

        {/* CTA Button */}
        <View style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Schedule Your Free Assessment</Text>
        </View>
        <Text style={styles.ctaUrl}>john-ellison.com/ai-transformation</Text>

        {/* Features */}
        <View style={styles.ctaFeatures}>
          <Text style={{
            fontSize: 12,
            fontWeight: 600,
            color: colors.textPrimary,
            marginBottom: 16,
            textAlign: 'center',
          }}>
            Your Free AI Readiness Assessment Includes:
          </Text>

          {features.map((feature, index) => (
            <View key={index} style={styles.ctaFeatureItem}>
              <Text style={styles.ctaCheckmark}>+</Text>
              <Text style={styles.ctaFeatureText}>{feature}</Text>
            </View>
          ))}

          <View style={{
            marginTop: 20,
            padding: 16,
            backgroundColor: colors.white,
            borderRadius: 6,
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 10, color: colors.textMuted, marginBottom: 4 }}>
              Normally valued at $10K - Complimentary for a limited time
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 600, color: colors.violet }}>
              45 minutes. No obligation. Just clarity.
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>john-ellison.com</Text>
        <Text style={styles.pageNumber}>{pageNumber}</Text>
      </View>
    </Page>
  );
}

// References Page
interface Reference {
  source: string;
  title: string;
  details: string;
}

interface ReferencesPageProps {
  references: Reference[];
  pageNumber: number;
}

export function ReferencesPage({ references, pageNumber }: ReferencesPageProps) {
  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
      </View>

      <Text style={{
        fontSize: 20,
        fontWeight: 700,
        color: colors.textPrimary,
        marginBottom: 24,
      }}>
        References & Data Sources
      </Text>

      <View>
        {references.map((ref, index) => (
          <View key={index} style={{
            marginBottom: 12,
            paddingBottom: 12,
            borderBottom: index < references.length - 1 ? `1px solid ${colors.tableBorder}` : 'none',
          }}>
            <Text style={{
              fontSize: 10,
              fontWeight: 600,
              color: colors.textPrimary,
              marginBottom: 4,
            }}>
              {ref.source}
            </Text>
            <Text style={{
              fontSize: 10,
              color: colors.textSecondary,
              marginBottom: 2,
            }}>
              "{ref.title}"
            </Text>
            <Text style={{
              fontSize: 9,
              color: colors.textMuted,
            }}>
              {ref.details}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>john-ellison.com</Text>
        <Text style={styles.pageNumber}>{pageNumber}</Text>
      </View>
    </Page>
  );
}
