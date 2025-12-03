import {useAuthModal} from "@widgets/auth-modal";
import {Modal} from "@shared/ui";
import {RegisterForm} from "@features/auth/user-register";
import {LoginForm} from "@features/auth/user-login";
import {AuthModalSwitchHint} from "./AuthModalSwitchHint";

export const AuthModal = () => {
    const isOpen = useAuthModal((s) => s.isOpen)
    const view = useAuthModal((s) => s.currentView)
    const close = useAuthModal((s) => s.close)

    if(!isOpen) return null

    const Form = view === "LOGIN" ? LoginForm : RegisterForm;

    return (
        <Modal
            isOpen={isOpen}
            onClose={close}
            render={() => (
                <div className="flex flex-col gap-4">
                    <Form onClose={close} />

                    <AuthModalSwitchHint />
                </div>
            )}
        />
    );
}