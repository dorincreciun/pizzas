import {Link} from "react-router";
import {LogOut, ShoppingBag, User} from "lucide-react";
import {useAuthModal} from "@widgets/auth-modal";
import {userLogout} from "@features/auth/user-logout";
import {SearchBar} from "@features/search";
import {useSessionStore} from "@entities/session";
import {Button, Logo} from "@shared/ui";
import {APP_ROUTES} from "@shared/config";

export const Header = () => {
    const open = useAuthModal((s) => s.open);
    const user = useSessionStore((s) => s.user);

    return (
        <header className="py-10 border-b border-gray-200">
            <div className="container flex items-center justify-between h-full">

                {/* Logo */}
                <Link
                    to={APP_ROUTES.DEFAULT}
                    className="flex items-center gap-2 hover:opacity-90 transition"
                >
                    <Logo />
                </Link>

                {/* Search */}
                <SearchBar />

                <div className="flex gap-4">
                    {/* Cart button */}
                    <Button
                        onlyIcon
                        kind={"outlined"}
                        aria-label={"Cart button"}
                    >
                        <ShoppingBag />
                    </Button>

                    {/* Auth button */}
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
