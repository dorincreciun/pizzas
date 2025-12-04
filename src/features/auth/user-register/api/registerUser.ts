import {type components, http} from "@shared/lib/http";
import {type IUser, mapUserDto} from "@entities/user";

export type TRegisterUserError = components["schemas"]["Error"];

export type TRegisterUserResult =
    | { ok: true; user: IUser }
    | { ok: false; error: TRegisterUserError };

interface IRegisterUserProps {
    name: string;
    email: string;
    password: string;
}

export async function registerUser({ name, email, password, }: IRegisterUserProps): Promise<TRegisterUserResult> {
    try {
        const {data, error} = await http.POST("/auth/register", {
            body: {name, email, password},
        });

        if (error) {
            return {
                ok: false,
                error: error as TRegisterUserError,
            };
        }

        if (!data || !data.user) {
            return {
                ok: false,
                error: {
                    message: "Empty response from server",
                    details: [],
                },
            };
        }

        const user = mapUserDto(data.user);

        return {
            ok: true,
            user,
        };
    } catch (e) {
        console.error("[registerUser] unexpected error", e);

        return {
            ok: false,
            error: {
                message: "Unexpected error occurred",
                details: [],
            },
        };
    }
}
