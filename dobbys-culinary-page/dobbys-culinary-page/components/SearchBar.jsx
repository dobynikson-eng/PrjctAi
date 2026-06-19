'use client';

// Module 4 — Controlled search input. The parent owns the query value and
// receives every change via onChange; placeholder text follows the language.
import { useLanguage } from './LanguageProvider';

export default function SearchBar({ value, onChange }) {
  const { t } = useLanguage();
  const placeholder = t('searchPlaceholder');

  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
    />
  );
}
