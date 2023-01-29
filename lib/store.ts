import { Howl } from "howler"
import { create } from "zustand"

interface CurrentPlaying {
  url: string
  isPlaying: boolean
  name: string
  artist: string
  cover: string
}
interface StoreState {
  musicUrl: string
  cover: string

  playingHowler: Howl | undefined
  currentPlaying: CurrentPlaying

  setMusicUrl: (musicUrl: string) => void
  setCover: (cover: string) => void

  setPlayingHowler: (playingHowler: Howl) => void
  setCurrentPlaying: (currentPlaying: CurrentPlaying) => void
}

const useStore = create<StoreState>((set) => ({
  musicUrl: "",
  setMusicUrl: (musicUrl) =>
    set((state) => ({
      ...state,
      musicUrl,
    })),

  cover: "",
  setCover: (cover) =>
    set((state) => ({
      ...state,
      cover,
    })),

  playingHowler: undefined,
  setPlayingHowler: (playingHowler: Howl) =>
    set((state) => ({
      ...state,
      playingHowler,
    })),

  currentPlaying: undefined,
  setCurrentPlaying: (currentPlaying: CurrentPlaying) =>
    set((state) => ({
      ...state,
      currentPlaying,
    })),
}))

export default useStore
