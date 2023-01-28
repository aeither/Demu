import { create } from "zustand"

interface StoreState {
  musicUrl: string
  cover: string

  setMusicUrl: (musicUrl: string) => void
  setCover: (cover: string) => void
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
}))

export default useStore
