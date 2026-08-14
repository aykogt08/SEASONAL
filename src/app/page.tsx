"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import confetti from "canvas-confetti";
import { Header } from "@/components/Header";
import { SeasonTabs } from "@/components/SeasonTabs";
import { CategoryFilter, CategoryFilterType } from "@/components/CategoryFilter";
import { FoodCard } from "@/components/FoodCard";
import { CustomizeFoodModal } from "@/components/CustomizeFoodModal";
import { AddFoodModal } from "@/components/AddFoodModal";
import { FoodWithCheck } from "@/lib/storage";
import { SeasonType, CategoryType } from "@/lib/initialData";
import { Sparkles, Calendar, Plus } from "lucide-react";

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

export default function Home() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [currentSeason, setCurrentSeason] = useState<SeasonType>(getCurrentSeasonFromDate());
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>("ALL");
  const [foods, setFoods] = useState<FoodWithCheck[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingFood, setEditingFood] = useState<FoodWithCheck | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Fetch foods for the selected year
  const fetchFoods = useCallback(async (targetYear: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/foods?year=${targetYear}`);
      if (res.ok) {
        const data = await res.json();
        setFoods(data.foods || []);
      }
    } catch (err) {
      console.error("Failed to load foods:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods(year);
  }, [year, fetchFoods]);

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

  // Filtered foods by selected category
  const displayedFoods = useMemo(() => {
    if (selectedCategory === "ALL") {
      return currentSeasonAllFoods;
    }
    return currentSeasonAllFoods.filter((f) => f.category === selectedCategory);
  }, [currentSeasonAllFoods, selectedCategory]);

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

  // Optimistic Toggle ON/OFF
  const handleToggleFood = async (foodId: string, nextState: boolean) => {
    setFoods((prev) =>
      prev.map((item) =>
        item.id === foodId
          ? {
              ...item,
              isEaten: nextState,
              eatenAt: nextState ? new Date().toISOString() : null,
            }
          : item
      )
    );

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
        }),
      });
    } catch (err) {
      console.error("Failed to persist toggle:", err);
      fetchFoods(year);
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
    try {
      const res = await fetch(`/api/foods/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFoods((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...data } : item))
        );
      }
    } catch (err) {
      console.error("Failed to save food:", err);
    }
  };

  const handleDeleteFood = async (id: string) => {
    try {
      const res = await fetch(`/api/foods/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFoods((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete food:", err);
    }
  };

  const handleAddFood = async (data: {
    nameEn: string;
    nameJa: string;
    category: CategoryType;
    season: SeasonType;
    iconUrl: string;
  }) => {
    const res = await fetch("/api/foods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || "Failed to add food");
    }

    const result = await res.json();
    if (result.item) {
      setFoods((prev) => [
        ...prev,
        {
          ...result.item,
          isEaten: false,
          eatenAt: null,
        },
      ]);
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
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Season Navigation Tabs */}
        <div className="mt-2">
          <SeasonTabs
            currentSeason={currentSeason}
            onSelectSeason={(season) => {
              setCurrentSeason(season);
              // Reset category to ALL or maintain
            }}
            seasonCounts={seasonCounts}
          />
        </div>

        {/* Category Filter Pills (Fruit / Veggie / Seafood / Other) */}
        <div className="mt-3">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            categoryCounts={categoryCounts}
            themeAccent={currentMeta.accent}
          />
        </div>

        {/* Current Season Heading & Mini Stats */}
        <div className="mt-4 sm:mt-5 mb-3 flex items-end justify-between px-1">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#3F9A90] font-semibold tracking-wide">
              <span>{currentMeta.emoji}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#EBF8F6] border border-[#5DBBB0]/30">
                {currentMeta.subEn}
              </span>
            </div>
            <h2 className="font-serif-title text-lg sm:text-xl font-bold text-[#3D322C] tracking-wide mt-1">
              {currentMeta.titleEn}
            </h2>
          </div>

          <div className="text-right flex items-center gap-1.5">
            <span className="text-xs font-serif-title font-semibold text-[#3D322C]">
              {eatenInView} / {displayedFoods.length}
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EBF8F6] text-[#3F9A90] border border-[#5DBBB0]/25"
            >
              {displayedFoods.length > 0
                ? Math.round((eatenInView / displayedFoods.length) * 100)
                : 0}
              %
            </span>
          </div>
        </div>

        {/* Food Items Grid (Optimized 4 columns on mobile, 4-6 on tablet/desktop) */}
        {isLoading ? (
          <div className="w-full py-16 flex flex-col items-center justify-center text-[#3F9A90] gap-2">
            <div className="w-7 h-7 border-2 border-[#5DBBB0] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-serif-title tracking-wider font-semibold">
              Loading seasonal tastes...
            </span>
          </div>
        ) : displayedFoods.length === 0 ? (
          <div className="w-full p-8 rounded-2xl bg-white border border-[#5DBBB0]/30 text-center my-4 flex flex-col items-center gap-3 shadow-xs">
            <Calendar className="w-8 h-8 text-[#5DBBB0]" />
            <div>
              <p className="font-serif-title text-sm font-semibold text-[#3D322C]">
                No items found in this category
              </p>
              <p className="text-xs text-[#8C7E75] mt-0.5">
                Add your favorite seasonal fruit or food to get started!
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5DBBB0] hover:bg-[#3F9A90] text-white text-xs font-semibold shadow-[0_4px_12px_-2px_rgba(93,187,176,0.35)] transition-all cursor-pointer mt-1"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add New Item</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3.5">
            {displayedFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                themeAccent={currentMeta.accent}
                onToggle={handleToggleFood}
                onEdit={(target) => setEditingFood(target)}
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
    </main>
  );
}
