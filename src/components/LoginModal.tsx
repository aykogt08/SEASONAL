"use client";

import React, { useState, useEffect } from "react";
import { UserData } from "@/lib/storage";
import { Sparkles, UserPlus, Users, X, Check } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  currentUser: UserData | null;
  onClose: () => void;
  onSelectUser: (user: UserData) => void;
}

const AVATAR_OPTIONS = ["🌸", "🍑", "🍓", "🍒", "🍋", "🍇", "🥑", "🍊", "✨", "🌻", "🌿", "🥞"];

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onSelectUser,
}) => {
  const [existingUsers, setExistingUsers] = useState<UserData[]>([]);
  const [newName, setNewName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🌸");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load users from cache & fetch from server
  useEffect(() => {
    if (isOpen) {
      try {
        const cached = localStorage.getItem("seasonal_known_users");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setExistingUsers(parsed);
          }
        }
      } catch {}

      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.users) && data.users.length > 0) {
            setExistingUsers(data.users);
            try {
              localStorage.setItem("seasonal_known_users", JSON.stringify(data.users));
            } catch {}
          }
        })
        .catch((err) => console.warn("Failed to load users:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) {
      setErrorMessage("Please enter your name / nickname");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, avatar: selectedAvatar }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to register user");
      }

      const data = await res.json();
      if (data.user) {
        setExistingUsers((prev) => {
          const exists = prev.some((u) => u.id === data.user.id);
          const updated = exists ? prev : [...prev, data.user];
          try {
            localStorage.setItem("seasonal_known_users", JSON.stringify(updated));
          } catch {}
          return updated;
        });
        onSelectUser(data.user);
        setNewName("");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error creating user";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#5DBBB0]/30 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EBF8F6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#5DBBB0] to-[#3F9A90] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-title text-xl font-bold text-[#3D322C]">
                Welcome to SEASONAL
              </h2>
              <p className="text-[11px] text-[#3F9A90] font-medium">
                Choose or create your personal journal profile
              </p>
            </div>
          </div>
          {currentUser && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#8C7E75] hover:text-[#3D322C] hover:bg-[#EBF8F6] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Existing Users List */}
        {existingUsers.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C7E75] mb-2.5">
              <Users className="w-3.5 h-3.5 text-[#5DBBB0]" />
              <span>Switch to existing profile</span>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
              {existingUsers.map((user) => {
                const isCurrent = currentUser?.id === user.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => onSelectUser(user)}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl border transition-all duration-150 text-left cursor-pointer ${
                      isCurrent
                        ? "bg-[#EBF8F6] border-[#5DBBB0] shadow-xs"
                        : "bg-white hover:bg-[#FAF8F5] border-[#EBE4DC] hover:border-[#5DBBB0]/50"
                    }`}
                  >
                    <span className="text-xl">{user.avatar || "🌸"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#3D322C] truncate font-serif-title">
                        {user.name}
                      </p>
                      {isCurrent && (
                        <p className="text-[9.5px] text-[#3F9A90] font-semibold">Active</p>
                      )}
                    </div>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-[#5DBBB0] stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-[#EBE4DC]" />
              <span className="text-[10px] uppercase font-bold text-[#A89C94] tracking-wider">
                Or create new
              </span>
              <div className="flex-1 h-px bg-[#EBE4DC]" />
            </div>
          </div>
        )}

        {/* Create / New User Form */}
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#3D322C] mb-1.5 font-serif-title">
              Your Name / Nickname
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Ayaka, Emi, Ken..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#5DBBB0]/30 focus:border-[#5DBBB0] focus:ring-2 focus:ring-[#5DBBB0]/20 text-xs text-[#3D322C] placeholder-[#B8ADA6] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3D322C] mb-1.5 font-serif-title">
              Choose Avatar
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setSelectedAvatar(emoji)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                    selectedAvatar === emoji
                      ? "bg-[#5DBBB0] text-white shadow-xs scale-105 ring-2 ring-[#5DBBB0]/30"
                      : "bg-[#FAF8F5] hover:bg-[#EBF8F6] border border-[#EBE4DC]"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-[#5DBBB0] to-[#3F9A90] hover:from-[#4FA89D] hover:to-[#338279] text-white font-semibold text-xs tracking-wider shadow-[0_4px_16px_-2px_rgba(93,187,176,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
            <span>{isLoading ? "Joining..." : "Start My Seasonal Journal"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
