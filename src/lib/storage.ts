import fs from "fs";
import path from "path";
import { prisma } from "./prisma";
import { getInitialFoodItemsWithIcons, InitialFoodItem } from "./initialData";

export interface UserData {
  id: string;
  name: string;
  avatar: string;
  hasPassword?: boolean;
  createdAt?: string;
}

export interface FoodWithCheck {
  id: string;
  userId?: string | null;
  nameEn: string;
  nameJa: string;
  category: "FRUIT" | "VEGETABLE" | "SEAFOOD" | "OTHER";
  season: "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
  iconUrl: string;
  sortOrder: number;
  isEaten: boolean;
  eatenAt: string | null;
}

// Local file storage path for persistent storage during local development and Vercel fallback
const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "seasonal_data.json");

interface LocalStoreData {
  users: (UserData & { password?: string | null })[];
  foods: (InitialFoodItem & { iconUrl: string; userId?: string | null })[];
  hidden: Record<string, string[]>; // key: userId, value: array of hidden food item IDs
  checks: Record<string, { isEaten: boolean; eatenAt: string | null }>;
}

let cachedData: LocalStoreData | null = null;

function loadLocalStore(): LocalStoreData {
  const defaultFoods = getInitialFoodItemsWithIcons();

  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      
      const customItems = (parsed.foods || []).filter(
        (f: InitialFoodItem & { iconUrl?: string; userId?: string | null }) =>
          f.id.startsWith("custom-") || f.id.startsWith("temp-")
      );

      cachedData = {
        users: parsed.users || [],
        foods: [...defaultFoods, ...customItems],
        hidden: parsed.hidden || {},
        checks: parsed.checks || {},
      };
      return cachedData;
    }
  } catch (err) {
    console.warn("Failed to read local store file, initializing fresh store:", err);
  }

  cachedData = {
    users: [],
    foods: defaultFoods,
    hidden: {},
    checks: {},
  };
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

// Timeout helper to avoid DB connection hanging on Vercel (allows 7s for Neon cold starts)
function withTimeout<T>(promise: Promise<T>, timeoutMs = 7000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timed out")), timeoutMs)
    ),
  ]);
}

// ----------------------------------------------------
// User Management & Password Verification
// ----------------------------------------------------

export async function getUsers(): Promise<UserData[]> {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
    try {
      const dbTask = async () => {
        const dbUsers = await prisma.user.findMany({
          orderBy: { createdAt: "asc" },
        });
        return dbUsers.map((u) => ({
          id: u.id,
          name: u.name,
          avatar: u.avatar,
          hasPassword: Boolean(u.password),
          createdAt: u.createdAt.toISOString(),
        }));
      };
      return await withTimeout(dbTask(), 7000);
    } catch (error) {
      console.warn("DB getUsers fallback:", error);
    }
  }

  const store = loadLocalStore();
  return (store.users || []).map((u) => ({
    id: u.id,
    name: u.name,
    avatar: u.avatar,
    hasPassword: Boolean(u.password),
    createdAt: u.createdAt,
  }));
}

export async function getOrCreateUser(
  name: string,
  avatar = "🌸",
  password?: string | null
): Promise<UserData> {
  const trimmedName = name.trim();
  if (!trimmedName) throw new Error("Name cannot be empty");
  const trimmedPassword = password ? password.trim() : null;

  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
    try {
      const dbTask = async () => {
        const existing = await prisma.user.findUnique({
          where: { name: trimmedName },
        });

        if (existing) {
          // If existing user has password, verify it
          if (existing.password) {
            if (!trimmedPassword || existing.password !== trimmedPassword) {
              throw new Error("INCORRECT_PASSWORD");
            }
          } else if (trimmedPassword) {
            // Set password if previously had none
            await prisma.user.update({
              where: { id: existing.id },
              data: { password: trimmedPassword, avatar },
            });
          }

          return {
            id: existing.id,
            name: existing.name,
            avatar: existing.avatar,
            hasPassword: Boolean(existing.password || trimmedPassword),
            createdAt: existing.createdAt.toISOString(),
          };
        }

        // Create new user with password
        const newUser = await prisma.user.create({
          data: {
            name: trimmedName,
            avatar,
            password: trimmedPassword,
          },
        });

        return {
          id: newUser.id,
          name: newUser.name,
          avatar: newUser.avatar,
          hasPassword: Boolean(newUser.password),
          createdAt: newUser.createdAt.toISOString(),
        };
      };

      return await withTimeout(dbTask(), 7000);
    } catch (error) {
      if (error instanceof Error && error.message === "INCORRECT_PASSWORD") {
        throw error;
      }
      console.warn("DB getOrCreateUser fallback:", error);
    }
  }

  const store = loadLocalStore();
  const user = (store.users || []).find((u) => u.name.toLowerCase() === trimmedName.toLowerCase());
  if (user) {
    if (user.password && user.password !== trimmedPassword) {
      throw new Error("INCORRECT_PASSWORD");
    }
    if (!user.password && trimmedPassword) {
      user.password = trimmedPassword;
      saveLocalStore(store);
    }
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      hasPassword: Boolean(user.password),
      createdAt: user.createdAt,
    };
  }

  const newUser: UserData & { password?: string | null } = {
    id: `usr-${Date.now()}`,
    name: trimmedName,
    avatar,
    password: trimmedPassword,
    hasPassword: Boolean(trimmedPassword),
    createdAt: new Date().toISOString(),
  };
  store.users = [...(store.users || []), newUser];
  saveLocalStore(store);
  return {
    id: newUser.id,
    name: newUser.name,
    avatar: newUser.avatar,
    hasPassword: Boolean(newUser.password),
    createdAt: newUser.createdAt,
  };
}

