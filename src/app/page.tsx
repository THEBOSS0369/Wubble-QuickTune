"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { motion } from "framer-motion";
import { store } from "@/store/store";
import { loadFromLocalStorage } from "@/store/musicSlice";
import { loadRecentTracks, loadLikedTracks } from "@/utils/localStorage";
import MoodSelector from "@/components/MoodSelector";
import GenreSelector from "@/components/GenreSelector";
import GenerateButton from "@/components/GenerateButton";
import LoadingAnimation from "@/components/LoadingAnimation";
import TrackPreview from "@/components/TrackPreview";
import RecentTracks from "@/components/RecentTracks";

function MainContent() {
  useEffect(() => {
    // Load data from localStorage on app start
    const recentTracks = loadRecentTracks();
    const likedTracks = loadLikedTracks();

    store.dispatch(loadFromLocalStorage({ recentTracks, likedTracks }));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // Note: In a real app with browser storage, we would save here
      // For this demo, we're keeping data in memory only
    });

    return unsubscribe;
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Beautiful Gradient Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />

      {/* Additional Atmospheric Effects */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        {/* Floating orbs for extra ambiance */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-1/4 w-32 h-32 bg-purple-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{
            duration: 3,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-40 right-1/3 w-24 h-24 bg-blue-400 rounded-full blur-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{
            duration: 2.5,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/2 right-1/4 w-40 h-40 bg-indigo-400 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 px-4 py-8 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            {/* Main Title with Glow Effect */}
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 relative"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                Wubble
              </span>
              {/* Glow effect behind text */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl -z-10 scale-110" />
            </motion.h1>

            {/* Subtitle with animated underline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative inline-block"
            >
              <p className="text-xl md:text-2xl text-gray-300 mb-4 font-medium">
                QuickTune Mini AI Music Generator
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform origin-left"
              />
            </motion.div>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center items-center gap-3 mt-6"
            >
              {/* <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
              /> */}
              <span className="text-gray-400 text-lg font-medium tracking-wide">
                Wubble QuickTune Mini AI Music Preview Generator
              </span>
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Controls */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-4 space-y-8"
            >
              {/* Mood Selector Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <MoodSelector />
                </div>
              </motion.div>

              {/* Genre Selector Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <GenreSelector />
                </div>
              </motion.div>

              {/* Generate Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GenerateButton />
              </motion.div>
            </motion.div>

            {/* Center Column - Player */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="lg:col-span-4 space-y-8"
            >
              {/* Player Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative bg-black/50 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl min-h-[400px] flex flex-col">
                  <LoadingAnimation />
                  <TrackPreview />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Recent Tracks */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="lg:col-span-4"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl h-full">
                  <RecentTracks />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Footer */}
          <motion.footer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mt-20 pb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent h-px" />
              <p className="text-gray-400 text-lg font-light tracking-wide pt-8">
                Powered by AI Music Generation <br />{" "}
                <a
                  href="https://portfolio-anujs-projects-9fef106a.vercel.app/"
                  className="underline underline-offset-4"
                >
                  Made By Anuj
                </a>
              </p>
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="flex justify-center gap-8 mt-4 text-gray-500 text-sm"
              >
                <span>Audio Synthesis</span>
              </motion.div> */}
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
}
