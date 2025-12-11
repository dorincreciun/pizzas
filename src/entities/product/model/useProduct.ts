import { useEffect, useState } from "react";
import type { IProduct } from "@entities/product";
import { getProduct } from "@entities/product/api/getProduct";

export const useProduct = (id: number) => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        let active = true;

        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);

            const res = await getProduct(id);

            if (!active) return;

            if (res.ok) {
                setProduct(res.data);
            } else {
                setError(res.error);
                setProduct(null);
            }

            setIsLoading(false);
        };

        void fetchProduct();

        return () => {
            active = false;
        };
    }, [id]);

    return { product, isLoading, error };
};
