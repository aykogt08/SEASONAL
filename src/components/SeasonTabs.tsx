"use client";

import React from "react";
import { SeasonType } from "@/lib/initialData";

interface SeasonTabsProps {
  currentSeason: SeasonType;
  onSelectSeason: (season: SeasonType) => void;
  seasonCounts: Record<SeasonType, { total: number; eaten: number }>;
}

const SEASONS: {
  key: SeasonType;
  labelEn: string;
  labelJa: string;
  months: string;
  emoji: string;
  accent: string;
  bgActive: string;
  borderActive: string;
  badgeBg: string;
  badgeText: string;
}[] = [
  {
    key: "SPRING",
    labelEn: "SPRING",
    labelJa: "春",
    months: "Mar - May",
    emoji: "🌸",
    accent: "#5DBBB0",
    bgActive: "#EBF8F6",
    borderActive: "#5DBBB0",
    badgeBg: "#5DBBB0",
    badgeText: "#FFFFFF",
  },
  {
    key: "SUMMER",
    labelEn: "SUMMER",
    labelJa: "夏",
    months: "Jun - Aug",
    emoji: "🌻",
    accent: "#66B29F",
    bgActive: "#EDF6F3",
    borderActive: "#66B29F",
    badgeBg: "#66B29F",
    badgeText: "#FFFFFF",
  },
  {
    key: "AUTUMN",
    labelEn: "AUTUMN",
    labelJa: "秋",
    months: "Sep - Nov",
    emoji: "🍁",
    accent: "#B88760",
    bgActive: "#F8F3ED",
    borderActive: "#B88760",
    badgeBg: "#B88760",
    badgeText: "#FFFFFF",
  },
  {
    key: "WINTER",
    labelEn: "WINTER",
    labelJa: "冬",
    months: "Dec - Feb",
    emoji: "❄️",
    accent: "#8E756B",
    bgActive: "#F5F0EE",
    borderActive: "#8E756B",
    badgeBg: "#8E756B",
    badgeText: "#FFFFFF",
  },
];

export const SeasonTabs: React.FC<SeasonTabsProps> = ({
  currentSeason,
  onSelectSeason,
  seasonCounts,
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-white rounded-2xl border border-[#5DBBB0]/20 shadow-[0_2px_12px_-2px_rgba(93,187,176,0.06)]">
        {SEASONS.map((s) => {
          const isActive = currentSeason === s.key;
          const stats = seasonCounts[s.key] || { total: 0, eaten: 0 };
          const isCompleted = stats.total > 0 && stats.eaten === stats.total;

          return (
            <button
              key={s.key}
              onClick={() => onSelectSeason(s.key)}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "shadow-xs text-[#3D322C] font-semibold"
                  : "text-[#8C7E75] hover:text-[#3D322C] hover:bg-[#FAF8F5]"
              }`}
              style={{
                backgroundColor: isActive ? s.bgActive : "transparent",
                border: isActive ? `1.5px solid ${s.borderActive}` : "1.5px solid transparent",
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm">{s.emoji}</span>
                <span
                  className="font-serif-title text-[11px] sm:text-xs tracking-wider"
                  style={{ color: isActive ? s.accent : undefined }}
                >
                  {s.labelEn}
                </span>
              </div>

              <div className="flex items-center gap-1 mt-0.5">
                <span
                  className="text-[9.5px] sm:text-[10px] font-medium"
                  style={{ color: isActive ? s.accent : "#8C7E75" }}
                >
                  {stats.eaten}/{stats.total}
                </span>
                {isCompleted && (
                  <span
                    className="text-[8px] px-1 py-0.2 rounded-full font-bold leading-none text-white"
                    style={{ backgroundColor: s.accent }}
                  >
                    ALL
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
