import type {components} from "@shared/lib/http";

export type TProductDto = components['schemas']['Product']

export interface IProduct {
    id: number
    name: string,
    description: string | null,
    basePrice: number,
    stock: number,
    categoryId: number,
    imageUrl: string | null
}