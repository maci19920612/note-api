import { Injectable } from "@nestjs/common";
import { CommentEntity } from "src/database/comment.entity";
import { UserEntity } from "src/database/user.entity";
import { CommentDTO } from "src/dto/comment.dto";
import { UserDTO } from "src/dto/user.dto";
import { BaseMapper } from "./base.mapper";
import { UserMapper } from "./user.mapper";

@Injectable()
export class CommentMapper extends BaseMapper<CommentEntity, CommentDTO>{
    constructor(
        private userMapper: UserMapper
    ){
        super();
    }

    map(entity: CommentEntity) : CommentDTO{
        return {
            content: entity.content,
            createdAt: entity.createdAt,
            id: entity.id,
            user: this.userMapper.map(entity.user)
        };
    }
}