import type {ButtonHTMLAttributes, FC, RefObject} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@shared/lib/cn";

const buttonCva = cva(
    [
        // Layout & alignment
        "inline-flex items-center justify-center align-middle",

        // Typography & selection
        "font-medium select-none",

        // Position & overflow
        "relative overflow-hidden",

        // Cursor / interaction
        "cursor-pointer",

        // Focus / outline
        "outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",

        // Transform & transitions
        "transition-all duration-200 ease-out motion-reduce:transition-none",
        "active:translate-y-[1px]",

        // Shadows
        "shadow-sm hover:shadow-md focus:shadow-md active:shadow-sm disabled:shadow-none",

        // Pseudo-element ::before – layout
        "before:absolute before:inset-y-0 before:left-[-30%] before:w-1/3 before:rounded-full",

        // Pseudo-element ::before – styling & animation
        "before:bg-white/10 before:skew-x-[-20deg] before:opacity-0 before:translate-x-[-120%]",
        "before:transition before:duration-500 before:ease-out",
        "hover:before:opacity-100 hover:before:translate-x-[220%]",
        "data-[loading=true]:before:opacity-0",

        // Disabled state
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0",
    ],
    {
        variants: {
            kind: {
                solid: "",
                outlined: "border",
            },
            color: {
                primary: "bg-primary text-white hover:bg-primary/90",
                secondary: "bg-secondary text-primary hover:bg-primary/20",
            },
            size: {
                small: "h-10 rounded-lg text-sm leading-5",
                medium: "h-11 rounded-xl text-base leading-6",
                large: "h-12.5 rounded-2xl text-lg leading-7",
            },
            onlyIcon: {
                true: "px-0 aspect-square",
                false: "",
            },
        },

        compoundVariants: [
            // Spacing între icon și text
            {size: "small", onlyIcon: false, class: "gap-2"},
            {size: "medium", onlyIcon: false, class: "gap-2.5"},
            {size: "large", onlyIcon: false, class: "gap-3"},

            // Padding pe orizontală
            {size: "small", onlyIcon: false, class: "px-3"},
            {size: "medium", onlyIcon: false, class: "px-3.5"},
            {size: "large", onlyIcon: false, class: "px-4"},

            // Outlined – primary
            {
                kind: "outlined",
                color: "primary",
                class: "bg-transparent border-primary text-primary hover:bg-secondary",
            },

            // Outlined – secondary
            {
                kind: "outlined",
                color: "secondary",
                class: "bg-white border-neutral text-muted hover:bg-neutral",
            },
        ],

        defaultVariants: {
            kind: "solid",
            color: "primary",
            size: "medium",
            onlyIcon: false,
        },
    }
);

type TNativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">;
type TButtonVariants = VariantProps<typeof buttonCva>;

interface IButtonProps extends TNativeButtonProps, TButtonVariants {
    ref?: RefObject<HTMLButtonElement>;
}

export const Button: FC<IButtonProps> = ({ color, size, onlyIcon, className, ...rest }) => {
    const btnClassName = cn(buttonCva({color, size, onlyIcon}), className);
    return <button className={btnClassName} {...rest} />;
};

Button.displayName = "Button";