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
        {/* Prismatic accent */}
        <View style={{
          flexDirection: 'row',
          gap: 4,
          marginBottom: 24,
        }}>
          <View style={{ width: 24, height: 4, backgroundColor: colors.violet, borderRadius: 2 }} />
          <View style={{ width: 24, height: 4, backgroundColor: colors.blue, borderRadius: 2 }} />
          <View style={{ width: 24, height: 4, backgroundColor: colors.teal, borderRadius: 2 }} />
        </View>

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
            color: colors.violet,
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
            backgroundColor: colors.surface,
            borderRadius: 6,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.borderMedium,
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

// References Page - Dark Mode
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

      {/* Title with accent */}
      <View style={{ marginBottom: 24 }}>
        <View style={{
          width: 40,
          height: 3,
          backgroundColor: colors.violet,
          marginBottom: 16,
          borderRadius: 2,
        }} />
        <Text style={{
          fontSize: 20,
          fontWeight: 700,
          color: colors.textPrimary,
        }}>
          References & Data Sources
        </Text>
      </View>

      <View>
        {references.map((ref, index) => (
          <View key={index} style={{
            marginBottom: 12,
            paddingBottom: 12,
            borderBottomWidth: index < references.length - 1 ? 1 : 0,
            borderBottomColor: colors.borderSubtle,
          }}>
            <Text style={{
              fontSize: 10,
              fontWeight: 600,
              color: colors.violet,
              marginBottom: 4,
            }}>
              {ref.source}
            </Text>
            <Text style={{
              fontSize: 10,
              color: colors.textPrimary,
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
