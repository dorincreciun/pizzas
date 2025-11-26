export interface IRegisterReducer {
    name: string;
    email: string;
    password: string;
}

export type TRegisterAction =
    | { type: "SET_NAME"; payload: string}
    | { type: "SET_EMAIL"; payload: string}
    | { type: "SET_PASSWORD"; payload: string}
