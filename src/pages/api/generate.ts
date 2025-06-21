import type { NextApiRequest, NextApiResponse } from "next";
import { GenerateTrackRequest, GenerateTrackResponse } from "@/types";

// Mock track database with royalty-free sample URLs
const sampleTracks: Record<string, Record<string, string[]>> = {
  happy: {
    pop: ["/tracks/happy_pop_2.mp3"],
    lofi: ["/tracks/happy_lofi_1.mp3"],
    cinematic: ["/tracks/happy_cinematic_1.mp3"],
    edm: ["/tracks/happy_edm_1.mp3"],
  },
  sad: {
    pop: ["/tracks/sad_pop.mp3"],
    lofi: ["/tracks/sad_lofi.mp3"],
    cinematic: ["/tracks/sad_cinematic.mp3"],
    edm: ["/tracks/sad_edm.mp3"],
  },
  energetic: {
    pop: ["/tracks/energetic_pop.mp3"],
    lofi: ["/tracks/energetic_lofi.mp3"],
    cinematic: ["/tracks/energetic_cinematic.mp3"],
    edm: ["/tracks/energetic_edm.mp3"],
  },
  chill: {
    pop: ["/tracks/chill_pop.mp3"],
    lofi: ["/tracks/chill_lofi.mp3"],
    cinematic: ["/tracks/chill_cinematic.mp3"],
    edm: ["/tracks/chill_edm.mp3"],
  },
};

// Generate track titles based on mood and genre
const generateTrackTitle = (mood: string, genre: string): string => {
  const moodWords: Record<string, string[]> = {
    happy: ["Sunshine", "Rainbow", "Joy", "Bright", "Golden"],
    sad: ["Melancholy", "Rain", "Tears", "Blue", "Sorrow"],
    energetic: ["Thunder", "Electric", "Power", "Rush", "Fire"],
    chill: ["Breeze", "Waves", "Calm", "Peaceful", "Zen"],
  };

  const genreWords: Record<string, string[]> = {
    pop: ["Dreams", "Stars", "Dance", "Beat", "Rhythm"],
    lofi: ["Study", "Night", "Coffee", "Vinyl", "Tape"],
    cinematic: ["Epic", "Journey", "Adventure", "Story", "Symphony"],
    edm: ["Drop", "Bass", "Pulse", "Synth", "Rave"],
  };

  const moodWord =
    moodWords[mood]?.[Math.floor(Math.random() * moodWords[mood].length)] ||
    "Unknown";
  const genreWord =
    genreWords[genre]?.[Math.floor(Math.random() * genreWords[genre].length)] ||
    "Track";

  return `${moodWord} ${genreWord}`;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateTrackResponse | { error: string }>
) {
  if (req.method === "POST") {
    const { mood, genre }: GenerateTrackRequest = req.body;

    if (!mood || !genre) {
      return res.status(400).json({ error: "Mood and genre are required" });
    }

    // Get available tracks for the mood/genre combination
    const availableTracks = sampleTracks[mood]?.[genre];

    if (!availableTracks || availableTracks.length === 0) {
      return res
        .status(404)
        .json({ error: "No tracks available for this mood/genre combination" });
    }

    // Select a random track
    const randomTrack =
      availableTracks[Math.floor(Math.random() * availableTracks.length)];

    // Generate response
    const response: GenerateTrackResponse = {
      id: `${mood}-${genre}-${Date.now()}`,
      title: generateTrackTitle(mood, genre),
      mood: mood.charAt(0).toUpperCase() + mood.slice(1),
      genre: genre.charAt(0).toUpperCase() + genre.slice(1),
      url: randomTrack,
      duration: Math.floor(Math.random() * 180) + 60, // Random duration between 1-4 minutes
      liked: false,
    };

    res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
