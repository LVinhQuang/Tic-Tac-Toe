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
                score: "",
            },
            isInRoom: "",
            setUserDetails: (details: object) => set({ ...details })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useUserStore;