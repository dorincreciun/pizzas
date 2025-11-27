import {BrowserRouter} from "react-router";
import type {FC, ReactNode} from "react";

type TProvidersProps = Readonly<{ children: ReactNode }>

export const Providers: FC<TProvidersProps> = ({children}) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}