export async function loginUserWithPassword(
  userId: string,
  password?: string | null
): Promise<UserData> {
  const trimmedPassword = password ? password.trim() : null;

  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
    try {
      const dbTask = async () => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!user) throw new Error("User not found");

        if (user.password) {
          if (!trimmedPassword || user.password !== trimmedPassword) {
            throw new Error("INCORRECT_PASSWORD");
          }
        }

        return {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          hasPassword: Boolean(user.password),
          createdAt: user.createdAt.toISOString(),
        };
      };
      return await withTimeout(dbTask(), 7000);
    } catch (error) {
      if (error instanceof Error && error.message === "INCORRECT_PASSWORD") {
        throw error;
      }
      console.warn("DB loginUser fallback:", error);
    }
  }

  const store = loadLocalStore();
  const user = (store.users || []).find((u) => u.id === userId);
  if (!user) throw new Error("User not found");

  if (user.password && user.password !== trimmedPassword) {
    throw new Error("INCORRECT_PASSWORD");
  }

  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    hasPassword: Boolean(user.password),
    createdAt: user.createdAt,
  };
}

export async function deleteUser(userId: string, password?: string | null) {
  const trimmedPassword = password ? password.trim() : null;

  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
    try {
      const dbTask = async () => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!user) throw new Error("User not found");

        if (user.password && user.password !== trimmedPassword) {
          throw new Error("INCORRECT_PASSWORD");
        }

        return await prisma.user.delete({
          where: { id: userId },
        });
      };
      return await withTimeout(dbTask(), 7000);
    } catch (error) {
      if (error instanceof Error && error.message === "INCORRECT_PASSWORD") {
        throw error;
      }
      console.warn("DB deleteUser fallback:", error);
    }
  }

  const store = loadLocalStore();
  const user = (store.users || []).find((u) => u.id === userId);
  if (!user) throw new Error("User not found");

  if (user.password && user.password !== trimmedPassword) {
    throw new Error("INCORRECT_PASSWORD");
  }

  store.users = (store.users || []).filter((u) => u.id !== userId);
  if (store.hidden && store.hidden[userId]) {
    delete store.hidden[userId];
  }
  if (store.checks) {
    Object.keys(store.checks).forEach((key) => {
      if (key.startsWith(`${userId}-`)) {
        delete store.checks[key];
      }
    });
  }
  saveLocalStore(store);
  return { success: true };
}

// ----------------------------------------------------
// Foods & Checks Management with User Support & Privacy Isolation
// ----------------------------------------------------

