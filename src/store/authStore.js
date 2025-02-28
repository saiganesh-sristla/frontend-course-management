import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,

      setUser: (user, token, role) => set({ user, token, role }),
      logout: () => {
        set({ user: null, token: null, role: null });
        localStorage.removeItem('authToken');
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
