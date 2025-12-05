import {Route, Routes} from "react-router";
import {APP_ROUTES} from "@shared/config";
import {HomePage} from "@pages/home";
import {ProductPage} from "@pages/product";

export const Routing = () => {
    return (
        <Routes>
            <Route path={APP_ROUTES.DEFAULT} element={<HomePage />} />
            <Route path={APP_ROUTES.PRODUCT} element={<ProductPage />} />
        </Routes>
    )
}