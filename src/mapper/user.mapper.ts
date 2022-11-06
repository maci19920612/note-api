import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/database/user.entity";
import { UserDTO } from "src/dto/user.dto";
import { BaseMapper } from "./base.mapper";

@Injectable()
export class UserMapper extends BaseMapper<UserEntity, UserDTO>{
    map(entity: UserEntity) : UserDTO{
        return {
            displayName: entity.displayName,
            email: entity.email
        };
    }
}