import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { UserEntity } from "src/database/user.entity";
import { UserTokenEntity } from "src/database/userToken.entity";
import { Repository } from "typeorm";

export type AuthenticatedRequest = Request & {
    user: UserEntity
};

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(
        @InjectRepository(UserTokenEntity) private userTokenRepository: Repository<UserTokenEntity>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let request: AuthenticatedRequest = context.switchToHttp().getRequest();
        let authHeader = request.headers["authorization"];
        if (!authHeader) {
            throw new HttpException("Authorization header is missing", 403);
        }
        let token = authHeader.replace("Bearer ", "");
        let targetUserToken = await this.userTokenRepository.findOne({
            where: {
                token
            },
            relations: ["user"]
        });
        if (!targetUserToken) {
            //TODO: Consider return false...
            throw new HttpException("User token is missing, probably revoked", 403);
        }
        request.user = targetUserToken.user;
        return true;
    }

}