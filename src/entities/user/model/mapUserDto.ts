import type {IUser, TUserDto} from "./user.types";

export const mapUserDto = (dto: TUserDto): IUser => {
    return {
        id: String(dto.id),
        email: dto.email ?? "",
        name: dto.name ?? "",
        avatarUrl: ""
    }
};