import {http} from "@shared/lib/http";
import type {IProduct} from "../model/product.types";
import {mapProductDto} from "../model/mapProductDto";

type TGetProduct =
    | { ok: true; data: IProduct }
    | { ok: false; error: string }

export async function getProduct(id: number): Promise<TGetProduct> {
    try {
        const {data, error} = await http.GET("/products/{id}", {
            params: {
                path: {id}
            }
        });

        if (error || !data || data.data === undefined) {
            return {
                ok: false,
                error: error?.error || "Product not found"
            };
        }

        return {
            ok: true,
            data: mapProductDto(data.data)
        };
    } catch (e) {
        console.error("[getProduct] unexpected error:", e);

        return {
            ok: false,
            error: "Unexpected error"
        };
    }
}
