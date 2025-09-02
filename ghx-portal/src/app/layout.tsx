import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });
const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InnovationHub - Connect, Innovate, Grow',
  description: 'Connect, innovate, and grow with InnovationHub - the premier platform for startups, mentors, and innovation',
  keywords: 'innovation, startup, accelerator, mentorship, healthcare, technology, InnovationHub',
  authors: [{ name: 'InnovationHub Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${manrope.className} h-full antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
