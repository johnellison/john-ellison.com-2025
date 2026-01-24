import { Page, View, Text } from '@react-pdf/renderer';
import { whitepaperStyles as styles } from './WhitepaperStyles';

interface TOCItem {
  section: string;
  pages: string;
}

interface WhitepaperTOCProps {
  items: TOCItem[];
}

export default function WhitepaperTOC({ items }: WhitepaperTOCProps) {
  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
      </View>

      {/* Title */}
      <Text style={styles.tocTitle}>Table of Contents</Text>

      {/* TOC Items */}
      <View>
        {items.map((item, index) => (
          <View key={index} style={styles.tocItem}>
            <Text style={styles.tocSection}>{item.section}</Text>
            <Text style={styles.tocPages}>{item.pages}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>john-ellison.com</Text>
        <Text style={styles.pageNumber}>2</Text>
      </View>
    </Page>
  );
}
