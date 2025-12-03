interface ILoginReducer {
    email: string;
    password: string;
}

type TLoginAction =
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }
    | { type: "RESET"; }

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
        case "RESET":
            return initialState;
        default:
            return state;
    }
}