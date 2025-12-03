interface IRegisterReducer {
    name: string;
    email: string;
    password: string;
}

type TRegisterAction =
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }
    | { type: "RESET"; }


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
        case "RESET":
            return initialState;
        default:
            return state;
    }
}