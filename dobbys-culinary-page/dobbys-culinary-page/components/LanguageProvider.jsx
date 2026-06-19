'use client';

// Module 2 — React context holding the current language (BG/EN), persisting it to
// localStorage, and exposing a toggle plus a bound t() helper.
import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_LANG, normalizeLang, t as translate } from '@/lib/i18n';

const STORAGE_KEY = 'dobby-lang';
const LanguageContext = createContext(null);

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  // Restore the saved language on the client after mount (keeps SSR output stable).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setLangState(normalizeLang(saved));
  }, []);

  function setLang(next) {
    const normalized = normalizeLang(next);
    setLangState(normalized);
    window.localStorage.setItem(STORAGE_KEY, normalized);
  }

  function toggle() {
    setLang(lang === 'bg' ? 'en' : 'bg');
  }

  const value = {
    lang,
    setLang,
    toggle,
    t: (key) => translate(key, lang),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Hook for consuming the language context.
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
