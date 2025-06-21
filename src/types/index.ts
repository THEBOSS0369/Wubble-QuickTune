export interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Genre {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface GenerateTrackRequest {
  mood: string;
  genre: string;
}

export interface GenerateTrackResponse {
  id: string;
  title: string;
  mood: string;
  genre: string;
  url: string;
  duration: number;
  liked: boolean;
}
