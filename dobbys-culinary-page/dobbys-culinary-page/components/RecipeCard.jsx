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
      className="group block overflow-hidden rounded-xl bg-[#f1e3d0] shadow-sm shadow-[#8c6e5c]/10 ring-1 ring-[#d6b99d]/80 transition hover:-translate-y-1 hover:shadow-md"
    >
      <RecipeImage
        photo={recipe.photo}
        alt={name}
        className="h-44 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#492f1f] group-hover:text-[#3f2419]">{name}</h3>
        <p className="mt-1 text-sm text-[#6f5846]">
          ⏱️ {recipe.durationMinutes} {t('minutesShort')}
        </p>
      </div>
    </Link>
  );
}
