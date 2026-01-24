import { Page, View, Text } from '@react-pdf/renderer';
import { whitepaperStyles as styles } from './WhitepaperStyles';
import { ReactNode } from 'react';

interface WhitepaperSectionProps {
  number?: string;
  title: string;
  subtitle?: string;
  pageNumber: number;
  children: ReactNode;
}

export default function WhitepaperSection({
  number,
  title,
  subtitle,
  pageNumber,
  children,
}: WhitepaperSectionProps) {
  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderTitle}>AI Transformation: Optimism vs. Reality</Text>
        <Text style={styles.pageHeaderTitle}>
          {number ? `Section ${number}` : ''}
        </Text>
      </View>

      {/* Section Title with Number */}
      <View style={{ position: 'relative', marginBottom: 24 }}>
        {number && (
          <Text style={styles.sectionNumber}>{number}</Text>
        )}
        <Text style={[styles.sectionTitle, number ? {} : { paddingLeft: 0 }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.sectionSubtitle, number ? {} : { paddingLeft: 0 }]}>{subtitle}</Text>
        )}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {children}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>john-ellison.com</Text>
        <Text style={styles.pageNumber}>{pageNumber}</Text>
      </View>
    </Page>
  );
}

// Subsection component for use within sections
interface SubsectionProps {
  number?: string;
  title: string;
  children: ReactNode;
}

export function Subsection({ number, title, children }: SubsectionProps) {
  return (
    <View style={{ marginTop: 20, marginBottom: 16 }}>
      <Text style={styles.subsectionTitle}>
        {number && <Text style={styles.subsectionNumber}>{number}</Text>}
        {title}
      </Text>
      {children}
    </View>
  );
}

// Paragraph component
export function Paragraph({ children }: { children: ReactNode }) {
  return <Text style={styles.paragraph}>{children}</Text>;
}

// Bullet list component
interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <View style={{ marginVertical: 12 }}>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bulletPoint}>-</Text>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// Divider component
export function Divider({ accent = false }: { accent?: boolean }) {
  return <View style={accent ? styles.dividerAccent : styles.divider} />;
}
