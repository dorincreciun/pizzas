import {Input, Label} from "@shared/ui";
import {useId, useState} from "react";
import {AtSign, Eye, EyeOff, LockKeyhole} from "lucide-react";
import {cn} from "@shared/lib/cn";
import {useRegisterForm} from "../model/use-register-form";

export const RegisterForm = () => {
    const {state, setEmail, setPassword, setName} = useRegisterForm()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const idEmail = useId()
    const idName = useId()
    const idPassword = useId()

    return (
        <div className="flex flex-col gap-4">
            <h2 className={"text-center font-semibold text-2xl"}>Register</h2>
            <div className="flex flex-col gap-2">
                <Label htmlFor={idName}>Name:</Label>
                <Input
                    id={idName}
                    size="small"
                    placeholder="Write name..."
                    value={state.name}
                    onChange={(e): void => setName(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor={idEmail}>Email:</Label>
                <Input
                    id={idEmail}
                    size="small"
                    placeholder="Write email..."
                    startSlot={<AtSign />}
                    value={state.email}
                    onChange={(e): void => setEmail(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor={idPassword}>Password:</Label>
                <Input
                    type={showPassword ? "text" : "password"}
                    id={idPassword}
                    size="small"
                    placeholder="Write password..."
                    startSlot={<LockKeyhole />}
                    value={state.password}
                    onChange={(e): void => setPassword(e.target.value)}
                    endSlot={
                        <button
                            type="button"
                            onClick={(): void => setShowPassword((prev): boolean => !prev)}
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
            </div>
        </div>
    )
}