import {create} from "zustand/react";
import type {ISessionStore} from "./session.types";

export const useSessionStore = create<ISessionStore>()((setState) => {
    return {
        user: null,
        createSession: (user): void => setState({user}),
        destroySession: (): void => setState({user: null})
    }
})