# 🎧 Wubble QuickTune Mini - AI Music Preview Generator

A beautiful, dark themed single page web application that previews music generation based on mood and genre selection.

## ✨ Features

### Core Features
- **Mood & Genre Selector**: Choose from 4 moods (Happy, Sad, Energetic, Chill) and 4 genres (Pop, Lo-fi, Cinematic, EDM)
- **Generate Button**: AI-simulated track generation with 2-second loading animation
- **Track Preview**: Complete audio player with play/pause, progress bar, and track info
- **Download Functionality**: Download generated tracks
- **Like/Favorite System**: Heart button to favorite tracks (stored in memory)

### Bonus Features
- **Dark Theme**: Sleek, modern dark UI with cool animations
- **Framer Motion Animations**: Smooth transitions and loading effects
- **Recent Tracks**: View and replay recently generated tracks
- **Redux State Management**: Centralized state with Redux Toolkit
- **API Backend**: RESTful API endpoints for moods, genres, and track generation
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── GenerateButton.tsx
│   ├── GenreSelector.tsx
│   ├── LoadingAnimation.tsx
│   ├── MoodSelector.tsx
│   ├── RecentTracks.tsx
│   └── TrackPreview.tsx
├── pages/api/
│   ├── generate.ts
│   ├── genres.ts
│   └── moods.ts
├── store/
│   ├── musicSlice.ts
│   └── store.ts
├── types/
│   └── index.ts
└── utils/
    ├── api.ts
    └── localStorage.
