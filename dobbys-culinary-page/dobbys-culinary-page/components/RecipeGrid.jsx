'use client';

// Module 5 — Responsive grid of recipe cards, or a "no results" message.
import { useLanguage } from './LanguageProvider';
import RecipeCard from './RecipeCard';

export default function RecipeGrid({ recipes }) {
  const { t } = useLanguage();

  if (!recipes || recipes.length === 0) {
    return <p className="py-12 text-center text-gray-500">{t('noResults')}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  );
}
