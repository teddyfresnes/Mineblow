export type SkinCategory = string;

export interface CatalogSkin {
  category: SkinCategory;
  name: string;
  url: string;
}

export interface CatalogCategory {
  name: SkinCategory;
  skins: CatalogSkin[];
  previewSkinUrl: string | null;
}

const skinModules = import.meta.glob('../../assets/skins/**/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const categoryMarkers = import.meta.glob('../../assets/skins/**/README.txt', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const extractCategory = (path: string): string | null => {
  const match = path.match(/assets\/skins\/([^/]+)\//);
  return match ? match[1] : null;
};

const catalog = Object.entries(skinModules)
  .map(([path, url]) => {
    const match = path.match(/assets\/skins\/([^/]+)\/([^/]+)\.png$/);
    if (!match) {
      return null;
    }

    const [, category, fileName] = match;
    return {
      category,
      name: fileName,
      url,
    } satisfies CatalogSkin;
  })
  .filter((entry): entry is CatalogSkin => entry !== null)
  .sort((left, right) => {
    const categoryCompare = left.category.localeCompare(right.category);
    return categoryCompare !== 0 ? categoryCompare : left.name.localeCompare(right.name);
  });

const categoryNames = new Set<string>();
catalog.forEach((skin) => categoryNames.add(skin.category));
Object.keys(categoryMarkers).forEach((path) => {
  const category = extractCategory(path);
  if (category) {
    categoryNames.add(category);
  }
});

const categories = [...categoryNames]
  .sort((left, right) => left.localeCompare(right))
  .map((name) => {
    const skins = catalog.filter((skin) => skin.category === name);
    return {
      name,
      skins,
      previewSkinUrl: skins[0]?.url ?? null,
    } satisfies CatalogCategory;
  });

export const getCatalogSkins = (category: SkinCategory): CatalogSkin[] =>
  catalog.filter((skin) => skin.category === category);

export const getSkinCategories = (): CatalogCategory[] => categories.map((category) => ({
  name: category.name,
  skins: [...category.skins],
  previewSkinUrl: category.previewSkinUrl,
}));
