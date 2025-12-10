import {useEffect, useState} from "react";
import {getCategory,} from "../api/getCategory";
import type {ICategory} from "./category.types";

export const useCategory = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                setIsLoading(true);

                const items = await getCategory();

                if (isMounted) {
                    setCategories(items);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    return { categories, isLoading };
};
