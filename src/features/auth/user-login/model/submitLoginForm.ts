import { loginUser } from "../api/loginUser";
import { useSessionStore } from "@entities/session";

export async function submitLoginForm(email: string, password: string) {
    const { createSession, destroySession } = useSessionStore.getState();
    const result = await loginUser({ email, password });

    if (!result.ok) {
        destroySession();

        return {
            success: false as const,
            message: result.error.message ?? "Unknown error",
        };
    }

    createSession(result.user);

    return {
        success: true as const,
    };
}
