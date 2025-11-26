import {Route, Routes} from "react-router";
import {APP_ROUTES} from "@shared/config";
import {HomePage} from "@pages/home";

export const Routing = () => {
    return (
        <Routes>
            <Route path={APP_ROUTES.DEFAULT} element={<HomePage />} />
        </Routes>
    )
}