'use client';

// Module 4 — Category navigation built from the category tree, including the
// nested Desserts subgroups. Labels follow the active language.
import Link from 'next/link';
import { categories } from '@/lib/categories';
import { getField } from '@/lib/i18n';
import { useLanguage } from './LanguageProvider';

export default function CategoryNav() {
  const { lang, t } = useLanguage();

  return (
    <nav aria-label={t('categories')} className="text-sm">
      <ul className="space-y-1">
        <li>
          <Link href="/" className="font-medium text-gray-700 hover:text-rose-600">
            {t('allRecipes')}
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/category/${cat.id}/`}
              className="font-medium text-gray-700 hover:text-rose-600"
            >
              {getField(cat, 'name', lang)}
            </Link>
            {cat.subcategories && (
              <ul className="mt-1 space-y-1 pl-4">
                {cat.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/category/${sub.id}/`}
                      className="text-gray-500 hover:text-rose-600"
                    >
                      {getField(sub, 'name', lang)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
