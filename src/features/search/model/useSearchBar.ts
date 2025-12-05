import { useState, useCallback, type ChangeEvent } from "react";
import { useTypingDone } from "./useTypingDelay";
import { getSearchProducts } from "@features/search/api/getSearchProducts";
import { mapProductDto, type IProduct } from "@entities/product";

export function useSearchBar() {
    const [showResults, setShowResults] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const nextValue = event.target.value;
        setSearchValue(nextValue);
        setShowResults(nextValue.length > 0);
    };

    const handleClear = (): void => {
        setSearchValue("");
        setResults([]);
        setShowResults(false);
    };

    const handleTypingDone = useCallback(async (): Promise<void> => {
        const trimmed = searchValue.trim();

        if (!trimmed) {
            setResults([]);
            setShowResults(false);
            return;
        }

        setIsLoading(true);

        const response = await getSearchProducts({ q: trimmed });

        setIsLoading(false);

        if (!response.ok || !response.data.data) {
            setResults([]);
            setShowResults(false);
            return;
        }

        const products = response.data.data.map(mapProductDto);

        setResults(products);
        setShowResults(products.length > 0);
    }, [searchValue]);

    useTypingDone(searchValue, 1000, handleTypingDone);

    return {
        searchValue,
        showResults,
        results,
        isLoading,
        handleValueChange,
        handleClear,
    };
}
