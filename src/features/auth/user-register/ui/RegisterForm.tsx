import { type FormEvent, useState } from "react";
import { AtSign, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { cn } from "@shared/lib/cn";
import { Button } from "@shared/ui";
import { FormField } from "@shared/ui/form-field";

import { useRegisterForm } from "../model/useRegisterForm";
import { registerUser } from "../api/registerUser";

export const RegisterForm = ({ onClose }: { onClose: () => void }) => {
    const { state, setEmail, setPassword, setName } = useRegisterForm();

    const [nameErrors, setNameErrors] = useState<string[]>([]);
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setNameErrors([]);
        setEmailErrors([]);
        setPasswordErrors([]);

        setIsSubmitting(true);

        try {
            const result = await registerUser({ ...state });

            if (!result.ok) {
                const details = result.error.details ?? [];

                setNameErrors(
                    details
                        .filter((d) => d.field === "name" && d.message)
                        .map((d) => d.message!)
                );

                setEmailErrors(
                    details
                        .filter((d) => d.field === "email" && d.message)
                        .map((d) => d.message!)
                );

                setPasswordErrors(
                    details
                        .filter((d) => d.field === "password" && d.message)
                        .map((d) => d.message!)
                );

                return;
            }

            onClose();
        } catch (e) {
            console.error("[RegisterForm] unexpected error", e);
            setPasswordErrors(["Unexpected error. Try again later."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2 className="text-center font-semibold text-2xl">Register</h2>

            {/* NAME */}
            <FormField.Root hintMessages={nameErrors}>
                <FormField.Label>Name:</FormField.Label>
                <FormField.Input
                    size="small"
                    placeholder="Write name..."
                    value={state.name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FormField.Hint />
            </FormField.Root>

            {/* EMAIL */}
            <FormField.Root hintMessages={emailErrors}>
                <FormField.Label>Email:</FormField.Label>
                <FormField.Input
                    size="small"
                    placeholder="Write email..."
                    startSlot={<AtSign />}
                    value={state.email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormField.Hint />
            </FormField.Root>

            {/* PASSWORD */}
            <FormField.Root hintMessages={passwordErrors}>
                <FormField.Label>Password:</FormField.Label>
                <FormField.Input
                    type={showPassword ? "text" : "password"}
                    size="small"
                    placeholder="Write password..."
                    startSlot={<LockKeyhole />}
                    value={state.password}
                    onChange={(e) => setPassword(e.target.value)}
                    endSlot={
                        <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className={cn(
                                "group inline-flex items-center justify-center cursor-pointer",
                                "h-5 w-5",
                                "transition-transform duration-150 ease-out active:scale-95",
                                "[&>svg]:size-5",
                                "[&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-out",
                                "[&>svg]:group-hover:scale-110",
                                "[&>svg]:group-active:scale-95"
                            )}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    }
                />
                <FormField.Hint />
            </FormField.Root>

            {/* ACTIONS */}
            <div className="flex justify-between gap-2 max-w-[350px] w-full mx-auto">
                <Button
                    type="button"
                    className="flex-1"
                    color="secondary"
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>

                <Button className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
};
