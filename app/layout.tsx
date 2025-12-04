import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LaminateAI - Free AI Laminate Tool',
  description: 'Upload plywood photo & try unlimited laminates with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
