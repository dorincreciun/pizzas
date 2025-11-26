import {BrowserRouter} from "react-router";
import {Routing} from "./Routing";
import {Header} from "@widgets/header";

export const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routing />
        </BrowserRouter>
    )
}