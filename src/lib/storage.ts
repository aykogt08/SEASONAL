import fs from "fs";
import path from "path";
import { prisma } from "./prisma";
import { getInitialFoodItemsWithIcons, InitialFoodItem } from "./initialData";

export interface FoodWithCheck {
  id: string;
  nameEn: string;
  nameJa: string;
  category: "FRUIT" | "VEGETABLE" | "SEAFOOD" | "OTHER";
  season: "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
  iconUrl: string;
  sortOrder: number;
  isEaten: boolean;
  eatenAt: string | null;
}

// Local file storage path for persistent storage during local development
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "seasonal_data.json");

interface LocalStoreData {
  foods: (InitialFoodItem & { iconUrl: string })[];
  checks: Record<string, { isEaten: boolean; eatenAt: string | null }>;
}

let cachedData: LocalStoreData | null = null;

function loadLocalStore(): LocalStoreData {
  if (cachedData) return cachedData;

  const defaultFoods = getInitialFoodItemsWithIcons();

  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      
      const existingFoodMap = new Map<string, InitialFoodItem & { iconUrl?: string }>(
        (parsed.foods || []).map((f: InitialFoodItem & { iconUrl?: string }) => [f.id, f])
      );
      
      const mergedFoods: (InitialFoodItem & { iconUrl: string })[] = defaultFoods.map((defFood) => {
        const existing = existingFoodMap.get(defFood.id);
        if (existing) {
          return {
            ...defFood,
            ...existing,
            iconUrl: existing.iconUrl || defFood.iconUrl,
          };
        }
        return defFood;
      });

      (parsed.foods || []).forEach((f: InitialFoodItem & { iconUrl?: string }) => {
        if (f.id.startsWith("custom-") && !mergedFoods.some((m) => m.id === f.id)) {
          mergedFoods.push({
            ...f,
            iconUrl: f.iconUrl || "",
          });
        }
      });

      cachedData = {
        foods: mergedFoods,
        checks: parsed.checks || {},
      };
      saveLocalStore(cachedData);
      return cachedData;
    }
  } catch (err) {
    console.warn("Failed to read local store file, initializing new store:", err);
  }

  cachedData = {
    foods: defaultFoods,
    checks: {},
  };
  saveLocalStore(cachedData);
  return cachedData;
}

function saveLocalStore(data: LocalStoreData) {
  cachedData = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to write local store file:", err);
  }
}

export async function getFoodsForYear(year: number): Promise<FoodWithCheck[]> {
  try {
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
      let count = 0;
      try {
        count = await prisma.foodItem.count();
      } catch (e) {
        console.warn("DB table check:", e);
      }

      if (count === 0) {
        await seedDatabase();
      }

      const foods = await prisma.foodItem.findMany({
        orderBy: [{ season: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
        include: {
          checks: {
            where: { year },
          },
        },
      });

      return foods.map((f) => {
        const check = f.checks[0];
        return {
          id: f.id,
          nameEn: f.nameEn,
          nameJa: f.nameJa,
          category: f.category,
          season: f.season,
          iconUrl: f.iconUrl,
          sortOrder: f.sortOrder,
          isEaten: check ? check.isEaten : false,
          eatenAt: check && check.eatenAt ? check.eatenAt.toISOString() : null,
        };
      });
    }
  } catch (error) {
    console.warn("Falling back to local persistent store:", error);
  }

  const store = loadLocalStore();
  return store.foods.map((f) => {
    const key = `${year}-${f.id}`;
    const check = store.checks[key];
    return {
      id: f.id,
      nameEn: f.nameEn,
      nameJa: f.nameJa,
      category: f.category,
      season: f.season,
      iconUrl: f.iconUrl || "",
      sortOrder: f.sortOrder,
      isEaten: check ? check.isEaten : false,
      eatenAt: check ? check.eatenAt : null,
    };
  });
}

export async function toggleFoodCheck(
  year: number,
  foodItemId: string,
  isEaten: boolean
): Promise<{ isEaten: boolean; eatenAt: string | null }> {
  const eatenAt = isEaten ? new Date() : null;

  try {
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
      const result = await prisma.foodCheck.upsert({
        where: {
          year_foodItemId: {
            year,
            foodItemId,
          },
        },
        update: {
          isEaten,
          eatenAt,
        },
        create: {
          year,
          foodItemId,
          isEaten,
          eatenAt,
        },
      });

      return {
        isEaten: result.isEaten,
        eatenAt: result.eatenAt ? result.eatenAt.toISOString() : null,
      };
    }
  } catch (error) {
    console.warn("DB toggle failed, saving to local store:", error);
  }

  const store = loadLocalStore();
  const key = `${year}-${foodItemId}`;
  const record = { isEaten, eatenAt: eatenAt ? eatenAt.toISOString() : null };
  store.checks[key] = record;
  saveLocalStore(store);
  return record;
}

export async function updateFoodItem(
  id: string,
  data: {
    nameEn?: string;
    nameJa?: string;
    category?: "FRUIT" | "VEGETABLE" | "SEAFOOD" | "OTHER";
    season?: "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
    iconUrl?: string;
  }
) {
  try {
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
      return await prisma.foodItem.update({
        where: { id },
        data,
      });
    }
  } catch (error) {
    console.warn("DB update failed, updating local store:", error);
  }

  const store = loadLocalStore();
  const idx = store.foods.findIndex((f) => f.id === id);
  if (idx !== -1) {
    store.foods[idx] = {
      ...store.foods[idx],
      ...data,
      iconKey: store.foods[idx].iconKey,
      iconUrl: data.iconUrl || store.foods[idx].iconUrl,
    };
    saveLocalStore(store);
    return store.foods[idx];
  }
  throw new Error("Food item not found");
}

export async function createFoodItem(data: {
  nameEn: string;
  nameJa: string;
  category: "FRUIT" | "VEGETABLE" | "SEAFOOD" | "OTHER";
  season: "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
  iconUrl: string;
}) {
  try {
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
      const highestSort = await prisma.foodItem.aggregate({
        where: { season: data.season },
        _max: { sortOrder: true },
      });
      const nextSort = (highestSort._max.sortOrder || 0) + 1;

      return await prisma.foodItem.create({
        data: {
          ...data,
          sortOrder: nextSort,
        },
      });
    }
  } catch (error) {
    console.warn("DB create failed, adding to local store:", error);
  }

  const store = loadLocalStore();
  const newId = `custom-${Date.now()}`;
  const newItem: InitialFoodItem & { iconUrl: string } = {
    id: newId,
    ...data,
    iconKey: "custom",
    sortOrder: store.foods.filter((f) => f.season === data.season).length + 1,
  };
  store.foods.push(newItem);
  saveLocalStore(store);
  return newItem;
}

export async function deleteFoodItem(id: string) {
  try {
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
      return await prisma.foodItem.delete({
        where: { id },
      });
    }
  } catch (error) {
    console.warn("DB delete failed, removing from local store:", error);
  }

  const store = loadLocalStore();
  store.foods = store.foods.filter((f) => f.id !== id);
  saveLocalStore(store);
  return { success: true };
}

export async function seedDatabase() {
  const initialData = getInitialFoodItemsWithIcons();
  for (const item of initialData) {
    await prisma.foodItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        nameEn: item.nameEn,
        nameJa: item.nameJa,
        category: item.category,
        season: item.season,
        iconUrl: item.iconUrl,
        sortOrder: item.sortOrder,
      },
    });
  }
}
