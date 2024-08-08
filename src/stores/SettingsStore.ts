import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type SettingsState = {
  pitch: number
  rate: number
}

type SettingsActions = {
  updatePitch: (newValue: number) => void
  updateRate: (newValue: number) => void
}

type SettingsStore = SettingsState & SettingsActions

const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    pitch: 1,
    rate: 1,
    updatePitch: (newValue) => set((state) => (state.pitch = newValue)),
    updateRate: (newValue) => set((state) => (state.rate = newValue)),
  }))
)

export default useSettingsStore
