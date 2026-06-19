import './globals.css';
import LanguageProvider from '@/components/LanguageProvider';
import Header from '@/components/Header';

export const metadata = {
  title: "Dobby's Culinary Page",
  description: 'A small, offline, bilingual (BG/EN) recipe site.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-900">
        <LanguageProvider>
          <Header />
          <main className="pb-16">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
