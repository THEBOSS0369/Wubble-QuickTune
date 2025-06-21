"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setMood } from "@/store/musicSlice";
import { fetchMoods } from "@/utils/api";
import { Mood } from "@/types";

export default function MoodSelector() {
  const dispatch = useDispatch();
  const selectedMood = useSelector(
    (state: RootState) => state.music.selectedMood
  );
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMoods = async () => {
      try {
        const moodsData = await fetchMoods();
        setMoods(moodsData);
      } catch (error) {
        console.error("Failed to load moods:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMoods();
  }, []);

  const handleMoodSelect = (moodId: string) => {
    dispatch(setMood(moodId));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-inner animate-pulse">
            <div className="w-5 h-5 bg-slate-600 rounded"></div>
          </div>
          <h3 className="text-xl font-bold text-white">Choose Your Mood</h3>
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
        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-amber-500/20">
          <span className="text-lg">️💜</span>
        </div>
        <h3 className="text-xl font-bold text-white">Choose Your Mood</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {moods.map((mood, index) => (
          <motion.button
            key={mood.id}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(mood.id)}
            className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden ${
              selectedMood === mood.id
                ? `border-${mood.color}-400 bg-gradient-to-br from-${mood.color}-600/30 via-${mood.color}-500/20 to-${mood.color}-600/30 shadow-2xl shadow-${mood.color}-500/25`
                : "border-slate-700 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:border-slate-600 hover:from-slate-700/80 hover:to-slate-800/80"
            }`}
          >
            {/* Animated background */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                selectedMood === mood.id ? "opacity-20" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-${mood.color}-600/20 to-${mood.color}-500/10`}
              ></div>
            </div>

            {/* Glow effect for selected */}
            {selectedMood === mood.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute inset-0 bg-gradient-to-br from-${mood.color}-500/20 to-${mood.color}-600/10 rounded-2xl`}
              />
            )}

            <div className="relative z-10">
              <motion.div
                className="text-3xl mb-3"
                animate={selectedMood === mood.id ? { scale: [1, 1.2, 1] } : {}}
                transition={{
                  duration: 0.6,
                  repeat: selectedMood === mood.id ? Infinity : 0,
                  repeatDelay: 2,
                }}
              >
                {mood.emoji}
              </motion.div>
              <div className="text-white font-semibold text-sm">
                {mood.name}
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
