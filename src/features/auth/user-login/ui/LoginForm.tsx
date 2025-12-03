import { type FormEvent, useState } from "react";
import { AtSign, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { cn } from "@shared/lib/cn";
import { Button } from "@shared/ui";
import { FormField } from "@shared/ui/form-field";
import { useLoginForm } from "../model/use-login-form";
import { loginUser } from "@features/auth/user-login";

export const LoginForm = ({ onClose }: { onClose: () => void }) => {
    const { state, setEmail, setPassword } = useLoginForm();

    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        setEmailErrors([]);
        setPasswordErrors([]);
        setIsSubmitting(true);

        try {
            const result = await loginUser({
                email: state.email,
                password: state.password,
            });

            if (!result.ok) {
                const details = result.error.details ?? [];

                setEmailErrors(
                    details
                        .filter((d) => d.field === "email" && d.message)
                        .map((d) => d.message as string),
                );

                setPasswordErrors(
                    details
                        .filter((d) => d.field === "password" && d.message)
                        .map((d) => d.message as string),
                );

                return;
            }

            onClose();
        } catch (e) {
            console.error("[LoginForm] unexpected error", e);
            setPasswordErrors(["Unexpected error. Try again later."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <h2 className="text-center font-semibold text-2xl">
                Login
            </h2>

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
                            onClick={(): void =>
                                setShowPassword((prev): boolean => !prev)
                            }
                            className={cn(
                                "group inline-flex items-center justify-center cursor-pointer",
                                "h-5 w-5",
                                "transition-transform duration-150 ease-out active:scale-95",
                                "[&>svg]:size-5",
                                "[&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-out",
                                "[&>svg]:group-hover:scale-110",
                                "[&>svg]:group-active:scale-95",
                            )}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    }
                />
                <FormField.Hint />
            </FormField.Root>

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
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
};
