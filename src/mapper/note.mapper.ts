import { Injectable, NotImplementedException } from "@nestjs/common";
import { NoteEntity } from "src/database/note.entity";
import { NoteDTO } from "src/dto/node.dto";
import { BaseMapper } from "./base.mapper";
import { UserMapper } from "./user.mapper";

@Injectable()
export class NoteMapper extends BaseMapper<NoteEntity, NoteDTO>{
    constructor(
        private userMapper: UserMapper
    ){
        super();
    }

    map(entity: NoteEntity) : NoteDTO{
        return {
            createdAt: entity.createdAt,
            content: entity.content,
            id: entity.id,
            title: entity.title,
            user: this.userMapper.map(entity.user)
        };
    }
}