// Module 5 — Per-recipe route. Server component pre-generates one static page per
// recipe slug; the detail itself renders in the client RecipeDetail component.
import { notFound } from 'next/navigation';
import { recipes } from '@/lib/recipes';
import RecipeDetail from '@/components/RecipeDetail';
import BackLink from '@/components/BackLink';

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <BackLink />
      <div className="mt-4">
        <RecipeDetail recipe={recipe} />
      </div>
    </div>
  );
}
