import { Column, ColumnTypeUndefinedError, Entity, PrimaryGeneratedColumn, Table } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    salt: string;
    @Column()
    displayName: string;

    updatePassword(rawPassword: string){
        let salt = bcrypt.genSaltSync();
        let password = bcrypt.hashSync(rawPassword, salt);

        this.salt = salt; 
        this.password = password;
    }

    comparePassword(rawPassword: string){
         return bcrypt.compareSync(rawPassword, this.password); 
    }
}