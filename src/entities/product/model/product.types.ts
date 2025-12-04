import type {components} from "@shared/lib/http";

export type ProductDto = components['schemas']['Product']

export interface IProduct {
    id: number
    name: string,
    description: string | null,
    basePrice: number,
    stock: number,
    categoryId: number,
    category: components['schemas']['Category']
}