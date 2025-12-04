import { useAuthModal } from "../model/useAuthModal";

export const AuthModalSwitchHint = () => {
    const view = useAuthModal((s) => s.currentView);
    const switchTo = useAuthModal((s) => s.setView);

    if (view === "REGISTER") {
        return (
            <span
                className="text-sm cursor-pointer text-center hover:underline"
                onClick={() => switchTo("LOGIN")}
            >
                Ai deja un cont?
            </span>
        );
    }

    return (
        <span
            className="text-sm cursor-pointer text-center hover:underline"
            onClick={() => switchTo("REGISTER")}
        >
            Nu ai cont?
        </span>
    );
};
