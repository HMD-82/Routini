import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'حياتي | Hayati',
  description: 'تطبيقك الشخصي لتنظيم يومياتك ومصاريفك ونشاطاتك بذكاء',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Header />
        <main className="relative z-0 mt-16 px-4 py-6 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
