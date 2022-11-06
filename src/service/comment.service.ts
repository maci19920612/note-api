import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "src/database/comment.entity";
import { NoteEntity } from "src/database/note.entity";
import { UserEntity } from "src/database/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class CommentService {
    
    constructor(
        @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
        @InjectRepository(NoteEntity) private noteRepository: Repository<NoteEntity>
    ) { }

    async list(user: UserEntity, noteId: number): Promise<CommentEntity[]> {
        return this.commentRepository.find({
            where: {
                note: {
                    id: noteId
                }
            },
            relations: ["note", "user"]
        });
    }

    async create(user: UserEntity, noteId: number, content: string): Promise<CommentEntity> {
        let targetNote = await this.noteRepository.findOne({
            where: {
                id: noteId
            }
        });
        if (!targetNote) {
            throw new Error(`Note not exists with this id: ${noteId}`);
        }

        let comment = this.commentRepository.create();
        comment.content = content;
        comment.user = user;
        comment.note = targetNote;
        return await this.commentRepository.save(comment);
    }

    async delete(user: UserEntity, id: number): Promise<void> {
        let targetComment = await this.commentRepository.findOne({
            where: {
                id,
                user: {
                    id: user.id
                }
            },
            relations: ["user"]
        });

        if (targetComment) {
            await this.commentRepository.remove(targetComment);
        }
    }
}