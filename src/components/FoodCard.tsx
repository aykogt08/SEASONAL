"use client";

import React, { useState, useRef } from "react";
import { Check, Edit3, Sparkles } from "lucide-react";
import { FoodWithCheck } from "@/lib/storage";

interface FoodCardProps {
  food: FoodWithCheck;
  themeAccent: string;
  onToggle: (id: string, nextState: boolean) => void;
  onEdit: (food: FoodWithCheck) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  themeAccent,
  onToggle,
  onEdit,
}) => {
  const [isPopping, setIsPopping] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  const handleClick = () => {
    if (isLongPressRef.current) {
      isLongPressRef.current = false;
      return;
    }
    const next = !food.isEaten;
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 300);
    onToggle(food.id, next);
  };

  const handleTouchStart = () => {
    isLongPressRef.current = false;
    touchTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      onEdit(food);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  };

  return (
    <div className="relative group flex flex-col items-center">
      {/* Edit button (visible on hover for desktop, or top-right touch target) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(food);
        }}
        aria-label={`Edit ${food.nameEn}`}
        className="absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full bg-white text-[#5DBBB0] hover:text-[#3F9A90] hover:bg-[#EBF8F6] shadow-sm border border-[#5DBBB0]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
      >
        <Edit3 className="w-2.5 h-2.5 stroke-[2.5]" />
      </button>

      {/* Main Touch Area */}
      <button
        type="button"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={`w-full aspect-square relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 cursor-pointer select-none ${
          food.isEaten
            ? "bg-gradient-to-b from-white to-[#EBF8F6] shadow-[0_4px_16px_-2px_rgba(93,187,176,0.18)] border-2"
            : "bg-white/90 hover:bg-white border border-[#EBE4DC] hover:border-[#5DBBB0]/60 shadow-[0_2px_8px_-2px_rgba(61,50,44,0.03)]"
        } ${isPopping ? "scale-95 animate-pop" : "active:scale-95"}`}
        style={{
          borderColor: food.isEaten ? themeAccent : undefined,
          boxShadow: food.isEaten
            ? `0 0 0 1px ${themeAccent}40, 0 6px 20px -4px ${themeAccent}30`
            : undefined,
        }}
      >
        {/* Check Badge when Eaten */}
        {food.isEaten && (
          <div
            className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white shadow-xs animate-pop"
            style={{ backgroundColor: themeAccent }}
          >
            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
          </div>
        )}

        {/* Food Icon / Image */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center relative">
          {food.isEaten && (
            <div
              className="absolute inset-0 rounded-full blur-md opacity-25"
              style={{ backgroundColor: themeAccent }}
            />
          )}
          {food.iconUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={food.iconUrl}
              alt={food.nameEn}
              className={`w-full h-full object-contain relative z-10 transition-all duration-300 ${
                food.isEaten
                  ? "grayscale-0 opacity-100 filter drop-shadow-sm transform scale-105"
                  : "grayscale opacity-30 hover:opacity-50"
              }`}
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-[#EBF8F6] flex items-center justify-center text-[#5DBBB0]">
              <Sparkles className="w-5 h-5 opacity-60" />
            </div>
          )}
        </div>
      </button>

      {/* Food Labels */}
      <div className="w-full text-center mt-1.5 px-0.5 pointer-events-none">
        <p
          className={`font-serif-title text-[10px] sm:text-[11px] font-bold tracking-wide truncate leading-tight transition-colors ${
            food.isEaten ? "text-[#3D322C]" : "text-[#8C7E75]"
          }`}
          title={food.nameEn}
        >
          {food.nameEn}
        </p>
        <p className="text-[9px] sm:text-[9.5px] text-[#8C7E75] truncate font-normal leading-tight mt-0.5">
          {food.nameJa}
        </p>
      </div>
    </div>
  );
};
