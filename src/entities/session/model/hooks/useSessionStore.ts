import {create} from "zustand/react";
import type {ISessionStore} from "../types/session-store";

export const useSessionStore = create<ISessionStore>()((setState) => {
    return {
        user: null,
        createSession: (user): void => setState({user}),
        destroySession: (): void => setState({user: null})
    }
})