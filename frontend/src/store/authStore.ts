import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthStore = {
  token: string | null
  setToken: (token: string) => void
  logout: () => void
}

// persist saves the token to localStorage so the session survives a page refresh
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    { name: 'auth' },
  ),
)