export async function getFoodsForYear(year: number, userId?: string | null): Promise<FoodWithCheck[]> {
  const defaultItems = getInitialFoodItemsWithIcons();

  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
    try {
      const dbTask = async () => {
        let count = 0;
        try {
          count = await prisma.foodItem.count({
            where: { userId: null },
          });
        } catch {
          // Table might not exist yet
        }

        // If master table has fewer items than defaultItems, seed once
        if (count < defaultItems.length) {
          await seedDatabase();
        }

        // Fetch hidden food IDs for this user
        let hiddenIds: string[] = [];
        if (userId) {
          const userHidden = await prisma.userHiddenFood.findMany({
            where: { userId },
            select: { foodItemId: true },
          });
          hiddenIds = userHidden.map((h) => h.foodItemId);
        }

        // Fetch standard items OR custom items created by THIS user only
        const foods = await prisma.foodItem.findMany({
          where: {
            AND: [
              {
                OR: [
                  { userId: null }, // standard master items
                  ...(userId ? [{ userId }] : []), // only items created by THIS user
                ],
              },
              ...(hiddenIds.length > 0
                ? [
                    {
                      id: {
                        notIn: hiddenIds,
                      },
                    },
                  ]
                : []),
            ],
          },
          orderBy: [{ season: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
          include: {
            checks: {
              where: {
                year,
                ...(userId ? { userId } : {}),
              },
            },
          },
        });

        return foods.map((f) => {
          const check = f.checks[0];
          return {
            id: f.id,
            userId: f.userId,
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
      };

      return await withTimeout(dbTask(), 7000);
    } catch (error) {
      console.warn("DB fetch failed/timed out, using fast store fallback:", error);
    }
  }

  // Fast In-Memory / Local Store with privacy isolation
  const store = loadLocalStore();
  const hiddenList = userId && store.hidden[userId] ? store.hidden[userId] : [];

  const relevantFoods = store.foods.filter(
    (f) => (!f.userId || (userId && f.userId === userId)) && !hiddenList.includes(f.id)
  );

  return relevantFoods.map((f) => {
    const userKey = userId ? `${userId}-${year}-${f.id}` : `${year}-${f.id}`;
    const legacyKey = `${year}-${f.id}`;
    const check = store.checks[userKey] || store.checks[legacyKey];
    return {
      id: f.id,
      userId: f.userId || null,
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
  isEaten: boolean,
  userId?: string | null
): Promise<{ isEaten: boolean; eatenAt: string | null }> {
  const eatenAt = isEaten ? new Date() : null;

  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres") && userId) {
    try {
      const dbTask = async () => {
        const result = await prisma.foodCheck.upsert({
          where: {
            userId_year_foodItemId: {
              userId,
              year,
              foodItemId,
            },
          },
          update: {
            isEaten,
            eatenAt,
          },
          create: {
            userId,
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
      };

      return await withTimeout(dbTask(), 7000);
    } catch (error) {
      console.warn("DB toggle failed/timed out, saving to fast store:", error);
    }
  }

  const store = loadLocalStore();
  const key = userId ? `${userId}-${year}-${foodItemId}` : `${year}-${foodItemId}`;
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
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
    try {
      const dbTask = async () => {
        return await prisma.foodItem.update({
          where: { id },
          data,
        });
      };
      return await withTimeout(dbTask(), 7000);
    } catch (error) {
      console.warn("DB update failed, updating local store:", error);
    }
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

export async function createFoodItem(
  data: {
    nameEn: string;
    nameJa: string;
    category: "FRUIT" | "VEGETABLE" | "SEAFOOD" | "OTHER";
    season: "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
    iconUrl: string;
  },
  userId?: string | null
) {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
    try {
      const dbTask = async () => {
        const highestSort = await prisma.foodItem.aggregate({
          where: { season: data.season },
          _max: { sortOrder: true },
        });
        const nextSort = (highestSort._max.sortOrder || 0) + 1;

        return await prisma.foodItem.create({
          data: {
            ...data,
            userId: userId || null,
            sortOrder: nextSort,
          },
        });
      };
      return await withTimeout(dbTask(), 7000);
    } catch (error) {
      console.warn("DB create failed, adding to fast store:", error);
    }
  }

  const store = loadLocalStore();
  const newId = `custom-${Date.now()}`;
  const newItem: InitialFoodItem & { iconUrl: string; userId?: string | null } = {
    id: newId,
    userId: userId || null,
    ...data,
    iconKey: "custom",
    sortOrder: store.foods.filter((f) => f.season === data.season).length + 1,
  };
  store.foods.push(newItem);
  saveLocalStore(store);
  return newItem;
}

export async function deleteFoodItem(id: string, userId?: string | null) {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres")) {
    try {
      const dbTask = async () => {
        // If it is a custom item created by this user, delete it directly
        const target = await prisma.foodItem.findUnique({
          where: { id },
        });

        if (target && target.userId && target.userId === userId) {
          return await prisma.foodItem.delete({
            where: { id },
          });
        }

        // If it is a master item, mark as hidden for THIS user
        if (userId) {
          return await prisma.userHiddenFood.upsert({
            where: {
              userId_foodItemId: {
                userId,
                foodItemId: id,
              },
            },
            update: {},
            create: {
              userId,
              foodItemId: id,
            },
          });
        }
      };
      return await withTimeout(dbTask(), 7000);
    } catch (error) {
      console.warn("DB delete failed, removing from fast store:", error);
    }
  }

  const store = loadLocalStore();
  const isCustom = id.startsWith("custom-") || id.startsWith("temp-");

  if (isCustom) {
    store.foods = store.foods.filter((f) => f.id !== id);
  } else if (userId) {
    if (!store.hidden[userId]) store.hidden[userId] = [];
    if (!store.hidden[userId].includes(id)) {
      store.hidden[userId].push(id);
    }
  }

  saveLocalStore(store);
  return { success: true };
}

export async function seedDatabase() {
  const initialData = getInitialFoodItemsWithIcons();
  for (const item of initialData) {
    await prisma.foodItem.upsert({
      where: { id: item.id },
      update: {
        nameEn: item.nameEn,
        nameJa: item.nameJa,
        category: item.category,
        season: item.season,
        iconUrl: item.iconUrl,
        sortOrder: item.sortOrder,
      },
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
