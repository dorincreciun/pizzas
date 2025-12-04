import type {components} from "@shared/lib/http";

export type TUserDto = components['schemas']['UserDTO']

export interface IUser {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
}