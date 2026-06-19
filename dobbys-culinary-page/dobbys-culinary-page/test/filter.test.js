import { describe, it, expect } from 'vitest';
import { filterByCategory, searchRecipes, getCategoryLeafIds } from '../lib/filter.js';
import { recipes } from '../lib/recipes.js';

const slugs = (list) => list.map((r) => r.slug).sort();

describe('getCategoryLeafIds', () => {
  it('returns the id itself for a leaf category', () => {
    expect(getCategoryLeafIds('salads')).toEqual(['salads']);
  });

  it('returns all subgroup leaves for a parent category', () => {
    expect(getCategoryLeafIds('desserts').sort()).toEqual(
      ['cakes', 'creams', 'healthy', 'ice-creams'],
    );
  });

  it('returns an empty array for an unknown category', () => {
    expect(getCategoryLeafIds('nope')).toEqual([]);
  });
});

describe('filterByCategory', () => {
  it('returns only recipes in a leaf category', () => {
    expect(slugs(filterByCategory(recipes, 'salads'))).toEqual(['greek-salad']);
  });

  it('returns all subgroup recipes for the Desserts parent category', () => {
    expect(slugs(filterByCategory(recipes, 'desserts'))).toEqual(
      ['chia-pudding', 'chocolate-cake', 'creme-caramel', 'vanilla-ice-cream'],
    );
  });

  it('returns every recipe for "all" or an empty id', () => {
    expect(filterByCategory(recipes, 'all')).toHaveLength(recipes.length);
    expect(filterByCategory(recipes, '')).toHaveLength(recipes.length);
  });

  it('returns an empty list for an unknown category', () => {
    expect(filterByCategory(recipes, 'nope')).toEqual([]);
  });
});

describe('searchRecipes', () => {
  it('matches by name in English', () => {
    expect(slugs(searchRecipes(recipes, 'salad', 'en'))).toEqual(['greek-salad']);
  });

  it('matches by name in Bulgarian', () => {
    expect(slugs(searchRecipes(recipes, 'салата', 'bg'))).toEqual(['greek-salad']);
  });

  it('matches by an ingredient that is not in the name', () => {
    // "Baked trout" has no "lemon" in its name, but lemon is an ingredient.
    expect(slugs(searchRecipes(recipes, 'lemon', 'en'))).toEqual(['baked-trout']);
  });

  it('is case-insensitive', () => {
    expect(slugs(searchRecipes(recipes, 'SALAD', 'en'))).toEqual(['greek-salad']);
  });

  it('returns all recipes for an empty query', () => {
    expect(searchRecipes(recipes, '   ', 'en')).toHaveLength(recipes.length);
  });
});
