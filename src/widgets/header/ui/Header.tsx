import {ButtonLogin} from "@features/auth/user-login";
import {APP_ROUTES} from "@shared/config";
import {Link} from "react-router";
import {Logo} from "@shared/ui";

export const Header = () => {
    return (
        <header>
            <div className="container flex justify-between items-center py-4">
                <div className={"relative flex max-w-max flex-shrink-0 items-center gap-4"}>
                    <Link to={APP_ROUTES.DEFAULT}></Link>
                    <Logo />
                </div>

                <ButtonLogin />
            </div>
        </header>
    )
}