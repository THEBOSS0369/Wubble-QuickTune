"use client";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCurrentTrack, Track } from "@/store/musicSlice";
import { Clock, Heart, Play, Pause, Music } from "lucide-react";

export default function RecentTracks() {
  const dispatch = useDispatch();
  const { recentTracks, currentTrack, isPlaying } = useSelector(
    (state: RootState) => state.music
  );

  const handleTrackSelect = (track: Track) => {
    dispatch(setCurrentTrack(track));
  };

  if (recentTracks.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-inner">
            <Clock className="w-5 h-5 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-white">Recent Tracks</h3>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <Music className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No tracks yet</p>
            <p className="text-slate-500 text-sm mt-1">
              Generate your first track to get started!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Recent Tracks</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
      </div>

      <div className="space-y-3">
        {recentTracks.slice(0, 5).map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            onClick={() => handleTrackSelect(track)}
            className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-sm ${
              currentTrack?.id === track.id
                ? "bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border border-indigo-500/40 shadow-lg shadow-indigo-500/10"
                : "bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border border-slate-700/50 hover:border-slate-600/50"
            }`}
          >
            {/* Animated background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Album art placeholder */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg ${
                    currentTrack?.id === track.id
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                      : "bg-gradient-to-br from-slate-600 to-slate-700 text-slate-300"
                  }`}
                >
                  {currentTrack?.id === track.id && isPlaying ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      🎧
                    </motion.div>
                  ) : (
                    "🎧 "
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white mb-2 truncate">
                    {track.title}
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 text-indigo-300 rounded-full text-xs font-medium border border-indigo-500/20">
                      {track.mood}
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/20">
                      {track.genre}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {track.liked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-full shadow-lg shadow-red-500/20"
                  >
                    <Heart className="w-4 h-4 text-white fill-current" />
                  </motion.div>
                )}

                {/* Play indicator */}
                {currentTrack?.id === track.id && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg shadow-green-500/20"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
