import { useRef, useState, type FocusEvent } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@shared/ui";
import { SearchResult } from "./SearchResult";
import { useSearchBar } from "../model/useSearchBar";
import { SearchOverlay } from "@features/search/ui/SearchOverlay";

export const SearchBar = () => {
    const inputRef = useRef<HTMLInputElement>(null!);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const {
        searchValue,
        showResults,
        results,
        handleValueChange,
        handleClear,
    } = useSearchBar();

    const handleFocus = (): void => {
        setIsFocused(true);
    };

    const handleBlur = (_event: FocusEvent<HTMLInputElement>): void => {
        setTimeout(() => {
            const active = document.activeElement;
            const el = inputRef.current;

            // dacă focusul a revenit pe input, nu închidem
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

                {isFocused && showResults && (
                    <SearchResult searchResults={results} />
                )}
            </div>
        </>
    );
};
