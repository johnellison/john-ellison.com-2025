import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Style Guide | John Ellison',
  description: 'A comprehensive guide to John Ellison\'s visual identity including colors, typography, gradients, and design patterns. Brand DNA for consistent creative direction.',
  openGraph: {
    title: 'Brand Style Guide | John Ellison',
    description: 'A comprehensive guide to John Ellison\'s visual identity including colors, typography, gradients, and design patterns.',
    type: 'website',
  },
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
