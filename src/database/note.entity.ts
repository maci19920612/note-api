import { userInfo } from "os";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class NoteEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity;
    @Column()
    title: string;
    @Column()
    content: string;
    @CreateDateColumn()
    createdAt: Date;
}