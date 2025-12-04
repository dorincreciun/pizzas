import {APP_ROUTES} from "@shared/config";
import {Link} from "react-router";
import {Button, Logo} from "@shared/ui";
import {useAuthModal} from "@widgets/auth-modal";
import {useSessionStore} from "@entities/session";
import {LogOut, User} from "lucide-react";
import {userLogout} from "@features/auth/user-logout";

export const Header = () => {
    const open = useAuthModal((s) => s.open);
    const user = useSessionStore((s) => s.user);

    return (
        <header className="h-[75px] border-b border-gray-200">
            <div className="container flex items-center justify-between h-full">

                {/* Logo */}
                <Link
                    to={APP_ROUTES.DEFAULT}
                    className="flex items-center gap-2 hover:opacity-90 transition"
                >
                    <Logo />
                </Link>

                {/* Auth button */}
                <div>
                    {user ? (
                        <Button
                            onClick={() => userLogout()}
                            kind="outlined"
                            className="flex items-center gap-2"
                        >
                            <LogOut /> Logout
                        </Button>
                    ) : (
                        <Button
                            onClick={open}
                            kind="outlined"
                            className="flex items-center gap-2"
                        >
                            <User /> Login
                        </Button>
                    )}
                </div>

            </div>
        </header>
    );
};
