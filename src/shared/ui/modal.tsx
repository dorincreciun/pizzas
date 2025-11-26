import {type FC, type ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";
import {cn} from "@shared/lib/cn";

interface IModalProps {
    isOpen: boolean;
    className?: string;
    onClose?: () => void;
    render: () => ReactNode;
}

export const Modal: FC<IModalProps> = ({ isOpen, onClose, render, className }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal box */}
            <div
                className={cn(
                    "fixed inset-0 z-50 flex items-center justify-center",
                    "pointer-events-none"
                )}
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Modal"
                    className={cn(
                        "pointer-events-auto relative bg-white rounded-xl shadow-lg",
                        "max-w-[90vw] w-[480px] p-8",
                        "transition-all duration-200 animate-in fade-in zoom-in",
                        className
                    )}
                    onClick={(event) => event.stopPropagation()}
                >
                    {render()}
                </div>
            </div>
        </>,
        document.body
    );
};

Modal.displayName = "Modal";
