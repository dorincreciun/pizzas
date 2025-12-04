import {create} from "zustand/react";
import type {IAuthModalStore} from "./authModal.types";

export const useAuthModal = create<IAuthModalStore>()((set) => {
    return {
        currentView: "LOGIN",
        isOpen: false,

        open: () => set({isOpen: true}),
        close: () => set({isOpen: false}),
        setView: (view) => set({currentView: view})
    }
})