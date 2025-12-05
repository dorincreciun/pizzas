import {type components, http} from "@shared/lib/http";

type TSearchResult = components["schemas"]["SearchProductsResponse"];

type TSearchProductsResult =
    | { ok: true; data: TSearchResult }
    | { ok: false; error: string | null };

interface IGetSearchProductsParams {
    q: string;
}

export async function getSearchProducts(
    params: IGetSearchProductsParams
): Promise<TSearchProductsResult> {

    const query = params.q.trim();

    if (!query) {
        return {
            ok: false,
            error: "Câmpul de căutare este gol.",
        };
    }

    try {
        const {data, error} = await http.GET("/products/search", {
            params: {
                query: {q: query},
            },
        });

        if (error || !data) {
            console.warn("[getSearchProducts] error fetching products:", error);

            return {
                ok: false,
                error:
                    typeof error === "string"
                        ? error
                        : "A apărut o eroare la căutarea produselor.",
            };
        }

        return {
            ok: true,
            data,
        };
    } catch (e) {
        console.error("[getSearchProducts] unexpected error:", e);

        return {
            ok: false,
            error: "Eroare internă. Încearcă din nou.",
        };
    }
}
