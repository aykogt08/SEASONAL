"use client";

import React, { useState, useRef } from "react";
import { X, Upload, Trash2, Image as ImageIcon, Check } from "lucide-react";
import { FoodWithCheck } from "@/lib/storage";
import { SeasonType, CategoryType } from "@/lib/initialData";

interface CustomizeFoodModalProps {
  food: FoodWithCheck;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    id: string,
    data: {
      nameEn: string;
      nameJa: string;
      category: CategoryType;
      season: SeasonType;
      iconUrl: string;
    }
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const CustomizeFoodModal: React.FC<CustomizeFoodModalProps> = ({
  food,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const [nameEn, setNameEn] = useState(food.nameEn);
  const [nameJa, setNameJa] = useState(food.nameJa);
  const [category, setCategory] = useState<CategoryType>(food.category);
  const [season, setSeason] = useState<SeasonType>(food.season);
  const [iconUrl, setIconUrl] = useState(food.iconUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setIconUrl(base64);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("File read error:", err);
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setIconUrl(base64);
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim()) return;

    setIsSaving(true);
    try {
      await onSave(food.id, {
        nameEn: nameEn.trim().toUpperCase(),
        nameJa: nameJa.trim(),
        category,
        season,
        iconUrl,
      });
      onClose();
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${food.nameEn}"?`)) return;

    setIsDeleting(true);
    try {
      await onDelete(food.id);
      onClose();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#5DBBB0]/30 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EBF8F6]">
          <div>
            <h2 className="font-serif-title text-lg sm:text-xl font-bold text-[#3D322C]">
              Customize Food
            </h2>
            <p className="text-[11px] text-[#3F9A90] font-medium">
              Update icon image and details
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8C7E75] hover:text-[#3D322C] hover:bg-[#EBF8F6] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Icon Upload & Preview */}
          <div>
            <label className="block text-xs font-semibold text-[#3D322C] mb-1.5 font-serif-title">
              Custom Icon Image
            </label>
            <div className="flex items-center gap-4">
              {/* Preview Box */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-white to-[#EBF8F6] border-2 border-[#5DBBB0]/40 p-2 flex items-center justify-center flex-shrink-0 shadow-xs">
                {iconUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={iconUrl}
                    alt="Preview"
                    className="w-full h-full object-contain drop-shadow-xs"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-[#5DBBB0]/60" />
                )}
              </div>

              {/* Upload Dropzone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-[#5DBBB0]/40 hover:border-[#5DBBB0] rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#EBF8F6]/40 hover:bg-[#EBF8F6]/80"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-4 h-4 text-[#5DBBB0] mb-1 stroke-[2.5]" />
                <span className="text-[11px] font-semibold text-[#3F9A90]">
                  {isUploading ? "Uploading..." : "Click or Drop custom image"}
                </span>
                <span className="text-[9px] text-[#8C7E75]">
                  PNG, JPEG, WebP, SVG
                </span>
              </div>
            </div>
          </div>

          {/* English Label */}
          <div>
            <label className="block text-xs font-semibold text-[#3D322C] mb-1 font-serif-title">
              English Label
            </label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. WHITE PEACH"
              required
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#EBE4DC] focus:border-[#5DBBB0] rounded-xl text-[#3D322C] focus:outline-none focus:ring-2 focus:ring-[#5DBBB0]/20 font-serif-title tracking-wider font-semibold"
            />
          </div>

          {/* Japanese Sub Label */}
          <div>
            <label className="block text-xs font-semibold text-[#3D322C] mb-1 font-serif-title">
              Japanese Name (Sub)
            </label>
            <input
              type="text"
              value={nameJa}
              onChange={(e) => setNameJa(e.target.value)}
              placeholder="例: 白桃"
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#EBE4DC] focus:border-[#5DBBB0] rounded-xl text-[#3D322C] focus:outline-none focus:ring-2 focus:ring-[#5DBBB0]/20"
            />
          </div>

          {/* Season & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#3D322C] mb-1 font-serif-title">
                Season
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value as SeasonType)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#EBE4DC] rounded-xl text-[#3D322C] focus:outline-none focus:border-[#5DBBB0] cursor-pointer"
              >
                <option value="SPRING">🌸 Spring (Mar - May)</option>
                <option value="SUMMER">🌻 Summer (Jun - Aug)</option>
                <option value="AUTUMN">🍁 Autumn (Sep - Nov)</option>
                <option value="WINTER">❄️ Winter (Dec - Feb)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D322C] mb-1 font-serif-title">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#EBE4DC] rounded-xl text-[#3D322C] focus:outline-none focus:border-[#5DBBB0] cursor-pointer"
              >
                <option value="FRUIT">🍓 Fruit</option>
                <option value="VEGETABLE">🥬 Vegetable</option>
                <option value="SEAFOOD">🐟 Seafood</option>
                <option value="OTHER">🍶 Other / Seasoning</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-[#F4EFEB] gap-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-[#A82D42] hover:bg-[#A82D42]/10 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#8C7E75] hover:bg-[#F4EFEB] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#5DBBB0] hover:bg-[#3F9A90] text-white shadow-[0_4px_12px_-2px_rgba(93,187,176,0.35)] transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
