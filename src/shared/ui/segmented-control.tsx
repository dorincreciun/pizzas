import {
    type HTMLAttributes,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    forwardRef,
} from "react";
import { cn } from "@shared/lib/cn";

type OptionType = {
    label: string;
    value: string;
};

interface ISegmentedControlProps {
    options: readonly OptionType[];
    defaultValue?: string;
    onChange?: (value: string, index: number) => void;
    name?: string;
    className?: string;
}

interface SegmentedThumbProps extends HTMLAttributes<HTMLDivElement> {
    thumbWidth: number;
    thumbX: number;
}

export const SegmentedThumb = forwardRef<HTMLDivElement, SegmentedThumbProps>(
    ({ thumbWidth, thumbX, style, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    transform: `translateX(${thumbX}px)`,
                    width: `${thumbWidth}px`,
                    ...style,
                }}
                className={cn(
                    // thumb cu margine sus/jos de 4px, aliniat de la stânga
                    "absolute inset-y-1 left-0",
                    "rounded-[30px] bg-white shadow-sm",
                    "transition-transform duration-300 ease-in-out will-change-transform",
                    className,
                )}
                {...props}
            />
        );
    },
);

SegmentedThumb.displayName = "SegmentedThumb";

export const SegmentedControl = ({
                                     options,
                                     defaultValue,
                                     onChange,
                                     name = "segmented-control",
                                     className,
                                 }: ISegmentedControlProps) => {
    // Dacă nu avem opțiuni, nu randăm nimic (edge case safe)
    if (!options || options.length === 0) {
        return null;
    }

    const [activeIndex, setActiveIndex] = useState<number>(() => {
        if (!defaultValue) return 0;
        const idx = options.findIndex((opt) => opt.value === defaultValue);
        return idx === -1 ? 0 : idx;
    });

    const [thumbWidth, setThumbWidth] = useState<number>(0);
    const [thumbX, setThumbX] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

    /**
     * Recalculează poziția și lățimea thumb-ului
     * în funcție de elementul activ și container.
     */
    const recalcThumb = useCallback(() => {
        const container = containerRef.current;
        const activeEl = optionRefs.current[activeIndex];

        if (!container || !activeEl) return;

        const containerRect = container.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();

        const width = activeRect.width;
        const left = activeRect.left - containerRect.left;

        setThumbWidth(width);
        setThumbX(left);
    }, [activeIndex, options]);

    /**
     * Sincronizează activeIndex atunci când se schimbă
     * defaultValue sau options.
     */
    useEffect(() => {
        if (!defaultValue) return;
        const idx = options.findIndex((opt) => opt.value === defaultValue);
        setActiveIndex(idx === -1 ? 0 : idx);
    }, [defaultValue, options]);

    /**
     * Măsurăm poziția thumb-ului după layout pentru a evita flicker.
     * Ne abonăm la schimbări de dimensiune ale containerului
     * (ResizeObserver când e disponibil, window resize fallback).
     */
    useLayoutEffect(() => {
        recalcThumb();

        const container = containerRef.current;
        if (!container) return;

        // Preferăm ResizeObserver (layout mai precis)
        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(() => {
                recalcThumb();
            });

            observer.observe(container);

            return () => {
                observer.disconnect();
            };
        }

        // Fallback la event global de resize
        const handleResize = () => {
            recalcThumb();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [recalcThumb]);

    const handleChange = (index: number) => {
        setActiveIndex(index);
        const opt = options[index];
        onChange?.(opt.value, index);
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex justify-between rounded-[30px] bg-control-bg p-1 select-none",
                "focus-within:ring-2 focus-within:ring-black/10",
                className,
            )}
            role="radiogroup"
            aria-label={name}
        >
            <SegmentedThumb thumbWidth={thumbWidth} thumbX={thumbX} />

            {options.map((option, index) => {
                const id = `${name}-${option.value}`;
                const isActive = index === activeIndex;

                return (
                    <div
                        key={option.value}
                        ref={(el) => {
                            optionRefs.current[index] = el;
                        }}
                        className="relative z-[1] flex-1 text-center"
                    >
                        <input
                            type="radio"
                            className="peer sr-only"
                            id={id}
                            name={name}
                            value={option.value}
                            checked={isActive}
                            onChange={() => handleChange(index)}
                        />
                        <label
                            htmlFor={id}
                            className={cn(
                                "py-2.5 px-4 block cursor-pointer",
                                "text-base font-medium",
                                "transition-colors duration-300 ease-in-out",
                                isActive
                                    ? "text-primary"
                                    : "text-foreground/70 peer-hover:text-foreground",
                            )}
                        >
                            {option.label}
                        </label>
                    </div>
                );
            })}
        </div>
    );
};
