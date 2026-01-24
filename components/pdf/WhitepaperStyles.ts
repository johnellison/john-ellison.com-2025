import { StyleSheet } from '@react-pdf/renderer';

// Import font registration from PDFStyles (fonts are registered there)
import './PDFStyles';

// === DESIGN SYSTEM COLORS ===
// Prismatic gradient: #7c3aed → #3b82f6 → #2dd4bf
// Warm gradient: #ef4444 → #f59e0b → #fcd34d

export const colors = {
  // Backgrounds (warm paper tones)
  white: '#ffffff',
  paper: '#faf9f7',           // Warm paper color
  surface: '#f5f4f2',         // Cards, elevated surfaces
  surfaceAlt: '#efeee9',      // Alternate surface

  // Text
  textPrimary: '#1a1a1a',     // Near black
  textSecondary: '#4a4a4a',   // Dark gray
  textMuted: '#7a7a7a',       // Medium gray
  textLight: '#a0a0a0',       // Light gray

  // Prismatic Gradient (primary brand colors)
  violet: '#7c3aed',
  blue: '#3b82f6',
  teal: '#2dd4bf',

  // Warm Gradient (for warnings, alerts, emphasis)
  red: '#ef4444',
  amber: '#f59e0b',
  yellow: '#fcd34d',

  // Legacy alias (use amber instead)
  green: '#f59e0b',           // Mapped to amber - no bright green in design system

  // Borders
  borderSubtle: '#e5e4e0',
  borderMedium: '#d0cfcb',

  // Table colors
  tableHeader: '#f0efeb',
  tableBorder: '#e5e4e0',
  tableRowAlt: '#faf9f7',

  // Maturity levels (using design system tints)
  maturityNascent: '#fef2f2',     // Light red tint
  maturityEmerging: '#fef3c7',    // Light amber tint
  maturityDeveloping: '#fef9c3',  // Light yellow tint
  maturityAdvanced: '#e0f2fe',    // Light blue tint (was green)
  maturityOptimized: '#f3e8ff',   // Light violet tint (was cyan)
};

