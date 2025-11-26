import type { FC, InputHTMLAttributes, ReactNode, RefObject } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@shared/lib/cn";

const inputVariants = cva(
    [
        // Layout & text
        "block w-full text-sm",

        // Transitions
        "transition-all duration-200 ease-in-out",

        // Border / outline
        "border border-transparent",
        "outline-none",

        // Placeholder
        "placeholder:text-muted/50",

        // Focus state
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",

        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0",

        // Error state (din group wrapper)
        "group-data-[status=error]:!border-danger",
    ],
    {
        variants: {
            variant: {
                primary: "bg-surface",
                secondary: "bg-transparent border border-neutral",
            },
            size: {
                small: "py-2 px-3 rounded-lg",
                medium: "py-3 px-3.5 rounded-xl",
                large: "py-3 px-4 rounded-2xl",
            },
            startSlot: {
                true: "pl-9",
            },
            endSlot: {
                true: "pr-9",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "medium",
        },
    }
);

type TNativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;
type TInputVariants = Omit<
    VariantProps<typeof inputVariants>,
    "startSlot" | "endSlot"
>;

export interface IInputProps extends TNativeInputProps, TInputVariants {
    ref?: RefObject<HTMLInputElement>;
    startSlot?: ReactNode;
    endSlot?: ReactNode;
}

export const Input: FC<IInputProps> = ({ variant, size, className, startSlot, endSlot, ...rest }) => {

    return (
        <div className="relative flex items-center">
            {startSlot && (
                <div
                    className={cn(
                        "absolute inset-y-0 left-3 flex items-center gap-1 text-muted",
                        "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:stroke-[1.5]"
                    )}
                >
                    {startSlot}
                </div>
            )}

            <input
                className={cn(
                    inputVariants({
                        variant,
                        size,
                        startSlot: Boolean(startSlot),
                        endSlot: Boolean(endSlot),
                    }),
                    className
                )}
                {...rest}
            />

            {endSlot && (
                <div
                    className={cn(
                        "absolute inset-y-0 right-3 flex items-center gap-1 text-muted",
                        "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:stroke-[1.5]"
                    )}
                >
                    {endSlot}
                </div>
            )}
        </div>
    );
};

Input.displayName = "Input";
