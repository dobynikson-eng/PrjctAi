'use client';

// Module 5 — Localized "back to recipes" link used on the recipe detail page.
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function BackLink() {
  const { t } = useLanguage();
  return (
    <Link href="/" className="text-sm text-rose-600 hover:underline">
      {t('backToRecipes')}
    </Link>
  );
}
