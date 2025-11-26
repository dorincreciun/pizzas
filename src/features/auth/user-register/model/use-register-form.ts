import {useReducer} from "react";
import {initialState, reducer} from "./register.reducer";

export const useRegisterForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setEmail = (email: string): void => dispatch({type: "SET_EMAIL", payload: email});
    const setPassword = (password: string): void => dispatch({type: "SET_PASSWORD", payload: password});
    const setName = (name: string): void => dispatch({type: "SET_NAME", payload: name});

    return { state, setEmail, setName, setPassword}
};