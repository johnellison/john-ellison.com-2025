import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { WhitepaperMeta } from '@/lib/whitepaper-content';
import path from 'path';

interface WhitepaperCoverProps {
  meta: WhitepaperMeta;
}

// Absolute path for server-side PDF generation
const coverImagePath = path.join(process.cwd(), 'public', 'images', 'whitepaper-cover-compressed.jpg');

// A4 in points
const W = 595.28;
const H = 841.89;

// Prismatic gradient colors (from design system)
const prism = {
  violet: '#7c3aed',
  blue: '#3b82f6',
  teal: '#2dd4bf',
};

// Warm gradient colors (from design system)
const warm = {
  red: '#ef4444',
  amber: '#f59e0b',
  yellow: '#fcd34d',
};

const s = StyleSheet.create({
  page: {
    width: W,
    height: H,
    fontFamily: 'Inter',
  },
  wrapper: {
    width: W,
    height: H,
    position: 'relative',
  },
  bgContainer: {
    position: 'absolute',
    width: W,
    height: H,
    overflow: 'hidden',
  },
  bgImage: {
    width: W,
    height: H,
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: W,
    height: H,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bar: {
    position: 'absolute',
    top: 0,
    width: W,
    height: 6,
    flexDirection: 'row',
  },
  content: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: W - 100,
    height: H - 100,
  },
});

export default function WhitepaperCover({ meta }: WhitepaperCoverProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.wrapper} wrap={false}>
        {/* Background image */}
        <View style={s.bgContainer}>
          <Image src={coverImagePath} style={s.bgImage} />
        </View>

        {/* Overlay */}
        <View style={s.overlay} />

        {/* Prismatic bar - the main color accent */}
        <View style={s.bar}>
          <View style={{ flex: 1, backgroundColor: prism.violet }} />
          <View style={{ flex: 1, backgroundColor: prism.blue }} />
          <View style={{ flex: 1, backgroundColor: prism.teal }} />
        </View>

        {/* Content */}
        <View style={s.content}>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 3 }}>
            John Ellison
          </Text>

          <View style={{ marginTop: 180 }}>
            <Text style={{ fontSize: 44, fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>
              {meta.title}
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: 32 }}>
              {meta.subtitle}
            </Text>
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, width: 400 }}>
              A comprehensive analysis of enterprise AI adoption, the gap between promise and reality,
              and a practical roadmap for the 6% of organizations achieving measurable transformation.
            </Text>
          </View>

          {/* Stats - clean white with subtle colored underlines */}
          <View style={{ position: 'absolute', bottom: 120, left: 0, right: 0 }}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', padding: 20, borderRadius: 8 }}>
                <Text style={{ fontSize: 32, fontWeight: 700, color: '#ffffff' }}>$4.4T</Text>
                <View style={{ width: 40, height: 3, backgroundColor: prism.violet, marginTop: 8, marginBottom: 8, borderRadius: 2 }} />
                <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Potential AI productivity gains</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', padding: 20, borderRadius: 8 }}>
                <Text style={{ fontSize: 32, fontWeight: 700, color: '#ffffff' }}>95%</Text>
                <View style={{ width: 40, height: 3, backgroundColor: warm.amber, marginTop: 8, marginBottom: 8, borderRadius: 2 }} />
                <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Of AI pilots fail to reach production</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', padding: 20, borderRadius: 8 }}>
                <Text style={{ fontSize: 32, fontWeight: 700, color: '#ffffff' }}>6%</Text>
                <View style={{ width: 40, height: 3, backgroundColor: prism.blue, marginTop: 8, marginBottom: 8, borderRadius: 2 }} />
                <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Achieve 5%+ EBIT impact</Text>
              </View>
            </View>
          </View>

          {/* Meta */}
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)' }}>
            <View>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>By {meta.author}</Text>
              <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>AI Transformation Strategist</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{meta.date}</Text>
              <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Version {meta.version}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}
