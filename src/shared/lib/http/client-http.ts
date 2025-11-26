import createClient from "openapi-fetch";
import type {paths} from "./schema";

export const http = createClient<paths>({
    baseUrl: __API_URL__
})