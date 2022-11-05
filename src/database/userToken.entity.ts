import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

export class UserTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity;
    @Column()
    token: string;
}