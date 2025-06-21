/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsPlaying, toggleLikeTrack } from "@/store/musicSlice";
import { downloadTrack } from "@/utils/api";
import { Play, Pause, Download, Heart } from "lucide-react";

export default function TrackPreview() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector(
    (state: RootState) => state.music
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      dispatch(setIsPlaying(false));
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleLike = () => {
    if (currentTrack) {
      dispatch(toggleLikeTrack(currentTrack.id));
    }
  };

  const handleDownload = () => {
    if (currentTrack) {
      downloadTrack(currentTrack.url, `${currentTrack.title}.mp3`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentTrack)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 rounded-2xl p-6 border border-dark-600/50 flex flex-col items-center justify-center min-h-[300px] text-center"
      >
        <div className="text-6xl mb-4 opacity-50">🎵</div>
        <h3 className="text-xl font-medium text-white/70 mb-2">
          No track selected
        </h3>
        <p className="text-gray-400 text-sm">
          Choose your mood and genre to generate your first track!
        </p>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800 rounded-2xl p-6 border border-dark-600"
    >
      <audio ref={audioRef} src={currentTrack.url} />

      <div className="space-y-4">
        {/* Track Info */}
        <div className="text-center">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 4,
              repeat: isPlaying ? Infinity : 0,
              ease: "linear",
            }}
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <div className="text-2xl">🎵</div>
          </motion.div>

          <h3 className="text-xl font-bold text-white mb-2">
            {currentTrack.title}
          </h3>

          <div className="flex justify-center gap-2 mb-4">
            <span className="px-3 py-1 bg-pink-500/40 text-pink-400 rounded-full text-sm">
              {currentTrack.mood}
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
              {currentTrack.genre}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
            />
          </div>

          {/* 0.00 */}
          {/* <div className="flex text-white justify-between text-sm text-dark-300">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div> */}
        </div>

        {/* Controls */}
        <div className="flex justify-center text-white items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`p-3 rounded-full transition-colors ${
              currentTrack.liked
                ? "bg-red-500 text-white"
                : "bg-dark-700 text-dark-300 hover:bg-dark-600"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${currentTrack.liked ? "fill-current" : ""}`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="p-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full text-white shadow-lg hover:shadow-xl"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDownload}
            className="p-3 rounded-full bg-dark-700 text-dark-300 hover:bg-dark-600 transition-colors"
          >
            <Download className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
