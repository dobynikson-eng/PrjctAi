'use client';

// Module 4 — Full recipe view: photo, required products, duration and the
// preparation method, all in the active language.
import { useLanguage } from './LanguageProvider';
import { getField, localize } from '@/lib/i18n';
import RecipeImage from './RecipeImage';

export default function RecipeDetail({ recipe }) {
  const { lang, t } = useLanguage();
  const name = getField(recipe, 'name', lang);

  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800">{name}</h1>

      <RecipeImage
        photo={recipe.photo}
        alt={name}
        className="mt-4 h-64 w-full rounded-xl object-cover"
      />

      <p className="mt-4 text-gray-600">
        <strong>{t('duration')}:</strong> {recipe.durationMinutes} {t('minutesShort')}
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-rose-600">{t('requiredProducts')}</h2>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{localize(ingredient, lang)}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-rose-600">{t('preparationMethod')}</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-6 text-gray-700">
          {recipe.steps.map((step, index) => (
            <li key={index}>{localize(step, lang)}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}
