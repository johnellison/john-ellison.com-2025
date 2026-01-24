import { Page, View, Text } from '@react-pdf/renderer';
import { whitepaperStyles as styles, colors } from './WhitepaperStyles';
import { WhitepaperMeta } from '@/lib/whitepaper-content';

interface WhitepaperCoverProps {
  meta: WhitepaperMeta;
}

export default function WhitepaperCover({ meta }: WhitepaperCoverProps) {
  return (
    <Page size="A4" style={styles.coverPage}>
      {/* Gradient bar at top */}
      <View style={styles.coverGradientBar} />

      <View style={styles.coverContainer}>
        {/* Logo/Brand */}
        <Text style={styles.coverLogo}>John Ellison</Text>

        {/* Title Section */}
        <View style={styles.coverTitleSection}>
          <Text style={styles.coverTitle}>{meta.title}</Text>
          <Text style={styles.coverSubtitle}>{meta.subtitle}</Text>
          <Text style={styles.coverDescription}>
            A comprehensive analysis of enterprise AI adoption, the gap between promise and reality,
            and a practical roadmap for the 6% of organizations achieving measurable transformation.
          </Text>
        </View>

        {/* Key Stats Preview */}
        <View style={{ marginBottom: 40 }}>
          <View style={{ flexDirection: 'row', gap: 24 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 32, fontWeight: 700, color: colors.violet }}>$4.4T</Text>
              <Text style={{ fontSize: 10, color: colors.textSecondary }}>Potential AI productivity gains</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 32, fontWeight: 700, color: colors.red }}>95%</Text>
              <Text style={{ fontSize: 10, color: colors.textSecondary }}>Of AI pilots fail to reach production</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 32, fontWeight: 700, color: colors.teal }}>6%</Text>
              <Text style={{ fontSize: 10, color: colors.textSecondary }}>Achieve 5%+ EBIT impact</Text>
            </View>
          </View>
        </View>

        {/* Meta Info */}
        <View style={styles.coverMeta}>
          <View>
            <Text style={styles.coverAuthor}>By {meta.author}</Text>
            <Text style={{ fontSize: 10, color: colors.textMuted, marginTop: 4 }}>
              AI Transformation Strategist
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.coverDate}>{meta.date}</Text>
            <Text style={{ fontSize: 10, color: colors.textMuted, marginTop: 4 }}>
              Version {meta.version}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
}
