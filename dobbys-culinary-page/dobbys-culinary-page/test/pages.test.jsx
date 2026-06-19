import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next/link', async () => {
  const { createElement } = await import('react');
  return {
    default: ({ href, children, ...rest }) => createElement('a', { href, ...rest }, children),
  };
});

import LanguageProvider from '../components/LanguageProvider.jsx';
import RecipeGrid from '../components/RecipeGrid.jsx';
import CategoryView from '../components/CategoryView.jsx';
import Header from '../components/Header.jsx';

const withProvider = (ui) => render(<LanguageProvider>{ui}</LanguageProvider>);

beforeEach(() => {
  window.localStorage.clear();
});

describe('RecipeGrid', () => {
  it('shows a no-results message for an empty list', () => {
    withProvider(<RecipeGrid recipes={[]} />);
    expect(screen.getByText('Няма намерени рецепти.')).toBeInTheDocument();
  });

  it('renders a card per recipe', () => {
    const list = [
      { slug: 'a', name: { bg: 'Аа', en: 'Aa' }, durationMinutes: 5, photo: 'a.jpg' },
      { slug: 'b', name: { bg: 'Бб', en: 'Bb' }, durationMinutes: 6, photo: 'b.jpg' },
    ];
    withProvider(<RecipeGrid recipes={list} />);
    expect(screen.getByText('Аа')).toBeInTheDocument();
    expect(screen.getByText('Бб')).toBeInTheDocument();
  });
});

describe('CategoryView', () => {
  it('shows a leaf category title and its recipe', () => {
    withProvider(<CategoryView categoryId="salads" />);
    expect(screen.getByText('Салати')).toBeInTheDocument();
    expect(screen.getByText('Гръцка салата')).toBeInTheDocument();
  });

  it('shows all subgroup recipes for the Desserts parent', () => {
    withProvider(<CategoryView categoryId="desserts" />);
    expect(screen.getByText('Десерти')).toBeInTheDocument();
    expect(screen.getByText('Шоколадова торта')).toBeInTheDocument(); // cakes
    expect(screen.getByText('Чия пудинг')).toBeInTheDocument(); // healthy
  });
});

describe('Header', () => {
  it('renders the title and toggles BG -> EN', () => {
    withProvider(<Header />);
    expect(screen.getByText(/Кулинарната страница на Доби/)).toBeInTheDocument();
    expect(screen.getByText('Начало')).toBeInTheDocument();

    fireEvent.click(screen.getByText('EN')); // toggle label shows the language to switch to

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Contacts')).toBeInTheDocument();
  });
});
