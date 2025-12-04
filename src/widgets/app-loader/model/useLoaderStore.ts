import {create} from "zustand/react";

interface LoaderStore {
    activeRequests: number;
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

export const useLoaderStore = create<LoaderStore>()((set, get) => ({
    isLoading: false,
    activeRequests: 0,

    startLoading: () => {
        const next = get().activeRequests + 1
        set({isLoading: true, activeRequests: next})
    },

    stopLoading: () => {
        const next = Math.max(0, get().activeRequests - 1);
        set({activeRequests: next, isLoading: next > 0});
    },
}));