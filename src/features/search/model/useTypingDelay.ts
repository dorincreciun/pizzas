import { useEffect, useRef } from "react";

/**
 * Apelează callback-ul după ce utilizatorul a încetat să tasteze.
 *
 * @param value    Valoarea urmărită (ex: valoarea inputului)
 * @param delay    Timpul de așteptare după ultima tastare (ms)
 * @param callback Funcția apelată când tastarea s-a oprit
 */
export function useTypingDone(
    value: string,
    delay: number,
    callback: () => void
): void {
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const trimmed = value.trim();

        if (trimmed.length === 0) {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
            return;
        }

        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            callback();
        }, delay);

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay, callback]);
}
