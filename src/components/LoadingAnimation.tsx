"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function LoadingAnimation() {
  const isLoading = useSelector((state: RootState) => state.music.isLoading);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl p-10 border border-slate-700/50 backdrop-blur-xl overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>

      <div className="relative z-10 text-center space-y-8">
        <div className="flex justify-center">
          <motion.div className="relative">
            {/* Multiple rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-4 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 w-28 h-28 border-4 border-transparent border-b-purple-500 border-l-pink-500 rounded-full"
            />

            {/* Center pulsing circle */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.7)",
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                🎵
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.h3
            className="text-2xl font-bold text-white"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Creating Your Perfect Track
          </motion.h3>
          <p className="text-slate-300 text-lg">
            AI is composing something amazing...
          </p>
        </div>

        {/* Enhanced progress bar */}
        <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
          >
            {/* Shine effect on progress bar */}
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          </motion.div>
        </div>

        {/* Enhanced floating music notes */}
        <div className="relative h-16 overflow-hidden">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -30, y: 30, opacity: 0, scale: 0.5 }}
              animate={{
                x: 250,
                y: [30, -20, 30],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute text-2xl"
              style={{
                left: `${i * 15}px`,
                color: `hsl(${240 + i * 30}, 70%, 60%)`,
              }}
            >
              {["♪", "♫", "♬", "♩", "♯"][i % 5]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
    </motion.div>
  );
}
