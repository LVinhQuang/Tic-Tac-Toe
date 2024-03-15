import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


const useUserStore = create(
    persist(
        (set, get) => ({
            isInitialized: false,
            isLoggedIn: false,
            user: {
                fullname: "",
                email: "",
            },
            setUserDetails: (details: object) => set({ ...details })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserStore;