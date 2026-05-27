import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SolarOS — The Operating System for Solar Companies',
  description: 'Enterprise-grade unified SaaS platform for regional solar companies. AI-powered proposals, design workflows, field operations, social media, and employee management.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23FF6B00'/><circle cx='50' cy='50' r='25' fill='%23FFD60A'/><circle cx='50' cy='50' r='12' fill='%23000'/></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}