import type { NextApiRequest, NextApiResponse } from "next";
import { Genre } from "@/types";

const genres: Genre[] = [
  {
    id: "pop",
    name: "Pop",
    emoji: "🎤",
    color: "pink",
  },
  {
    id: "lofi",
    name: "Lo-fi",
    emoji: "🎧",
    color: "purple",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    emoji: "🎬",
    color: "indigo",
  },
  {
    id: "edm",
    name: "EDM",
    emoji: "🎛️",
    color: "cyan",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Genre[]>
) {
  if (req.method === "GET") {
    res.status(200).json(genres);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
