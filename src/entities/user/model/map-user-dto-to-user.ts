import type {TUserDto} from "./user-dto.types";
import type {IUser} from "./user.types";

export const mapUserDtoToUser = (dto: TUserDto): IUser => {
    return {
        id: String(dto.id),
        email: dto.name ?? "",
        name: dto.name ?? "",
        avatarUrl: ""
    }
};