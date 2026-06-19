import { describe, it, expect } from 'vitest';
import { validateRecipe, validateDataset } from '../lib/schema.js';
import { recipes } from '../lib/recipes.js';
import { categories, getLeafCategories } from '../lib/categories.js';

// A known-good recipe; override individual fields to build invalid variants.
function makeValidRecipe(overrides = {}) {
  return {
    slug: 'test-dish',
    categoryId: 'salads',
    name: { bg: 'Тест', en: 'Test' },
    durationMinutes: 20,
    ingredients: [{ bg: 'Домат', en: 'Tomato' }],
    steps: [{ bg: 'Нарежи', en: 'Chop' }],
    photo: 'test.jpg',
    ...overrides,
  };
}

describe('validateRecipe', () => {
  it('accepts a complete recipe', () => {
    expect(validateRecipe(makeValidRecipe())).toEqual([]);
  });

  it('rejects a recipe missing duration', () => {
    const errors = validateRecipe(makeValidRecipe({ durationMinutes: undefined }));
    expect(errors.some((e) => e.includes('durationMinutes'))).toBe(true);
  });

  it('rejects a recipe missing a photo', () => {
    const errors = validateRecipe(makeValidRecipe({ photo: '' }));
    expect(errors.some((e) => e.includes('photo'))).toBe(true);
  });

  it('rejects empty ingredients', () => {
    const errors = validateRecipe(makeValidRecipe({ ingredients: [] }));
    expect(errors.some((e) => e.includes('ingredients'))).toBe(true);
  });

  it('rejects a name that is not bilingual', () => {
    const errors = validateRecipe(makeValidRecipe({ name: { en: 'Test' } }));
    expect(errors.some((e) => e.includes('name'))).toBe(true);
  });

  it('rejects a non-object', () => {
    expect(validateRecipe(null).length).toBeGreaterThan(0);
  });
});

describe('validateDataset — shipped data', () => {
  it('the shipped dataset is valid', () => {
    expect(validateDataset(recipes, categories)).toEqual([]);
  });

  it('every leaf category has at least one recipe', () => {
    const leafIds = getLeafCategories(categories).map((c) => c.id);
    const used = new Set(recipes.map((r) => r.categoryId));
    for (const id of leafIds) {
      expect(used.has(id)).toBe(true);
    }
  });
});

describe('validateDataset — error cases', () => {
  const miniCategories = [
    { id: 'salads', name: { bg: 'Салати', en: 'Salads' } },
    { id: 'meat', name: { bg: 'Месо', en: 'Meat' } },
  ];

  it('reports a category with no recipes', () => {
    const only = [makeValidRecipe({ slug: 'a', categoryId: 'salads' })];
    const errors = validateDataset(only, miniCategories);
    expect(errors.some((e) => e.includes('meat') && e.includes('no recipes'))).toBe(true);
  });

  it('reports duplicate slugs', () => {
    const dataset = [
      makeValidRecipe({ slug: 'dup', categoryId: 'salads' }),
      makeValidRecipe({ slug: 'dup', categoryId: 'meat' }),
    ];
    const errors = validateDataset(dataset, miniCategories);
    expect(errors.some((e) => e.includes('duplicate slug'))).toBe(true);
  });

  it('reports an unknown / non-leaf categoryId', () => {
    const dataset = [
      makeValidRecipe({ slug: 'a', categoryId: 'salads' }),
      makeValidRecipe({ slug: 'b', categoryId: 'meat' }),
      makeValidRecipe({ slug: 'c', categoryId: 'nonexistent' }),
    ];
    const errors = validateDataset(dataset, miniCategories);
    expect(errors.some((e) => e.includes('nonexistent'))).toBe(true);
  });
});
