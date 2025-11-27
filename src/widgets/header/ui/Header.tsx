import {APP_ROUTES} from "@shared/config";
import {Link} from "react-router";
import {Button, Logo} from "@shared/ui";
import {useAuthModal} from "@widgets/auth-modal";

export const Header = () => {
    const open = useAuthModal((s) => s.open)
    return (
        <header>
            <div className="container flex justify-between items-center py-4">
                <div className={"relative flex max-w-max flex-shrink-0 items-center gap-4"}>
                    <Link to={APP_ROUTES.DEFAULT}></Link>
                    <Logo />
                </div>

                <Button onClick={open}>
                    Login
                </Button>
            </div>
        </header>
    )
}