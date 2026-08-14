"use client";

import React from "react";
import { CategoryType } from "@/lib/initialData";

export type CategoryFilterType = "ALL" | CategoryType;

interface CategoryFilterProps {
  selectedCategory: CategoryFilterType;
  onSelectCategory: (category: CategoryFilterType) => void;
  categoryCounts: Record<CategoryFilterType, number>;
  themeAccent: string;
}

const CATEGORIES: {
  key: CategoryFilterType;
  labelEn: string;
  labelJa: string;
  emoji: string;
}[] = [
  { key: "ALL", labelEn: "ALL", labelJa: "すべて", emoji: "✨" },
  { key: "FRUIT", labelEn: "FRUIT", labelJa: "果物", emoji: "🍓" },
  { key: "VEGETABLE", labelEn: "VEGGIE", labelJa: "野菜・山菜", emoji: "🥬" },
  { key: "SEAFOOD", labelEn: "SEAFOOD", labelJa: "魚介", emoji: "🐟" },
  { key: "OTHER", labelEn: "OTHER", labelJa: "その他", emoji: "🍄" },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  themeAccent,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-1.5 min-w-max px-0.5">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.key;
          const count = categoryCounts[cat.key] || 0;

          if (cat.key !== "ALL" && count === 0) return null;

          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#5DBBB0] text-white font-semibold shadow-[0_2px_8px_-1px_rgba(93,187,176,0.4)]"
                  : "bg-white/80 hover:bg-white text-[#8C7E75] hover:text-[#3D322C] border border-[#EBE4DC]"
              }`}
              style={{
                backgroundColor: isActive ? themeAccent : undefined,
              }}
            >
              <span className="text-xs">{cat.emoji}</span>
              <span className="font-serif-title tracking-wider text-[11px]">
                {cat.labelEn}
              </span>
              <span
                className={`text-[9.5px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-[#F4EFEB] text-[#8C7E75]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
