"use client";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCurrentTrack, setIsLoading } from "@/store/musicSlice";
import { generateTrack } from "@/utils/api";
import { Sparkles, Zap } from "lucide-react";

export default function GenerateButton() {
  const dispatch = useDispatch();
  const { selectedMood, selectedGenre, isLoading } = useSelector(
    (state: RootState) => state.music
  );

  const handleGenerate = async () => {
    if (!selectedMood || !selectedGenre || isLoading) return;

    dispatch(setIsLoading(true));

    try {
      const track = await generateTrack({
        mood: selectedMood,
        genre: selectedGenre,
      });

      // Simulate 2-second loading animation
      setTimeout(() => {
        dispatch(setCurrentTrack(track));
        dispatch(setIsLoading(false));
      }, 2000);
    } catch (error) {
      console.error("Failed to generate track:", error);
      dispatch(setIsLoading(false));
    }
  };

  const isDisabled = !selectedMood || !selectedGenre || isLoading;

  return (
    <div className="flex justify-center">
      <motion.button
        whileHover={!isDisabled ? { scale: 1.05, y: -2 } : {}}
        whileTap={!isDisabled ? { scale: 0.95 } : {}}
        onClick={handleGenerate}
        disabled={isDisabled}
        className={`group relative px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-4 overflow-hidden backdrop-blur-sm ${
          isDisabled
            ? "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-400 cursor-not-allowed border border-slate-600"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-indigo-500/25 border border-indigo-500/30"
        }`}
      >
        {/* Animated background gradient */}
        {!isDisabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        )}

        {/* Shine effect */}
        {!isDisabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        )}

        <div className="relative z-10 flex items-center gap-4">
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <span>Generating Magic...</span>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="w-6 h-6" />
              </motion.div>
              <span>Generate Track</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </>
          )}
        </div>

        {/* Glow effect */}
        {!isDisabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
        )}
      </motion.button>
    </div>
  );
}
