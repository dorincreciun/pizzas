import {BrowserRouter} from "react-router";
import {type FC, type ReactNode, useEffect} from "react";
import {initSession} from "@features/auth/init-session";
import {Loader} from "@widgets/app-loader";

type TProvidersProps = Readonly<{ children: ReactNode }>

export const Providers: FC<TProvidersProps> = ({children}) => {
    useEffect(() => void initSession(), [])
    return (
        <BrowserRouter>
            {children}

            <Loader />
        </BrowserRouter>
    )
}