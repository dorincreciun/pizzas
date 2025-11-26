import type {FC, ReactNode} from "react";
import {cn} from "@shared/lib/cn";

export const Hint: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <span
            className={cn([
                "hidden text-xs overflow-hidden",
                "max-h-0 opacity-0 translate-y-[-4px]",
                "invisible pointer-events-none",
                "transition-all duration-300 ease-out",
                // Starea de eroare animată
                "group-data-[status=error]:visible",
                "group-data-[status=error]:block",
                "group-data-[status=error]:pointer-events-auto",
                "group-data-[status=error]:opacity-100",
                "group-data-[status=error]:translate-y-0",
                "group-data-[status=error]:text-danger",
                "group-data-[status=error]:max-h-100",
            ])}
        >
      {children}
    </span>
    );
};

Hint.displayName = "Hint";