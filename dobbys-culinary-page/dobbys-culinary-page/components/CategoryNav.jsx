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
      <ul className="space-y-1 text-base">
        <li>
          <Link href="/" className="font-bold text-[#492f1f] hover:text-[#492f1f]/80">
            {t('allRecipes')}
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/category/${cat.id}/`}
              className="font-bold text-[#492f1f] hover:text-[#492f1f]/80"
            >
              {getField(cat, 'name', lang)}
            </Link>
            {cat.subcategories && (
              <ul className="mt-1 space-y-1 pl-4 text-base">
                {cat.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/category/${sub.id}/`}
                      className="font-bold text-[#6f5846] hover:text-[#492f1f]/80"
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
