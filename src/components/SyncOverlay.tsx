"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface SyncOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const SyncOverlay: React.FC<SyncOverlayProps> = ({
  isVisible,
  message = "Syncing your seasonal journal...",
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-white/40 backdrop-blur-[2px] transition-all duration-300 animate-fade-in cursor-wait select-none"
      style={{ pointerEvents: "all" }}
    >
      <div className="flex flex-col items-center gap-3 p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#5DBBB0]/40 shadow-[0_12px_36px_-4px_rgba(93,187,176,0.3)] animate-scale-in">
        {/* Animated Double Spinner with Sparkle */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-3 border-[#EBF8F6] border-t-[#5DBBB0] animate-spin" />
          <div className="absolute inset-1.5 rounded-full border-2 border-transparent border-b-[#3F9A90] animate-spin-reverse" />
          <Sparkles className="w-5 h-5 text-[#5DBBB0] animate-pulse" />
        </div>

        {/* Text Details */}
        <div className="text-center">
          <p className="font-serif-title text-sm font-bold text-[#3D322C] tracking-wide">
            {message}
          </p>
          <p className="text-[10.5px] text-[#3F9A90] font-medium mt-0.5 tracking-wider">
            Please wait a moment ✨
          </p>
        </div>
      </div>
    </div>
  );
};
