import type { Middleware } from "openapi-fetch";
import { useLoaderStore } from "@widgets/app-loader";

export const loader: Middleware = {
    async onRequest(): Promise<void> {
        const { startLoading } = useLoaderStore.getState();
        startLoading();
    },

    async onResponse({ response }): Promise<Response> {
        const { stopLoading } = useLoaderStore.getState();
        stopLoading();
        return response;
    },

    async onError({ error }): Promise<never> {
        const { stopLoading } = useLoaderStore.getState();
        stopLoading();
        throw error;
    },
};

export const auth: Middleware = {
    async onRequest({request}): Promise<Request> {
        return new Request(request, { credentials: "include" })
    },

    async onResponse({ request, response }): Promise<Response> {
        const url = new URL(request.url);
        const isRefreshEndpoint = url.pathname.endsWith("/auth/refresh");

        if (response.status !== 401 || isRefreshEndpoint) {
            /*
            * Daca status nu e 401 sau nu am /authorization/refresh
            * returnam
            * */
            return response;
        }

        const refresh = await fetch("/api/auth/refresh", { credentials: "include", method: "POST" })

        if(refresh.ok){
            /*
            * Daca refreshToken mai este valid
            * mai executam o data request
            * */
            return fetch(request.clone())
        }

        return response
    }
};

