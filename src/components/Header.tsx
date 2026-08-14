"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Plus, Sparkles } from "lucide-react";

interface HeaderProps {
  year: number;
  onYearChange: (newYear: number) => void;
  totalStats: { total: number; eaten: number };
  themeAccent: string;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  year,
  onYearChange,
  totalStats,
  themeAccent,
  onOpenAddModal,
}) => {
  const percentage =
    totalStats.total > 0
      ? Math.round((totalStats.eaten / totalStats.total) * 100)
      : 0;

  return (
    <header className="w-full pt-4 pb-3">
      {/* Top Bar: Brand & Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#5DBBB0] to-[#3F9A90] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif-title text-2xl sm:text-3xl font-bold tracking-widest text-[#3D322C]">
                SEASONAL
              </h1>
              <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#EBF8F6] text-[#3F9A90] font-semibold tracking-wider border border-[#5DBBB0]/30">
                Log
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#8C7E75] tracking-wider">
              YEARLY HARVEST & FRUIT JOURNAL
            </p>
          </div>
        </div>

        {/* Add Food Button (Tiffany Blue Solid) */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#5DBBB0] hover:bg-[#3F9A90] text-white shadow-[0_4px_12px_-2px_rgba(93,187,176,0.35)] hover:shadow-[0_6px_16px_-2px_rgba(93,187,176,0.45)] transition-all text-xs font-semibold cursor-pointer active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="font-serif-title tracking-wide">Add Item</span>
        </button>
      </div>

      {/* Year Controller Card */}
      <div className="mt-4 p-4 rounded-2xl bg-white border border-[#5DBBB0]/25 shadow-[0_4px_20px_-3px_rgba(93,187,176,0.08)] flex flex-col gap-3.5 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#5DBBB0]/10 to-transparent rounded-bl-full pointer-events-none" />

        {/* Year Selector */}
        <div className="flex items-center justify-between relative z-10">
          <button
            onClick={() => onYearChange(year - 1)}
            aria-label="Previous year"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5DBBB0] hover:text-[#3F9A90] hover:bg-[#EBF8F6] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-serif-title text-2xl sm:text-3xl font-bold text-[#3D322C] tracking-widest">
              {year}
            </span>
            <span className="text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#EBF8F6] text-[#3F9A90] border border-[#5DBBB0]/30 font-semibold tracking-wider">
              Edition
            </span>
          </div>

          <button
            onClick={() => onYearChange(year + 1)}
            aria-label="Next year"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5DBBB0] hover:text-[#3F9A90] hover:bg-[#EBF8F6] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-[#F4EFEB] relative z-10">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-[#3F9A90] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5DBBB0] animate-pulse" />
              Annual Tasted
            </span>
            <span className="font-medium text-[#3D322C] tracking-wide text-xs">
              <span className="font-bold text-sm font-serif-title text-[#3D322C]">
                {totalStats.eaten}
              </span>
              <span className="text-[#B8ADA6] mx-0.5">/</span>
              <span className="text-[#8C7E75]">{totalStats.total} items</span>
              <span
                className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded-md bg-[#EBF8F6] text-[#3F9A90]"
              >
                {percentage}%
              </span>
            </span>
          </div>

          {/* Progress Bar Line */}
          <div className="w-full h-2 bg-[#EBF8F6] rounded-full overflow-hidden p-0.5 border border-[#5DBBB0]/20">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-[#5DBBB0] to-[#3F9A90] shadow-xs"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
