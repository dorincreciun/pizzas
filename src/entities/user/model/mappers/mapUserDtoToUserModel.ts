import type {TUserDto} from "../types/user.dto";
import type {IUser} from "../types/user.model";

export const mapUserDtoToUserModel = (dto: TUserDto): IUser => {
    return {
        id: String(dto.id),
        email: dto.name ?? "",
        name: dto.name ?? "",
        avatarUrl: ""
    }
};