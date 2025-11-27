import {useAuthModal} from "@widgets/auth-modal";
import {Modal} from "@shared/ui";
import {RegisterForm} from "@features/auth/user-register";
import {LoginForm} from "@features/auth/user-login";

export const AuthModal = () => {
    const isOpen = useAuthModal((s) => s.isOpen)
    const view = useAuthModal((s) => s.currentView)
    const close = useAuthModal((s) => s.close)

    if(!isOpen) return

    const Form = view === "LOGIN" ? LoginForm : RegisterForm;

    return (
        <Modal
            isOpen={isOpen}
            onClose={close}
            render={() => <Form />}
        />
    );
}