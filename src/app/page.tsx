"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import confetti from "canvas-confetti";
import { Header } from "@/components/Header";
import { SeasonTabs } from "@/components/SeasonTabs";
import { CategoryFilter, CategoryFilterType } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { FoodCard } from "@/components/FoodCard";
import { CustomizeFoodModal } from "@/components/CustomizeFoodModal";
import { AddFoodModal } from "@/components/AddFoodModal";
import { LoginModal } from "@/components/LoginModal";
import { SyncOverlay } from "@/components/SyncOverlay";
import { FoodWithCheck, UserData } from "@/lib/storage";
import { SeasonType, CategoryType, getInitialFoodItemsWithIcons } from "@/lib/initialData";
import { Sparkles, Calendar, Plus, Search } from "lucide-react";

// Helper to determine current season from month (0-indexed)
function getCurrentSeasonFromDate(date: Date = new Date()): SeasonType {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "SPRING";
  if (month >= 5 && month <= 7) return "SUMMER";
  if (month >= 8 && month <= 10) return "AUTUMN";
  return "WINTER";
}

const SEASON_META: Record<
  SeasonType,
  {
    titleEn: string;
    subEn: string;
    accent: string;
    bgSubtle: string;
    emoji: string;
  }
> = {
  SPRING: {
    titleEn: "SPRING HARVEST",
    subEn: "March — May",
    accent: "#5DBBB0",
    bgSubtle: "#EBF8F6",
    emoji: "🌸",
  },
  SUMMER: {
    titleEn: "SUMMER REFRESH",
    subEn: "June — August",
    accent: "#66B29F",
    bgSubtle: "#EDF6F3",
    emoji: "🌻",
  },
  AUTUMN: {
    titleEn: "AUTUMN BOUNTY",
    subEn: "September — November",
    accent: "#B88760",
    bgSubtle: "#F8F3ED",
    emoji: "🍁",
  },
  WINTER: {
    titleEn: "WINTER COMFORT",
    subEn: "December — February",
    accent: "#8E756B",
    bgSubtle: "#F5F0EE",
    emoji: "❄️",
  },
};

