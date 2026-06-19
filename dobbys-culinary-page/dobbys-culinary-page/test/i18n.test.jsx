import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { t, getField, normalizeLang, SUPPORTED_LANGS, DEFAULT_LANG } from '../lib/i18n.js';
import LanguageProvider, { useLanguage } from '../components/LanguageProvider.jsx';

describe('t() — UI translation', () => {
  it('returns the Bulgarian label', () => {
    expect(t('requiredProducts', 'bg')).toBe('Необходими продукти');
  });

  it('returns the English label', () => {
    expect(t('requiredProducts', 'en')).toBe('Required products');
  });

  it('falls back to the key when it is unknown', () => {
    expect(t('does-not-exist', 'en')).toBe('does-not-exist');
  });

  it('falls back to the default language for an unsupported lang', () => {
    expect(t('requiredProducts', 'fr')).toBe(t('requiredProducts', DEFAULT_LANG));
  });
});

describe('getField() — bilingual recipe fields', () => {
  const recipe = { name: { bg: 'Гръцка салата', en: 'Greek salad' } };

  it('returns the requested language', () => {
    expect(getField(recipe, 'name', 'en')).toBe('Greek salad');
    expect(getField(recipe, 'name', 'bg')).toBe('Гръцка салата');
  });

  it('falls back to the default language when the requested one is missing', () => {
    const partial = { name: { bg: 'Само БГ' } };
    expect(getField(partial, 'name', 'en')).toBe('Само БГ');
  });

  it('returns an empty string for a missing field or bad input', () => {
    expect(getField(recipe, 'nope', 'en')).toBe('');
    expect(getField(null, 'name', 'en')).toBe('');
  });
});

describe('normalizeLang()', () => {
  it('keeps a supported language', () => {
    expect(normalizeLang('en')).toBe('en');
  });

  it('falls back to the default for an unsupported one', () => {
    expect(normalizeLang('xx')).toBe(DEFAULT_LANG);
    expect(SUPPORTED_LANGS).toContain(normalizeLang('xx'));
  });
});

// A tiny consumer used to exercise the LanguageProvider context.
function Probe() {
  const { lang, toggle, t: tt } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="home">{tt('navHome')}</span>
      <button onClick={toggle}>switch</button>
    </div>
  );
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to Bulgarian and toggles to English', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('lang').textContent).toBe('bg');
    expect(screen.getByTestId('home').textContent).toBe('Начало');

    fireEvent.click(screen.getByText('switch'));

    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('home').textContent).toBe('Home');
  });

  it('persists the chosen language to localStorage', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByText('switch'));
    expect(window.localStorage.getItem('dobby-lang')).toBe('en');
  });

  it('restores a saved language on mount', () => {
    window.localStorage.setItem('dobby-lang', 'en');
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });
});
