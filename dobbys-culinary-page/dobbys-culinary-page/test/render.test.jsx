import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// next/link needs the App Router context to render, so mock it as a plain anchor.
vi.mock('next/link', async () => {
  const { createElement } = await import('react');
  return {
    default: ({ href, children, ...rest }) => createElement('a', { href, ...rest }, children),
  };
});

import LanguageProvider from '../components/LanguageProvider.jsx';
import RecipeImage from '../components/RecipeImage.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import RecipeDetail from '../components/RecipeDetail.jsx';
import CategoryNav from '../components/CategoryNav.jsx';
import SearchBar from '../components/SearchBar.jsx';

const greekSalad = {
  slug: 'greek-salad',
  categoryId: 'salads',
  name: { bg: 'Гръцка салата', en: 'Greek salad' },
  durationMinutes: 15,
  ingredients: [
    { bg: 'Домати', en: 'Tomatoes' },
    { bg: 'Сирене фета', en: 'Feta cheese' },
  ],
  steps: [{ bg: 'Нарежете зеленчуците.', en: 'Cut the vegetables.' }],
  photo: 'greek-salad.jpg',
};

const withProvider = (ui) => render(<LanguageProvider>{ui}</LanguageProvider>);

beforeEach(() => {
  window.localStorage.clear();
});

describe('RecipeImage', () => {
  it('renders the photo from /images', () => {
    render(<RecipeImage photo="greek-salad.jpg" alt="Greek salad" />);
    const img = screen.getByRole('img');
    expect(img.tagName).toBe('IMG');
    expect(img.getAttribute('src')).toBe('/images/greek-salad.jpg');
  });

  it('falls back to a placeholder when the image fails to load', () => {
    render(<RecipeImage photo="missing.jpg" alt="X" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('🍽️')).toBeInTheDocument();
  });

  it('shows the placeholder when no photo is given', () => {
    render(<RecipeImage alt="X" />);
    expect(screen.getByText('🍽️')).toBeInTheDocument();
  });
});

describe('RecipeCard', () => {
  it('shows the name and duration in Bulgarian by default', () => {
    withProvider(<RecipeCard recipe={greekSalad} />);
    expect(screen.getByText('Гръцка салата')).toBeInTheDocument();
    expect(screen.getByText(/15/)).toBeInTheDocument();
    expect(screen.getByText(/мин/)).toBeInTheDocument();
  });

  it('shows the name in English when that language is restored', () => {
    window.localStorage.setItem('dobby-lang', 'en');
    withProvider(<RecipeCard recipe={greekSalad} />);
    expect(screen.getByText('Greek salad')).toBeInTheDocument();
    expect(screen.getByText(/min/)).toBeInTheDocument();
  });

  it('renders the recipe image src', () => {
    withProvider(<RecipeCard recipe={greekSalad} />);
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/greek-salad.jpg');
  });
});

describe('RecipeDetail', () => {
  it('shows required products and preparation steps', () => {
    withProvider(<RecipeDetail recipe={greekSalad} />);
    expect(screen.getByText('Необходими продукти')).toBeInTheDocument();
    expect(screen.getByText('Начин на приготвяне')).toBeInTheDocument();
    expect(screen.getByText('Домати')).toBeInTheDocument();
    expect(screen.getByText('Нарежете зеленчуците.')).toBeInTheDocument();
  });
});

describe('CategoryNav', () => {
  it('renders top-level and nested category links in Bulgarian', () => {
    withProvider(<CategoryNav />);
    expect(screen.getByText('Салати')).toBeInTheDocument();
    expect(screen.getByText('Десерти')).toBeInTheDocument();
    expect(screen.getByText('Сладоледи')).toBeInTheDocument(); // nested Desserts subgroup
  });
});

describe('SearchBar', () => {
  it('calls onChange with the typed value', () => {
    const onChange = vi.fn();
    withProvider(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'salad' } });
    expect(onChange).toHaveBeenCalledWith('salad');
  });
});
