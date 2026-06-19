'use client';

// Module 5 — Category page body: localized title + the recipes in that category
// (a leaf shows its own recipes; a parent like "desserts" shows all subgroups).
import { useLanguage } from './LanguageProvider';
import { getField } from '@/lib/i18n';
import { filterByCategory, findCategory } from '@/lib/filter';
import { recipes } from '@/lib/recipes';
import RecipeGrid from './RecipeGrid';

export default function CategoryView({ categoryId }) {
  const { lang, t } = useLanguage();
  const category = findCategory(categoryId);
  const list = filterByCategory(recipes, categoryId);
  const title = category ? getField(category, 'name', lang) : t('allRecipes');

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">{title}</h1>
      <RecipeGrid recipes={list} />
    </section>
  );
}
