// Module 5 — Per-category route. Server component pre-generates one static page
// per category id, then hands the id to the client view for rendering.
import { getAllCategoryIds } from '@/lib/categories';
import CategoryView from '@/components/CategoryView';

export function generateStaticParams() {
  return getAllCategoryIds().map((id) => ({ id }));
}

export default async function CategoryPage({ params }) {
  const { id } = await params;
  return <CategoryView categoryId={id} />;
}
