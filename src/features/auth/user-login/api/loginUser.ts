import { type components, http } from "@shared/lib/http";
import { type IUser, mapUserDto } from "@entities/user";

interface ILoginUserParams {
    email: string;
    password: string;
}

type TLoginUserError = components["schemas"]["Error"];

type TLoginUserResult =
    | { ok: true; user: IUser }
    | { ok: false; error: TLoginUserError };

export async function loginUser({ email, password }: ILoginUserParams): Promise<TLoginUserResult> {
    try {
        const { data, error } = await http.POST("/auth/login", {
            body: { email, password },
        });

        if (error) {
            return {
                ok: false,
                error: error as TLoginUserError,
            };
        }

        if (!data || !data.user) {
            return {
                ok: false,
                error: {
                    message: "Empty response from server",
                    statusCode: 500,
                } as TLoginUserError,
            };
        }

        const user = mapUserDto(data.user);

        return {
            ok: true,
            user,
        };
    } catch (e) {
        console.error("[loginUser] unexpected error", e);

        return {
            ok: false,
            error: {
                message: "Unexpected error occurred",
                statusCode: 500,
            } as TLoginUserError,
        };
    }
}
