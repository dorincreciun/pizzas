import {SearchResult} from "@features/search/ui/SearchResult";
import {Search, X} from "lucide-react";
import {Input} from "@shared/ui";
import {type ChangeEvent, useState} from "react";

export const SearchBar = () => {
    const [showResults, setShowResults] = useState(false);
    const [value, setValue] = useState("");

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const nextValue = event.target.value;
        setValue(nextValue);
        setShowResults(nextValue.length > 0);
    };

    const handleClear = (): void => {
        setValue("");
        setShowResults(false);
    };

    return (
        <div className="relative flex-1 px-10">
            <div className="relative z-20">
                <Input
                    className="w-full relative"
                    placeholder="Search..."
                    value={value}
                    onChange={handleValueChange}
                    startSlot={<Search className="size-4" />}
                    endSlot={
                        value.length > 0 && (
                            <button
                                type="button"
                                onClick={handleClear}
                                aria-label="Clear search"
                            >
                                <X className="size-4" />
                            </button>
                        )
                    }
                />
            </div>

            {showResults && (
                <div className="absolute left-10 right-10 top-full mt-2 z-10">
                    <SearchResult />
                </div>
            )}
        </div>
    );
};
