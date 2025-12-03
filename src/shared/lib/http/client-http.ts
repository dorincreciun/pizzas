import createClient from "openapi-fetch";
import type {paths} from "./schema";
import {auth, loader} from "./middlewares";

export const http = createClient<paths>({
    baseUrl: __API_URL__,
    credentials: "include"
})

http.use(loader)
http.use(auth)