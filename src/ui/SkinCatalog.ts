export type SkinCategory = string;
export type SkinGender = 'male' | 'female' | 'unknown';

export interface CatalogSkin {
  category: SkinCategory;
  sourceCategory: string;
  name: string;
  path: string;
  gender: SkinGender;
}

export interface CatalogCategory {
  name: SkinCategory;
  skins: CatalogSkin[];
  previewSkinPath: string | null;
  hasMale: boolean;
  hasFemale: boolean;
  supportsGenderFilter: boolean;
}

interface RawSkinEntry {
  sourceCategory: string;
  baseCategory: string;
  gender: SkinGender;
  name: string;
  path: string;
}

const skinModules = import.meta.glob('../../assets/skins/**/*.png', {
  import: 'default',
}) as Record<string, () => Promise<string>>;

const categoryMarkers = import.meta.glob('../../assets/skins/**/README.txt') as Record<
  string,
  () => Promise<unknown>
>;

const extractFolderName = (path: string): string | null => {
  const match = path.match(/assets\/skins\/([^/]+)\//);
  return match ? match[1] : null;
};

const parseCategoryInfo = (sourceCategory: string): { baseCategory: string; gender: SkinGender } => {
  const boysMatch = sourceCategory.match(/^boys\s+(.+)$/i);
  if (boysMatch && boysMatch[1]) {
    return {
      baseCategory: boysMatch[1].trim(),
      gender: 'male',
    };
  }

  const girlsMatch = sourceCategory.match(/^girls\s+(.+)$/i);
  if (girlsMatch && girlsMatch[1]) {
    return {
      baseCategory: girlsMatch[1].trim(),
      gender: 'female',
    };
  }

  return {
    baseCategory: sourceCategory.trim(),
    gender: 'unknown',
  };
};

const cloneSkin = (skin: CatalogSkin): CatalogSkin => ({
  category: skin.category,
  sourceCategory: skin.sourceCategory,
  name: skin.name,
  path: skin.path,
  gender: skin.gender,
});

const rawSkins = Object.keys(skinModules)
  .map((path) => {
    const match = path.match(/assets\/skins\/([^/]+)\/([^/]+)\.png$/);
    if (!match) {
      return null;
    }

    const [, sourceCategory, fileName] = match;
    const { baseCategory, gender } = parseCategoryInfo(sourceCategory);
    return {
      sourceCategory,
      baseCategory,
      gender,
      name: fileName,
      path,
    } satisfies RawSkinEntry;
  })
  .filter((entry): entry is RawSkinEntry => entry !== null)
  .sort((left, right) => {
    const sourceCompare = left.sourceCategory.localeCompare(right.sourceCategory);
    return sourceCompare !== 0 ? sourceCompare : left.name.localeCompare(right.name);
  });

const markerFolders = Object.keys(categoryMarkers)
  .map((path) => extractFolderName(path))
  .filter((folder): folder is string => folder !== null);

const sourceCategoryNames = new Set<string>();
rawSkins.forEach((skin) => sourceCategoryNames.add(skin.sourceCategory));
markerFolders.forEach((folder) => sourceCategoryNames.add(folder));

const allCategoryNames = new Set<SkinCategory>();
sourceCategoryNames.forEach((sourceCategory) => {
  const info = parseCategoryInfo(sourceCategory);
  if (info.gender === 'male' || info.gender === 'female') {
    allCategoryNames.add(info.baseCategory);
  } else {
    allCategoryNames.add(sourceCategory);
  }
});

const catalog = rawSkins
  .map((entry) => {
    return {
      category:
        entry.gender === 'male' || entry.gender === 'female'
          ? entry.baseCategory
          : entry.sourceCategory,
      sourceCategory: entry.sourceCategory,
      name: entry.name,
      path: entry.path,
      gender: entry.gender,
    } satisfies CatalogSkin;
  })
  .sort((left, right) => {
    const categoryCompare = left.category.localeCompare(right.category);
    if (categoryCompare !== 0) {
      return categoryCompare;
    }
    if (left.gender !== right.gender) {
      return left.gender.localeCompare(right.gender);
    }
    return left.name.localeCompare(right.name);
  });

catalog.forEach((skin) => allCategoryNames.add(skin.category));

const skinsByCategory = new Map<SkinCategory, CatalogSkin[]>();
catalog.forEach((skin) => {
  const bucket = skinsByCategory.get(skin.category) ?? [];
  bucket.push(skin);
  skinsByCategory.set(skin.category, bucket);
});

const categories = [...allCategoryNames]
  .sort((left, right) => left.localeCompare(right))
  .map((name) => {
    const skins = (skinsByCategory.get(name) ?? []).map((skin) => cloneSkin(skin));
    const hasMale = skins.some((skin) => skin.gender === 'male');
    const hasFemale = skins.some((skin) => skin.gender === 'female');
    return {
      name,
      skins,
      previewSkinPath: skins[0]?.path ?? null,
      hasMale,
      hasFemale,
      supportsGenderFilter: hasMale && hasFemale,
    } satisfies CatalogCategory;
  });

const skinUrlCache = new Map<string, string>();
const loadedSkinByUrl = new Map<string, CatalogSkin>();

export const getCatalogSkins = (category: SkinCategory): CatalogSkin[] =>
  (skinsByCategory.get(category) ?? []).map((skin) => cloneSkin(skin));

export const getSkinCategories = (): CatalogCategory[] =>
  categories.map((category) => ({
    name: category.name,
    skins: category.skins.map((skin) => cloneSkin(skin)),
    previewSkinPath: category.previewSkinPath,
    hasMale: category.hasMale,
    hasFemale: category.hasFemale,
    supportsGenderFilter: category.supportsGenderFilter,
  }));

export const loadCatalogSkinUrl = async (skin: CatalogSkin): Promise<string | null> => {
  const cached = skinUrlCache.get(skin.path);
  if (cached) {
    loadedSkinByUrl.set(cached, cloneSkin(skin));
    return cached;
  }

  const loader = skinModules[skin.path];
  if (!loader) {
    return null;
  }

  try {
    const url = await loader();
    skinUrlCache.set(skin.path, url);
    loadedSkinByUrl.set(url, cloneSkin(skin));
    return url;
  } catch {
    return null;
  }
};

export const findCatalogSkinByUrl = (url: string): CatalogSkin | null => {
  const skin = loadedSkinByUrl.get(url);
  return skin ? cloneSkin(skin) : null;
};

export const findCatalogSkinNameByUrl = (url: string): string | null =>
  loadedSkinByUrl.get(url)?.name ?? null;

export const clearCatalogSkinLookupCache = (): void => {
  loadedSkinByUrl.clear();
  skinUrlCache.clear();
};
