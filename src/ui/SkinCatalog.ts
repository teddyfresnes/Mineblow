export const SKIN_CATEGORIES = ['boys', 'girls'] as const;

export type SkinCategory = (typeof SKIN_CATEGORIES)[number];

export interface CatalogSkin {
  category: SkinCategory;
  name: string;
  url: string;
}

const skinModules = import.meta.glob('../../assets/skins/**/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const catalog: CatalogSkin[] = Object.entries(skinModules)
  .map(([path, url]) => {
    const match = path.match(/assets\/skins\/([^/]+)\/([^/]+)\.png$/);
    if (!match) {
      return null;
    }

    const [, category, fileName] = match;
    if (!SKIN_CATEGORIES.includes(category as SkinCategory)) {
      return null;
    }

    return {
      category: category as SkinCategory,
      name: fileName,
      url,
    };
  })
  .filter((entry): entry is CatalogSkin => entry !== null)
  .sort((left, right) => left.name.localeCompare(right.name));

export const getCatalogSkins = (category: SkinCategory): CatalogSkin[] =>
  catalog.filter((skin) => skin.category === category);
