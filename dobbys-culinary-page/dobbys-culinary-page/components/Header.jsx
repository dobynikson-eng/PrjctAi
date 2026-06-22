'use client';

// Module 5 — Top bar: site title, bilingual nav, and the language toggle.
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function Header() {
  const { t, toggle } = useLanguage();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-[#492f1f] sm:text-4xl">
          🧦 {t('siteTitle')}
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="font-bold text-[#492f1f] hover:text-[#492f1f]/80">{t('navHome')}</Link>
          <Link href="/contacts/" className="font-bold text-[#492f1f] hover:text-[#492f1f]/80">{t('navContacts')}</Link>
          <button
            type="button"
            onClick={toggle}
            aria-label="Switch language"
            className="rounded-full border border-gray-200 px-3 py-1 font-bold text-[#492f1f] hover:border-[#492f1f]/50 hover:text-[#492f1f]/80"
          >
            {t('languageLabel')}
          </button>
        </nav>
      </div>
    </header>
  );
}
