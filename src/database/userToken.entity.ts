import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class UserTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity;
    @Column()
    token: string;
}