// Initial synchronous fallback items
function getInstantInitialFoods(): FoodWithCheck[] {
  const defaultItems = getInitialFoodItemsWithIcons();
  let customItems: FoodWithCheck[] = [];
  try {
    if (typeof window !== "undefined") {
      const savedCustom = localStorage.getItem("seasonal_custom_foods");
      if (savedCustom) {
        customItems = JSON.parse(savedCustom);
      }
    }
  } catch {}

  const standardItems: FoodWithCheck[] = defaultItems.map((item) => ({
    ...item,
    isEaten: false,
    eatenAt: null,
  }));

  return [...standardItems, ...customItems];
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [currentSeason, setCurrentSeason] = useState<SeasonType>(getCurrentSeasonFromDate());
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Instant foods state
  const [foods, setFoods] = useState<FoodWithCheck[]>(getInstantInitialFoods);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [editingFood, setEditingFood] = useState<FoodWithCheck | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const isSearching = searchQuery.trim().length > 0;

  // Restore current user on mount
  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem("seasonal_current_user");
      if (savedUserStr) {
        const savedUser: UserData = JSON.parse(savedUserStr);
        setCurrentUser(savedUser);
      } else {
        setIsUserModalOpen(true);
      }
    } catch {
      setIsUserModalOpen(true);
    }
  }, []);

  // Restore checks & custom foods from localStorage on user or year change
  useEffect(() => {
    try {
      const userId = currentUser?.id || "anonymous";
      const savedChecksStr = localStorage.getItem(`seasonal_checks_${userId}_${year}`);
      const fallbackChecksStr = localStorage.getItem(`seasonal_checks_${year}`);
      
      const savedChecks: Record<string, boolean> = savedChecksStr
        ? JSON.parse(savedChecksStr)
        : fallbackChecksStr
        ? JSON.parse(fallbackChecksStr)
        : {};

      const savedCustomStr = localStorage.getItem("seasonal_custom_foods");
      const customItems: FoodWithCheck[] = savedCustomStr ? JSON.parse(savedCustomStr) : [];

      setFoods((prev) => {
        const currentCustomIds = new Set(prev.filter((f) => f.id.startsWith("custom-") || f.id.startsWith("temp-")).map((f) => f.id));
        const missingCustom = customItems.filter((c) => !currentCustomIds.has(c.id));
        const combined = [...prev, ...missingCustom];

        return combined.map((item) => ({
          ...item,
          isEaten: savedChecks[item.id] !== undefined ? savedChecks[item.id] : false,
        }));
      });
    } catch {
      // Ignored
    }
  }, [year, currentUser]);

  // Background fetch from server/DB with user ID
  const fetchFoods = useCallback(async (targetYear: number, targetUserId?: string | null) => {
    try {
      setIsSyncing(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const userIdParam = targetUserId ? `&userId=${encodeURIComponent(targetUserId)}` : "";
      const res = await fetch(`/api/foods?year=${targetYear}${userIdParam}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.foods) && data.foods.length > 0) {
          const uId = targetUserId || "anonymous";

          // Server is the true source of truth across devices
          setFoods(data.foods);

          // Update local cache with server truth
          const checkMap: Record<string, boolean> = {};
          data.foods.forEach((f: FoodWithCheck) => {
            if (f.isEaten) checkMap[f.id] = true;
          });
          try {
            localStorage.setItem(`seasonal_checks_${uId}_${targetYear}`, JSON.stringify(checkMap));
          } catch {}
        }
      }
    } catch (err) {
      console.warn("Sync foods note (using local offline state):", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods(year, currentUser?.id);
  }, [year, currentUser, fetchFoods]);

  const handleSelectUser = (user: UserData) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("seasonal_current_user", JSON.stringify(user));
    } catch {}
    setIsUserModalOpen(false);
  };

  // Total stats across all seasons for the year
  const totalStats = useMemo(() => {
    const total = foods.length;
    const eaten = foods.filter((f) => f.isEaten).length;
    return { total, eaten };
  }, [foods]);

  // Stats per season
  const seasonCounts = useMemo(() => {
    const result: Record<SeasonType, { total: number; eaten: number }> = {
      SPRING: { total: 0, eaten: 0 },
      SUMMER: { total: 0, eaten: 0 },
      AUTUMN: { total: 0, eaten: 0 },
      WINTER: { total: 0, eaten: 0 },
    };

    foods.forEach((food) => {
      if (result[food.season]) {
        result[food.season].total += 1;
        if (food.isEaten) {
          result[food.season].eaten += 1;
        }
      }
    });

    return result;
  }, [foods]);

  // Foods in currently selected season
  const currentSeasonAllFoods = useMemo(() => {
    return foods.filter((f) => f.season === currentSeason);
  }, [foods, currentSeason]);

  // Category counts in currently selected season
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilterType, number> = {
      ALL: currentSeasonAllFoods.length,
      FRUIT: 0,
      VEGETABLE: 0,
      SEAFOOD: 0,
      OTHER: 0,
    };

    currentSeasonAllFoods.forEach((f) => {
      if (counts[f.category] !== undefined) {
        counts[f.category] += 1;
      }
    });

    return counts;
  }, [currentSeasonAllFoods]);

  // Filtered foods by search query OR category
  const displayedFoods = useMemo(() => {
    if (isSearching) {
      const q = searchQuery.trim().toLowerCase();
      return foods.filter(
        (f) =>
          f.nameEn.toLowerCase().includes(q) ||
          f.nameJa.toLowerCase().includes(q)
      );
    }

    if (selectedCategory === "ALL") {
      return currentSeasonAllFoods;
    }
    return currentSeasonAllFoods.filter((f) => f.category === selectedCategory);
  }, [foods, isSearching, searchQuery, selectedCategory, currentSeasonAllFoods]);

  // Trigger celebratory confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#5DBBB0", "#66B29F", "#B88760", "#F4D35E", "#FAF8F5"],
      });
    } catch {
      // Ignored
    }
  };

  // Optimistic Toggle ON/OFF with user-isolated localStorage persistence
  const handleToggleFood = async (foodId: string, nextState: boolean) => {
    const userId = currentUser?.id || "anonymous";

    setFoods((prev) => {
      const updated = prev.map((item) =>
        item.id === foodId
          ? {
              ...item,
              isEaten: nextState,
              eatenAt: nextState ? new Date().toISOString() : null,
            }
          : item
      );

      try {
        let currentChecks: Record<string, boolean> = {};
        const saved = localStorage.getItem(`seasonal_checks_${userId}_${year}`);
        if (saved) currentChecks = JSON.parse(saved);

        if (nextState) {
          currentChecks[foodId] = true;
        } else {
          delete currentChecks[foodId];
        }
        localStorage.setItem(`seasonal_checks_${userId}_${year}`, JSON.stringify(currentChecks));
      } catch {}

      return updated;
    });

    if (nextState) {
      const seasonItems = foods.filter((f) => f.season === currentSeason);
      const remainingUnchecked = seasonItems.filter(
        (f) => f.id !== foodId && !f.isEaten
      );
      if (remainingUnchecked.length === 0) {
        triggerConfetti();
      }
    }

    try {
      await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          foodItemId: foodId,
          isEaten: nextState,
          userId: currentUser?.id || null,
        }),
      });
    } catch (err) {
      console.warn("Background check persist note:", err);
    }
  };

  const handleSaveFood = async (
    id: string,
    data: {
      nameEn: string;
      nameJa: string;
      category: CategoryType;
      season: SeasonType;
      iconUrl: string;
    }
  ) => {
    setFoods((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...data } : item));
      try {
        const customItems = updated.filter((f) => f.id.startsWith("custom-") || f.id.startsWith("temp-"));
        localStorage.setItem("seasonal_custom_foods", JSON.stringify(customItems));
      } catch {}
      return updated;
    });

    try {
      await fetch(`/api/foods/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error("Failed to save food on server:", err);
    }
  };

  const handleDeleteFood = async (id: string) => {
    setFoods((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        const customItems = updated.filter((f) => f.id.startsWith("custom-") || f.id.startsWith("temp-"));
        localStorage.setItem("seasonal_custom_foods", JSON.stringify(customItems));
      } catch {}
      return updated;
    });

    try {
      await fetch(`/api/foods/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete food on server:", err);
    }
  };

  const handleAddFood = async (data: {
    nameEn: string;
    nameJa: string;
    category: CategoryType;
    season: SeasonType;
    iconUrl: string;
  }) => {
    const customId = `custom-${Date.now()}`;
    const newItem: FoodWithCheck = {
      id: customId,
      userId: currentUser?.id || null,
      ...data,
      sortOrder: foods.length + 1,
      isEaten: false,
      eatenAt: null,
    };

    setFoods((prev) => {
      const updated = [...prev, newItem];
      try {
        const customItems = updated.filter((f) => f.id.startsWith("custom-") || f.id.startsWith("temp-"));
        localStorage.setItem("seasonal_custom_foods", JSON.stringify(customItems));
      } catch {}
      return updated;
    });

    try {
      await fetch("/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId: currentUser?.id || null }),
      });
    } catch (err) {
      console.warn("Add food background sync note:", err);
    }
  };

  const currentMeta = SEASON_META[currentSeason];
  const eatenInView = displayedFoods.filter((f) => f.isEaten).length;

  return (
    <main
      data-season={currentSeason}
      className="min-h-screen bg-[#FAF8F5] flex flex-col items-center pb-16 transition-colors duration-300 relative"
    >
      {/* Top Tiffany Blue Accent Ribbon Line */}
      <div className="w-full h-1 bg-gradient-to-r from-[#5DBBB0] via-[#85D4CA] to-[#5DBBB0] shadow-xs" />

      <div className="w-full max-w-xl flex flex-col px-3.5 sm:px-6">
        {/* Top Header */}
        <Header
          year={year}
          onYearChange={(newYear) => setYear(newYear)}
          totalStats={totalStats}
          themeAccent={currentMeta.accent}
          currentUser={currentUser}
          onOpenUserModal={() => setIsUserModalOpen(true)}
        />

        {/* Search Bar */}
        <div className="mt-3">
          <SearchBar
            value={searchQuery}
            onChange={(q) => setSearchQuery(q)}
            placeholder="Search tastes (e.g. 桃, Strawberry, 筍, 鰹)..."
          />
        </div>

        {/* Season Navigation Tabs & Category Filters (Hidden when searching) */}
        {!isSearching && (
          <>
            {/* Season Navigation Tabs */}
            <div className="mt-3">
              <SeasonTabs
                currentSeason={currentSeason}
                onSelectSeason={(season) => setCurrentSeason(season)}
                seasonCounts={seasonCounts}
              />
            </div>

            {/* Category Filter Pills */}
            <div className="mt-3">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                categoryCounts={categoryCounts}
                themeAccent={currentMeta.accent}
              />
            </div>
          </>
        )}

        {/* Heading, Mini Stats & Quick Add Button (Right above the items grid!) */}
        <div className="mt-4 sm:mt-5 mb-3 flex items-center justify-between px-1 gap-2">
          <div>
            {isSearching ? (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#3F9A90] font-semibold tracking-wide">
                  <Search className="w-3.5 h-3.5 text-[#5DBBB0]" />
                  <span>ALL SEASONS SEARCH</span>
                </div>
                <h2 className="font-serif-title text-base sm:text-lg font-bold text-[#3D322C] tracking-wide mt-0.5">
                  &ldquo;{searchQuery}&rdquo; Results
                </h2>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#3F9A90] font-semibold tracking-wide">
                  <span>{currentMeta.emoji}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#EBF8F6] border border-[#5DBBB0]/30">
                    {currentMeta.subEn}
                  </span>
                  {isSyncing && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DBBB0] animate-ping ml-1" />
                  )}
                </div>
                <h2 className="font-serif-title text-lg sm:text-xl font-bold text-[#3D322C] tracking-wide mt-0.5">
                  {currentMeta.titleEn}
                </h2>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Stats Badge */}
            <div className="text-right flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-[#5DBBB0]/25 shadow-xs">
              <span className="text-[11px] sm:text-xs font-serif-title font-semibold text-[#3D322C]">
                {eatenInView}/{displayedFoods.length}
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#3F9A90]">
                {displayedFoods.length > 0
                  ? Math.round((eatenInView / displayedFoods.length) * 100)
                  : 0}
                %
              </span>
            </div>

            {/* Quick Add Food Button directly above the food items grid */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-xl bg-[#5DBBB0] hover:bg-[#3F9A90] text-white shadow-[0_3px_10px_-1px_rgba(93,187,176,0.4)] transition-all text-xs font-semibold cursor-pointer active:scale-95 flex-shrink-0"
              title="Add new seasonal food item"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="font-serif-title tracking-wide text-[11px] sm:text-xs">Add</span>
            </button>
          </div>
        </div>

        {/* Food Items Grid */}
        {displayedFoods.length === 0 ? (
          <div className="w-full p-8 rounded-2xl bg-white border border-[#5DBBB0]/30 text-center my-4 flex flex-col items-center gap-3 shadow-xs">
            <Calendar className="w-8 h-8 text-[#5DBBB0]" />
            <div>
              <p className="font-serif-title text-sm font-semibold text-[#3D322C]">
                {isSearching ? `No items matching "${searchQuery}"` : "No items found in this category"}
              </p>
              <p className="text-xs text-[#8C7E75] mt-0.5">
                {isSearching
                  ? "Try searching in Japanese (e.g. 桃) or English (e.g. Peach)"
                  : "Add your favorite seasonal fruit or food to get started!"}
              </p>
            </div>
            {isSearching ? (
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 rounded-xl bg-[#EBF8F6] text-[#3F9A90] text-xs font-semibold hover:bg-[#5DBBB0] hover:text-white transition-all cursor-pointer mt-1"
              >
                Clear Search
              </button>
            ) : (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5DBBB0] hover:bg-[#3F9A90] text-white text-xs font-semibold shadow-[0_4px_12px_-2px_rgba(93,187,176,0.35)] transition-all cursor-pointer mt-1"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add New Item</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3.5">
            {displayedFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                themeAccent={SEASON_META[food.season]?.accent || currentMeta.accent}
                onToggle={handleToggleFood}
                onEdit={(target) => setEditingFood(target)}
                showSeasonBadge={isSearching}
              />
            ))}
          </div>
        )}

        {/* Footer info / tip */}
        <div className="mt-8 pt-4 border-t border-[#5DBBB0]/20 text-center flex flex-col items-center gap-1">
          <p className="text-[11px] text-[#3F9A90] font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#5DBBB0]" />
            Tap an icon to mark as tasted. Long press or click edit to customize icon.
          </p>
          <p className="text-[10px] text-[#8C7E75] font-serif-title tracking-wider mt-0.5">
            SEASONAL © {year} — Minimal Taste Journal
          </p>
        </div>
      </div>

      {/* Sync / Loading Interaction Blocker Overlay */}
      <SyncOverlay
        isVisible={isSyncing}
        message={
          currentUser
            ? `Syncing ${currentUser.name}'s seasonal journal...`
            : "Syncing seasonal tastes..."
        }
      />

      {/* Customize / Upload Modal */}
      {editingFood && (
        <CustomizeFoodModal
          food={editingFood}
          isOpen={!!editingFood}
          onClose={() => setEditingFood(null)}
          onSave={handleSaveFood}
          onDelete={handleDeleteFood}
        />
      )}

      {/* Add New Food Modal */}
      {isAddModalOpen && (
        <AddFoodModal
          initialSeason={currentSeason}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddFood}
        />
      )}

      {/* Login & User Profile Switcher Modal */}
      <LoginModal
        isOpen={isUserModalOpen}
        currentUser={currentUser}
        onClose={() => setIsUserModalOpen(false)}
        onSelectUser={handleSelectUser}
      />
    </main>
  );
}
