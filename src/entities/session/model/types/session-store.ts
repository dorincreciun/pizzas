import type {IUser} from "@entities/user/@x/session";

export interface ISessionStore {
    user: IUser | null;
    createSession(user: IUser): void;
    destroySession(): void;
}