import { useReducer } from "react";
import { initialState, reducer } from "./login.reducer";

export const useLoginForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setEmail = (email: string): void =>
        dispatch({ type: "SET_EMAIL", payload: email });

    const setPassword = (password: string): void =>
        dispatch({ type: "SET_PASSWORD", payload: password });

    const reset = (): void =>
        dispatch({ type: "RESET" });

    return {
        state,
        setEmail,
        setPassword,
        reset,
    };
};
