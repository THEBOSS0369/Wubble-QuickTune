"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setGenre } from "@/store/musicSlice";
import { fetchGenres } from "@/utils/api";
import { Genre } from "@/types";

export default function GenreSelector() {
  const dispatch = useDispatch();
  const selectedGenre = useSelector(
    (state: RootState) => state.music.selectedGenre
  );
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Failed to load genres:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  const handleGenreSelect = (genreId: string) => {
    dispatch(setGenre(genreId));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-inner animate-pulse">
            <div className="w-5 h-5 bg-slate-600 rounded"></div>
          </div>
          <h3 className="text-xl font-bold text-white">Select Genre</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg shadow-purple-500/20">
          <span className="text-lg text-white">🎧</span>
        </div>
        <h3 className="text-xl font-bold text-white">Select Genre</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {genres.map((genre, index) => (
          <motion.button
            key={genre.id}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGenreSelect(genre.id)}
            className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden ${
              selectedGenre === genre.id
                ? `border-${genre.color}-400 bg-gradient-to-br from-${genre.color}-600/30 via-${genre.color}-500/20 to-${genre.color}-600/30 shadow-2xl shadow-${genre.color}-500/25`
                : "border-slate-700 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:border-slate-600 hover:from-slate-700/80 hover:to-slate-800/80"
            }`}
          >
            {/* Animated background */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                selectedGenre === genre.id ? "opacity-20" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-${genre.color}-600/20 to-${genre.color}-500/10`}
              ></div>
            </div>

            {/* Glow effect for selected */}
            {selectedGenre === genre.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute inset-0 bg-gradient-to-br from-${genre.color}-500/20 to-${genre.color}-600/10 rounded-2xl`}
              />
            )}

            <div className="relative z-10">
              <motion.div
                className="text-3xl mb-3"
                animate={
                  selectedGenre === genre.id ? { scale: [1, 1.2, 1] } : {}
                }
                transition={{
                  duration: 0.6,
                  repeat: selectedGenre === genre.id ? Infinity : 0,
                  repeatDelay: 2,
                }}
              >
                {genre.emoji}
              </motion.div>
              <div className="text-white font-semibold text-sm">
                {genre.name}
              </div>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
