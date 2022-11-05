import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteEntity } from "src/database/note.entity";
import { UserEntity } from "src/database/user.entity";
import { NoConnectionForRepositoryError, Repository } from "typeorm";

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(NoteEntity) private noteRepository: Repository<NoteEntity>
    ) { }

    async list(user: UserEntity): Promise<NoteEntity[]> {
        return await this.noteRepository.find({
            where: {
                user: {
                    id: user.id
                }
            },
            relations: ["user"]
        });
    }

    async details(user: UserEntity, id: number): Promise<NoteEntity> {
        return await this.noteRepository.findOne({
            relations: ["user"],
            where: {
                id,
                user: {
                    id: user.id
                }
            }
        });
    }

    async create(user: UserEntity, title: string, content: string): Promise<NoteEntity> {
        let note = this.noteRepository.create();
        note.title = title;
        note.content = content;
        note.user = user;
        return await this.noteRepository.save(note);
    }

    async update(user: UserEntity, id: number, title: string, content: string): Promise<NoteEntity> {
        let targetNote = await this.noteRepository.findOne({
            where: {
                id,
                user: {
                    id: user.id
                }
            },
            relations: ["user"]
        });
        if (!targetNote) {
            throw new Error("Note not found in the database");
        }

        targetNote.title = title;
        targetNote.content = content;
        return await this.noteRepository.save(targetNote);
    }

    async delete(user: UserEntity, id: number): Promise<void> {
        let targetNote = await this.noteRepository.findOne({
            where: {
                user: {
                    id: user.id
                },
                id
            },
            relations: ["user"]
        });
        if (targetNote) {
            await this.noteRepository.remove(targetNote);
        }
    }
}