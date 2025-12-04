import type {ICategory, TCategory} from "./category.types";

export function mapCategoryDto(category: TCategory): ICategory {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug
    }
}