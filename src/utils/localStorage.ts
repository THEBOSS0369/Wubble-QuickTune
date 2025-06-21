import { Track } from "@/store/musicSlice";

const RECENT_TRACKS_KEY = "wubble_recent_tracks";
const LIKED_TRACKS_KEY = "wubble_liked_tracks";

export function saveRecentTracks(tracks: Track[]): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(RECENT_TRACKS_KEY, JSON.stringify(tracks));
    }
  } catch (error) {
    console.error("Failed to save recent tracks:", error);
  }
}

export function loadRecentTracks(): Track[] {
  try {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(RECENT_TRACKS_KEY);
      return saved ? JSON.parse(saved) : [];
    }
  } catch (error) {
    console.error("Failed to load recent tracks:", error);
  }
  return [];
}

export function saveLikedTracks(tracks: Track[]): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(LIKED_TRACKS_KEY, JSON.stringify(tracks));
    }
  } catch (error) {
    console.error("Failed to save liked tracks:", error);
  }
}

export function loadLikedTracks(): Track[] {
  try {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LIKED_TRACKS_KEY);
      return saved ? JSON.parse(saved) : [];
    }
  } catch (error) {
    console.error("Failed to load liked tracks:", error);
  }
  return [];
}
