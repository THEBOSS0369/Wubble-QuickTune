import type { NextApiRequest, NextApiResponse } from "next";
import { Mood } from "@/types";

const moods: Mood[] = [
  {
    id: "happy",
    name: "Happy",
    emoji: "😊",
    color: "yellow",
  },
  {
    id: "sad",
    name: "Sad",
    emoji: "😢",
    color: "blue",
  },
  {
    id: "energetic",
    name: "Energetic",
    emoji: "⚡",
    color: "orange",
  },
  {
    id: "chill",
    name: "Chill",
    emoji: "😌",
    color: "green",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Mood[]>
) {
  if (req.method === "GET") {
    res.status(200).json(moods);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
