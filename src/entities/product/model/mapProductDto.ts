import type {IProduct, TProductDto} from "./product.types";

export function mapProductDto(product: TProductDto): IProduct {
    return {
        id: product.id,
        name: product.name,
        description: product.description || null,
        basePrice: product.basePrice,
        stock: product.stock,
        categoryId: product.categoryId,
        imageUrl: product.imageUrl
    }
}