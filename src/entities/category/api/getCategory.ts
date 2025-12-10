import { http } from "@shared/lib/http";
import { type ICategory, mapCategoryDto } from "@entities/category";

export async function getCategory(): Promise<ICategory[]> {
    try {
        const { data, error } = await http.GET("/categories");

        if (error || !data) {
            return [];
        }

        return (data.data ?? []).map(mapCategoryDto);

    } catch (e) {
        console.error("[getCategory] unexpected error:", e);
        return [];
    }
}
