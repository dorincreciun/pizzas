export const APP_ROUTES = {
    DEFAULT: '/',
    NOTFOUND: '*'
} as const

export type TAPP_ROUTES = typeof APP_ROUTES[keyof typeof APP_ROUTES]