import { useRef, useState, type FocusEvent } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@shared/ui";
import { SearchResult } from "./SearchResult";
import { useSearchBar } from "../model/useSearchBar";
import { SearchOverlay } from "./SearchOverlay";

export const SearchBar = () => {
    const inputRef = useRef<HTMLInputElement>(null!);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const {
        searchValue,
        showResults,
        results,
        isLoading,
        handleValueChange,
        handleClear,
    } = useSearchBar();

    const handleFocus = (): void => {
        setIsFocused(true);
    };

    const handleBlur = (_event: FocusEvent<HTMLInputElement>): void => {
        setTimeout((): void => {
            const active = document.activeElement;
            const el = inputRef.current;

            if (el && active === el) return;

            setIsFocused(false);
        }, 0);
    };

    const handleClearClick = (): void => {
        handleClear();
        setIsFocused(false);

        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    return (
        <>
            {isFocused && <SearchOverlay />}

            <div className="relative flex-1 px-10 z-50">
                <div className="relative z-50">
                    <Input
                        ref={inputRef}
                        className="w-full relative"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleValueChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        startSlot={<Search className="size-4" />}
                        endSlot={
                            searchValue.length > 0 && (
                                <button
                                    type="button"
                                    onClick={handleClearClick}
                                    aria-label="Clear search"
                                >
                                    <X className="size-4" />
                                </button>
                            )
                        }
                    />
                </div>

                {/* Loading state sub input */}
                {isFocused && isLoading && (
                    <div className="absolute left-10 right-10 top-full mt-2 z-50">
                        <div className="w-full bg-white rounded-xl shadow-xl py-3 px-4 flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="size-4 animate-spin" />
                            <span>Se caută produsele...</span>
                        </div>
                    </div>
                )}

                {/* Rezultate doar când nu mai e loading */}
                {isFocused && !isLoading && showResults && (
                    <SearchResult searchResults={results} />
                )}
            </div>
        </>
    );
};
