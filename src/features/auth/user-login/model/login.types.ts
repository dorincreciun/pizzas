export interface ILoginReducer {
    email: string;
    password: string;
}

export type TLoginAction =
    | { type: "SET_EMAIL"; payload: string}
    | { type: "SET_PASSWORD"; payload: string}