export const whitepaperStyles = StyleSheet.create({
  // === PAGE LAYOUTS ===
  page: {
    padding: 50,
    paddingBottom: 70,
    fontFamily: 'Inter',
    backgroundColor: colors.paper,
    color: colors.textPrimary,
    fontSize: 11,
    lineHeight: 1.6,
  },
  coverPage: {
    padding: 0,
    fontFamily: 'Inter',
    backgroundColor: colors.paper,
    color: colors.textPrimary,
  },

  // === COVER PAGE ===
  coverContainer: {
    flex: 1,
    padding: 60,
    justifyContent: 'space-between',
  },
  coverGradientBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    flexDirection: 'row',
  },
  coverLogo: {
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 80,
  },
  coverTitleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 700,
    color: colors.textPrimary,
    marginBottom: 16,
    letterSpacing: -1,
  },
  coverSubtitle: {
    fontSize: 24,
    fontWeight: 500,
    color: colors.violet,
    marginBottom: 40,
  },
  coverDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 1.7,
    maxWidth: 400,
  },
  coverMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 40,
    borderTop: `1px solid ${colors.tableBorder}`,
  },
  coverAuthor: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  coverDate: {
    fontSize: 12,
    color: colors.textMuted,
  },

  // === TABLE OF CONTENTS ===
  tocTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.textPrimary,
    marginBottom: 40,
  },
  tocItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottom: `1px solid ${colors.tableBorder}`,
  },
  tocSection: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: 500,
  },
  tocPages: {
    fontSize: 12,
    color: colors.violet,
  },

  // === HEADERS ===
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottom: `1px solid ${colors.tableBorder}`,
  },
  pageHeaderTitle: {
    fontSize: 9,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  // === SECTION TITLES ===
  sectionNumber: {
    fontSize: 48,
    fontWeight: 700,
    color: colors.surfaceAlt,
    position: 'absolute',
    top: -10,
    left: -5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.textPrimary,
    marginBottom: 8,
    paddingLeft: 40,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 30,
    paddingLeft: 40,
  },

  // === SUBSECTION ===
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.textPrimary,
    marginTop: 24,
    marginBottom: 12,
  },
  subsectionNumber: {
    color: colors.violet,
    marginRight: 8,
  },

  // === BODY TEXT ===
  paragraph: {
    fontSize: 11,
    color: colors.textPrimary,
    lineHeight: 1.7,
    marginBottom: 12,
  },
  paragraphSecondary: {
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 1.6,
    marginBottom: 10,
  },

  // === LISTS ===
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 16,
  },
  bulletPoint: {
    width: 16,
    fontSize: 11,
    color: colors.violet,
  },
  listText: {
    flex: 1,
    fontSize: 11,
    color: colors.textPrimary,
    lineHeight: 1.5,
  },

  // === TABLES ===
  table: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: colors.tableBorder,
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.tableHeader,
    borderBottomWidth: 2,
    borderBottomColor: colors.tableBorder,
  },
  tableHeaderCell: {
    padding: 10,
    fontSize: 10,
    fontWeight: 600,
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.tableBorder,
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.tableBorder,
    backgroundColor: colors.tableRowAlt,
  },
  tableCell: {
    padding: 10,
    fontSize: 10,
    color: colors.textPrimary,
    lineHeight: 1.4,
  },
  tableCellMuted: {
    padding: 10,
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 1.4,
  },

  // === CALLOUTS ===
  calloutStat: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 24,
    marginVertical: 16,
    borderLeft: `4px solid ${colors.violet}`,
  },
  calloutStatValue: {
    fontSize: 36,
    fontWeight: 700,
    color: colors.violet,
    marginBottom: 8,
  },
  calloutStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 1.5,
  },
  calloutStatSource: {
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 8,
  },

  calloutQuote: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 24,
    marginVertical: 16,
    borderLeft: `4px solid ${colors.teal}`,
  },
  calloutQuoteText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 1.6,
    marginBottom: 8,
  },
  calloutQuoteSource: {
    fontSize: 10,
    color: colors.textMuted,
  },

  calloutWarning: {
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 20,
    marginVertical: 16,
    borderLeft: `4px solid ${colors.red}`,
  },
  calloutWarningTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.red,
    marginBottom: 8,
  },
  calloutWarningText: {
    fontSize: 10,
    color: '#7f1d1d',
    lineHeight: 1.5,
  },

  // === KEY INSIGHTS BOX ===
  insightBox: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 20,
    marginVertical: 16,
  },
  insightTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.violet,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  insightNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.violet,
    color: colors.white,
    fontSize: 10,
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 11,
    color: colors.textPrimary,
    lineHeight: 1.5,
  },

  // === STAT GRID ===
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    gap: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 20,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.violet,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 1.4,
  },

  // === FUNNEL CHART ===
  funnelContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  funnelStage: {
    marginBottom: 8,
    alignItems: 'center',
  },
  funnelBar: {
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  funnelLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: colors.white,
  },
  funnelPercent: {
    fontSize: 8,
    color: colors.textMuted,
    marginTop: 4,
  },

  // === FOOTER ===
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${colors.tableBorder}`,
    paddingTop: 15,
  },
  footerText: {
    fontSize: 9,
    color: colors.textMuted,
  },
  pageNumber: {
    fontSize: 9,
    color: colors.violet,
  },

  // === CTA PAGE ===
  ctaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 400,
    lineHeight: 1.6,
  },
  ctaButton: {
    backgroundColor: colors.violet,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginBottom: 24,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.white,
  },
  ctaUrl: {
    fontSize: 12,
    color: colors.violet,
  },
  ctaFeatures: {
    marginTop: 40,
    padding: 24,
    backgroundColor: colors.surface,
    borderRadius: 8,
    width: '100%',
  },
  ctaFeatureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ctaCheckmark: {
    fontSize: 12,
    color: colors.teal,
    marginRight: 12,
    fontWeight: 700,
  },
  ctaFeatureText: {
    flex: 1,
    fontSize: 11,
    color: colors.textPrimary,
  },

  // === COMPARISON TABLE (Myth vs Truth) ===
  comparisonTable: {
    marginVertical: 20,
  },
  comparisonRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  comparisonMyth: {
    flex: 1,
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  comparisonTruth: {
    flex: 1,
    backgroundColor: '#e0f2fe',    // Light blue tint (from prismatic)
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  comparisonLabel: {
    fontSize: 9,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  comparisonMythLabel: {
    color: colors.red,
  },
  comparisonTruthLabel: {
    color: colors.blue,
  },
  comparisonText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: colors.textPrimary,
  },

  // === TIMELINE ===
  timelineContainer: {
    marginVertical: 20,
  },
  timelinePhase: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineLeft: {
    width: 80,
    alignItems: 'center',
  },
  timelineNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.violet,
    color: colors.white,
    fontSize: 14,
    fontWeight: 700,
    textAlign: 'center',
    lineHeight: 32,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.tableBorder,
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 20,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  timelineTimeline: {
    fontSize: 10,
    color: colors.violet,
    marginBottom: 8,
  },
  timelineActivities: {
    marginBottom: 8,
  },
  timelineDeliverable: {
    fontSize: 10,
    color: colors.teal,
  },

  // === CHECKLIST ===
  checklist: {
    marginVertical: 16,
  },
  checklistCategory: {
    marginBottom: 20,
  },
  checklistCategoryTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.violet,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: `1px solid ${colors.tableBorder}`,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 8,
  },
  checklistBox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: colors.tableBorder,
    borderRadius: 2,
    marginRight: 12,
    marginTop: 1,
  },
  checklistText: {
    flex: 1,
    fontSize: 10,
    color: colors.textPrimary,
    lineHeight: 1.5,
  },

  // === EXECUTIVE SUMMARY ===
  execSummaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
  },
  execSummaryHeadline: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.violet,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  execSummaryStats: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  execSummaryDetails: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 1.5,
  },

  // === DIVIDER ===
  divider: {
    height: 1,
    backgroundColor: colors.tableBorder,
    marginVertical: 24,
  },
  dividerAccent: {
    height: 3,
    backgroundColor: colors.violet,
    marginVertical: 24,
    width: 60,
  },
});

export default whitepaperStyles;
