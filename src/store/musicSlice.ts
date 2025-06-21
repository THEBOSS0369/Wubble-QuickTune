import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Track {
  id: string;
  title: string;
  mood: string;
  genre: string;
  url: string;
  duration: number;
  liked: boolean;
}

interface MusicState {
  currentTrack: Track | null;
  recentTracks: Track[];
  likedTracks: Track[];
  isPlaying: boolean;
  isLoading: boolean;
  selectedMood: string;
  selectedGenre: string;
}

const initialState: MusicState = {
  currentTrack: null,
  recentTracks: [],
  likedTracks: [],
  isPlaying: false,
  isLoading: false,
  selectedMood: "",
  selectedGenre: "",
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setMood: (state, action: PayloadAction<string>) => {
      state.selectedMood = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      // Add to recent tracks
      const existingIndex = state.recentTracks.findIndex(
        (track) => track.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.recentTracks.splice(existingIndex, 1);
      }
      state.recentTracks.unshift(action.payload);
      if (state.recentTracks.length > 10) {
        state.recentTracks = state.recentTracks.slice(0, 10);
      }
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleLikeTrack: (state, action: PayloadAction<string>) => {
      const trackId = action.payload;
      const likedIndex = state.likedTracks.findIndex(
        (track) => track.id === trackId
      );

      if (likedIndex >= 0) {
        state.likedTracks.splice(likedIndex, 1);
      } else if (state.currentTrack && state.currentTrack.id === trackId) {
        state.likedTracks.push(state.currentTrack);
      }

      // Update current track liked status
      if (state.currentTrack && state.currentTrack.id === trackId) {
        state.currentTrack.liked = !state.currentTrack.liked;
      }

      // Update recent tracks liked status
      const recentTrackIndex = state.recentTracks.findIndex(
        (track) => track.id === trackId
      );
      if (recentTrackIndex >= 0) {
        state.recentTracks[recentTrackIndex].liked =
          !state.recentTracks[recentTrackIndex].liked;
      }
    },
    loadFromLocalStorage: (
      state,
      action: PayloadAction<{ recentTracks: Track[]; likedTracks: Track[] }>
    ) => {
      state.recentTracks = action.payload.recentTracks;
      state.likedTracks = action.payload.likedTracks;
    },
  },
});

export const {
  setMood,
  setGenre,
  setCurrentTrack,
  setIsPlaying,
  setIsLoading,
  toggleLikeTrack,
  loadFromLocalStorage,
} = musicSlice.actions;

export default musicSlice.reducer;
