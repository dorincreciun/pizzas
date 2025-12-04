import type {IProduct, ProductDto} from "./product.types";

export function mapProductDto(product: ProductDto): IProduct {
    return {
        id: product.id,
        name: product.name,
        description: product.description || null,
        basePrice: product.basePrice,
        stock: product.stock,
        categoryId: product.categoryId,
        category: product.category
    }
}