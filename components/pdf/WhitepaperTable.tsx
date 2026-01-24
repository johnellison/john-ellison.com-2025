import { View, Text } from '@react-pdf/renderer';
import { whitepaperStyles as styles, colors } from './WhitepaperStyles';

interface TableColumn {
  key: string;
  header: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

interface WhitepaperTableProps {
  title?: string;
  columns: TableColumn[];
  data: Record<string, string>[];
  striped?: boolean;
  compact?: boolean;
}

export default function WhitepaperTable({
  title,
  columns,
  data,
  striped = true,
  compact = false,
}: WhitepaperTableProps) {
  const cellPadding = compact ? 8 : 10;

  return (
    <View style={{ marginVertical: 16 }}>
      {title && (
        <Text style={{
          fontSize: 12,
          fontWeight: 600,
          color: colors.textPrimary,
          marginBottom: 12,
        }}>
          {title}
        </Text>
      )}

      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          {columns.map((col, index) => (
            <View
              key={index}
              style={[
                styles.tableHeaderCell,
                { width: col.width || `${100 / columns.length}%`, padding: cellPadding },
              ]}
            >
              <Text>{col.header}</Text>
            </View>
          ))}
        </View>

        {/* Data Rows */}
        {data.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={striped && rowIndex % 2 === 1 ? styles.tableRowAlt : styles.tableRow}
          >
            {columns.map((col, colIndex) => (
              <View
                key={colIndex}
                style={[
                  styles.tableCell,
                  {
                    width: col.width || `${100 / columns.length}%`,
                    padding: cellPadding,
                    textAlign: col.align || 'left',
                  },
                ]}
              >
                <Text>{row[col.key] || ''}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

// Maturity Matrix Table with color coding
interface MaturityTableProps {
  title: string;
  headers: string[];
  rows: {
    dimension: string;
    nascent: string;
    emerging: string;
    developing: string;
    advanced: string;
    optimized: string;
  }[];
}

export function MaturityTable({ title, rows }: MaturityTableProps) {
  const levelColors = {
    nascent: colors.maturityNascent,
    emerging: colors.maturityEmerging,
    developing: colors.maturityDeveloping,
    advanced: colors.maturityAdvanced,
    optimized: colors.maturityOptimized,
  };

  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={{
        fontSize: 12,
        fontWeight: 600,
        color: colors.textPrimary,
        marginBottom: 12,
      }}>
        {title}
      </Text>

      <View style={styles.table}>
        {/* Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.tableHeaderCell, { width: '16%' }]}>
            <Text>Dimension</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: '16.8%' }]}>
            <Text>Nascent (1)</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: '16.8%' }]}>
            <Text>Emerging (2)</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: '16.8%' }]}>
            <Text>Developing (3)</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: '16.8%' }]}>
            <Text>Advanced (4)</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: '16.8%' }]}>
            <Text>Optimized (5)</Text>
          </View>
        </View>

        {/* Rows */}
        {rows.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.tableCell, { width: '16%', fontWeight: 600 }]}>
              <Text style={{ fontWeight: 600 }}>{row.dimension}</Text>
            </View>
            <View style={[styles.tableCell, { width: '16.8%', backgroundColor: levelColors.nascent }]}>
              <Text style={{ fontSize: 9 }}>{row.nascent}</Text>
            </View>
            <View style={[styles.tableCell, { width: '16.8%', backgroundColor: levelColors.emerging }]}>
              <Text style={{ fontSize: 9 }}>{row.emerging}</Text>
            </View>
            <View style={[styles.tableCell, { width: '16.8%', backgroundColor: levelColors.developing }]}>
              <Text style={{ fontSize: 9 }}>{row.developing}</Text>
            </View>
            <View style={[styles.tableCell, { width: '16.8%', backgroundColor: levelColors.advanced }]}>
              <Text style={{ fontSize: 9 }}>{row.advanced}</Text>
            </View>
            <View style={[styles.tableCell, { width: '16.8%', backgroundColor: levelColors.optimized }]}>
              <Text style={{ fontSize: 9 }}>{row.optimized}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// Comparison Table (Myth vs Truth)
interface ComparisonRow {
  myth: string;
  truth: string;
}

interface ComparisonTableProps {
  title?: string;
  rows: ComparisonRow[];
}

export function ComparisonTable({ title, rows }: ComparisonTableProps) {
  return (
    <View style={{ marginVertical: 16 }}>
      {title && (
        <Text style={{
          fontSize: 12,
          fontWeight: 600,
          color: colors.textPrimary,
          marginBottom: 16,
        }}>
          {title}
        </Text>
      )}

      <View style={styles.comparisonTable}>
        {rows.map((row, index) => (
          <View key={index} style={styles.comparisonRow}>
            <View style={styles.comparisonMyth}>
              <Text style={[styles.comparisonLabel, styles.comparisonMythLabel]}>Myth</Text>
              <Text style={styles.comparisonText}>{row.myth}</Text>
            </View>
            <View style={styles.comparisonTruth}>
              <Text style={[styles.comparisonLabel, styles.comparisonTruthLabel]}>Truth</Text>
              <Text style={styles.comparisonText}>{row.truth}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// Timeline Comparison Table
interface TimelineRow {
  milestone: string;
  traditional: string;
  midMarket: string;
  agentic: string;
}

interface TimelineTableProps {
  title: string;
  rows: TimelineRow[];
}

export function TimelineTable({ title, rows }: TimelineTableProps) {
  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={{
        fontSize: 12,
        fontWeight: 600,
        color: colors.textPrimary,
        marginBottom: 12,
      }}>
        {title}
      </Text>

      <View style={styles.table}>
        {/* Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.tableHeaderCell, { width: '28%' }]}>
            <Text>Milestone</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: '24%' }]}>
            <Text>Traditional</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: '24%' }]}>
            <Text>Mid-Market</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: '24%', backgroundColor: colors.maturityOptimized }]}>
            <Text>Agentic Platform</Text>
          </View>
        </View>

        {/* Rows */}
        {rows.map((row, index) => (
          <View key={index} style={index % 2 === 1 ? styles.tableRowAlt : styles.tableRow}>
            <View style={[styles.tableCell, { width: '28%' }]}>
              <Text style={{ fontWeight: 500 }}>{row.milestone}</Text>
            </View>
            <View style={[styles.tableCell, { width: '24%' }]}>
              <Text>{row.traditional}</Text>
            </View>
            <View style={[styles.tableCell, { width: '24%' }]}>
              <Text>{row.midMarket}</Text>
            </View>
            <View style={[styles.tableCell, { width: '24%', backgroundColor: '#f0fdf4' }]}>
              <Text style={{ color: colors.green, fontWeight: 500 }}>{row.agentic}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
