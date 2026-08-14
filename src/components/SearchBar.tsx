"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search seasonal tastes (e.g. 桃, Strawberry, 筍)...",
}) => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3.5 w-4 h-4 text-[#5DBBB0] pointer-events-none stroke-[2.2]" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2 rounded-2xl bg-white border border-[#5DBBB0]/30 hover:border-[#5DBBB0]/60 focus:border-[#5DBBB0] focus:ring-2 focus:ring-[#5DBBB0]/20 text-xs sm:text-sm text-[#3D322C] placeholder-[#A89C94] outline-none transition-all shadow-[0_2px_8px_-2px_rgba(93,187,176,0.06)]"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 w-5 h-5 rounded-full bg-[#EBF8F6] text-[#5DBBB0] hover:bg-[#5DBBB0] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3 h-3 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
};
