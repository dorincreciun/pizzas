import type {ILoginReducer, TLoginAction} from "./login.types";

export const initialState: ILoginReducer = {
    email: "",
    password: ""
}

export function reducer(state: ILoginReducer, action: TLoginAction): ILoginReducer {
    switch (action.type) {
        case "SET_EMAIL":
            return {...state, email: action.payload}
        case "SET_PASSWORD":
            return {...state, password: action.payload}
        default:
            return state;
    }
}