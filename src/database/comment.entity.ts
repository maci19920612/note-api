import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NoteEntity } from "./note.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => NoteEntity, note => note.id)
    note: NoteEntity;
    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity;
    @Column()
    content: string;
    @CreateDateColumn()
    createdAt: Date;
}