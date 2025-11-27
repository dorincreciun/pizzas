type TAPP_MODAL = "LOGIN" | "REGISTER"

export interface IAuthModalStore {
    currentView: TAPP_MODAL;
    isOpen: boolean;

    open: () => void;
    close: () => void;
    setView: (view: TAPP_MODAL) => void;
}
