'use client';

// Module 5 — Home page: tagline, category nav, live search, and the recipe grid.
import { useState } from 'react';
import { recipes } from '@/lib/recipes';
import { searchRecipes } from '@/lib/filter';
import { useLanguage } from '@/components/LanguageProvider';
import CategoryNav from '@/components/CategoryNav';
import SearchBar from '@/components/SearchBar';
import RecipeGrid from '@/components/RecipeGrid';

export default function HomePage() {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState('');
  const visible = searchRecipes(recipes, query, lang);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <p className="mb-6 text-gray-600">{t('tagline')}</p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[12rem_1fr]">
        <aside className="md:border-r md:border-gray-100 md:pr-4">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            {t('categories')}
          </h2>
          <CategoryNav />
        </aside>

        <div>
          <div className="mb-6 max-w-md">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <RecipeGrid recipes={visible} />
        </div>
      </div>
    </div>
  );
}
