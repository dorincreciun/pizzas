export const APP_ROUTES = {
    DEFAULT: '/',
    PRODUCT: '/product/:id',
    NOTFOUND: '*',
} as const;

type ExpandDynamicRoute<S extends string> =
    S extends `${infer Start}:${string}` ? `${Start}${string}` : S;

export type TAppRoute = ExpandDynamicRoute<
    (typeof APP_ROUTES)[keyof typeof APP_ROUTES]
>;
