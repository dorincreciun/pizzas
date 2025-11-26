import type {IRegisterReducer, TRegisterAction} from "./register.types";

export const initialState: IRegisterReducer = {
    name: "",
    email: "",
    password: ""
}

export function reducer(state: IRegisterReducer, action: TRegisterAction): IRegisterReducer {
    switch (action.type) {
        case "SET_NAME":
            return {...state, name: action.payload}
        case "SET_EMAIL":
            return {...state, email: action.payload}
        case "SET_PASSWORD":
            return {...state, password: action.payload}
        default:
            return state;
    }
}