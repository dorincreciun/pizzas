import { cn } from "@shared/lib/cn";

export const SearchOverlay = () => {
    return (
        <div
            className={cn(
                "fixed inset-0 z-40",
                "bg-black/60",
                "will-change-[opacity,filter]",
                "[animation:fade-blur-in_.45s_cubic-bezier(0.16,1,0.3,1)_both]"
            )}
        />
    );
};
