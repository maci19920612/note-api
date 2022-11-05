import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/database/user.entity";
import { UserTokenEntity } from "src/database/userToken.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

export type Token = {
    token: string;
};

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(UserTokenEntity) private userTokenRepository: Repository<UserTokenEntity>
    ) { }

    async login(email: string, password: string): Promise<Token> {
        let targetUser = await this.userRepository.findOne({
            where: {
                email
            }
        });

        if (!targetUser || !targetUser.comparePassword(password)) {
            throw new Error("Missing user from the database");
        }
        let token = await this.generateToken(targetUser);
        await this.userTokenRepository.save({
            token,
            user: targetUser
        });

        return { token };
    }

    async register(displayName: string, email: string, password: string): Promise<Token> {
        let targetUser = new UserEntity();
        targetUser.displayName = displayName;
        targetUser.email = email;
        targetUser.updatePassword(password);
        let user = await this.userRepository.save(targetUser);

        let token = await this.generateToken(user);
        await this.userTokenRepository.save({
            token, 
            user
        });

        return {token};
    }

    private async generateToken(user: UserEntity): Promise<string> {
        return await bcrypt.hash(Math.random() + "--" + user.id, 10);
    }

    async logout(token: string): Promise<void> {
        let userTokenEntity = await this.userTokenRepository.findOne({
            where: {
                token
            }
        });
        if(!userTokenEntity){
            return;
        }
        await this.userTokenRepository.remove(userTokenEntity);
     }
}