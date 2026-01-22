import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.ttf', fontWeight: 700 },
  ],
});

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    backgroundColor: '#ffffff',
    color: '#1e293b',
  },
  header: {
    marginBottom: 40,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  date: {
    fontSize: 10,
    color: '#94a3b8',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#0f172a',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  
  // Archetype Section
  archetypeCard: {
    padding: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    marginBottom: 32,
  },
  archetypeLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#64748b',
    marginBottom: 8,
  },
  archetypeName: {
    fontSize: 28,
    fontWeight: 700,
    color: '#4f46e5', // Indigo-600
    marginBottom: 8,
  },
  archetypeHook: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#475569',
    marginBottom: 16,
  },
  archetypeDesc: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#334155',
  },

  // Scores
  scoreGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  scoreBox: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
  },
  scoreLabel: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 700,
    color: '#0f172a',
  },

  // Dimensions
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 16,
    marginTop: 32,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dimensionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottom: '1px solid #f1f5f9',
  },
  dimensionName: {
    fontSize: 12,
    color: '#334155',
  },
  dimensionScore: {
    fontSize: 12,
    fontWeight: 600,
    color: '#0f172a',
  },

  // Blockers
  blockerItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fef2f2', // Red-50
    borderRadius: 6,
    borderLeft: '4px solid #ef4444',
  },
  blockerTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#991b1b',
    marginBottom: 4,
  },
  blockerText: {
    fontSize: 10,
    color: '#7f1d1d',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 10,
    color: '#94a3b8',
  },
});
