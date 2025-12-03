import { http } from "@shared/lib/http";
import { useSessionStore } from "@entities/session";
import { mapUserDtoToUser } from "@entities/user";

export async function initSession(): Promise<void> {
    const { createSession, destroySession } = useSessionStore.getState();

    try {
        const { data, error } = await http.GET("/auth/me");

        if (error) {
            console.warn("[initSession] error fetching session:", error);
            destroySession();
            return;
        }

        if (!data?.user) {
            destroySession();
            return;
        }

        const user = mapUserDtoToUser(data.user);
        createSession(user);

    } catch (e) {
        console.error("[initSession] unexpected error:", e);
        destroySession();
    }
}
