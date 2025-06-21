import {
  Mood,
  Genre,
  GenerateTrackRequest,
  GenerateTrackResponse,
} from "@/types";

const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";

export async function fetchMoods(): Promise<Mood[]> {
  const response = await fetch(`${API_BASE_URL}/moods`);
  if (!response.ok) {
    throw new Error("Failed to fetch moods");
  }
  return response.json();
}

export async function fetchGenres(): Promise<Genre[]> {
  const response = await fetch(`${API_BASE_URL}/genres`);
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }
  return response.json();
}

export async function generateTrack(
  request: GenerateTrackRequest
): Promise<GenerateTrackResponse> {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to generate track");
  }

  return response.json();
}

export function downloadTrack(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
