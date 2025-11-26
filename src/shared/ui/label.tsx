import type {FC, LabelHTMLAttributes} from "react";
import {cn} from "@shared/lib/cn";

export const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({ children, className, ...rest }) => {
    return (
        <label
            className={cn([
                    "group-data-[status=error]:text-danger group-data-[status=success]:text-success font-medium text-black text-sm",
                ],
                className
            )}
            {...rest}
        >
            {children}
        </label>
    );
};

Label.displayName = "Label";