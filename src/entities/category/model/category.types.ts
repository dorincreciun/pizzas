import type {components} from "@shared/lib/http";

export type TCategory = components['schemas']['Category']

export interface ICategory {
    id: number,
    slug: string,
    name: string
}