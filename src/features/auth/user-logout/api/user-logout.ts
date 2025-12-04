import { type components, http } from "@shared/lib/http";
import { useSessionStore } from "@entities/session";

type TLogoutUserError = components["schemas"]["Error"];
type TLogoutUserResponse = components["schemas"]["LogoutResponse"];

type TLogoutUserResult =
    | { ok: true; message: TLogoutUserResponse["message"] }
    | { ok: false; error: TLogoutUserError };

export async function userLogout(): Promise<TLogoutUserResult> {
    const { destroySession } = useSessionStore.getState();

    try {
        const { data, error } = await http.POST("/auth/logout");

        if (error || !data?.message) {
            return {
                ok: false,
                error: (error ??
                    ({
                        message: "Unexpected logout error",
                    } as TLogoutUserError)),
            };
        }

        destroySession();

        return {
            ok: true,
            message: data.message,
        };
    } catch (e) {
        console.error("[userLogout] unexpected error:", e);

        return {
            ok: false,
            error: {
                message: "Unexpected logout error",
            } as TLogoutUserError,
        };
    }
}
