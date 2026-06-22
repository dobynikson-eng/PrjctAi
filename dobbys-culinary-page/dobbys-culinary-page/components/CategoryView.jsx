'use client';

// Module 5 — Category page body: localized title + the recipes in that category
// (a leaf shows its own recipes; a parent like "desserts" shows all subgroups).
import { useLanguage } from './LanguageProvider';
import CategoryNav from './CategoryNav';
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="md:sticky md:top-24 md:self-start md:border-r md:border-gray-100 md:pr-6">
          <div className="md:max-h-[calc(100vh-6rem)] md:overflow-y-auto md:pr-2">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide text-[#6f5846]">
              {t('categories')}
            </h2>
            <CategoryNav />
          </div>
        </aside>

        <div>
          <h1 className="mb-6 text-2xl font-bold text-[#492f1f]">{title}</h1>
          <RecipeGrid recipes={list} />
        </div>
      </div>
    </section>
  );
}
