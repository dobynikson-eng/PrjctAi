'use client';

// Module 4 — Compact recipe preview (photo, name, duration) that links to the
// full recipe page. Reads the active language from the LanguageProvider context.
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { getField } from '@/lib/i18n';
import RecipeImage from './RecipeImage';

export default function RecipeCard({ recipe }) {
  const { lang, t } = useLanguage();
  const name = getField(recipe, 'name', lang);

  return (
    <Link
      href={`/recipe/${recipe.slug}/`}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md"
    >
      <RecipeImage
        photo={recipe.photo}
        alt={name}
        className="h-44 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-rose-600">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">
          ⏱️ {recipe.durationMinutes} {t('minutesShort')}
        </p>
      </div>
    </Link>
  );
}
