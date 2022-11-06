import { Body, Controller, Delete, HttpCode, HttpException, HttpStatus, Injectable, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard, AuthenticatedRequest } from "src/guards/authenticated.guard";
import { AuthService } from "src/service/auth.service";

export type LoginRequestDTO = {
    email: string;
    password: string;
};
export type RegisterRequestDTO = {
    email: string;
    password: string;
    displayName: string;
};

export type TokenResponseDTO = {
    token: string;
};

@Controller("/api/auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }
    @Post("login")
    async login(@Body() body: LoginRequestDTO): Promise<TokenResponseDTO> {
        try {
            let token = await this.authService.login(body.email, body.password);
            return {
                token: token.token
            };
        } catch (ex) {
            console.error(ex);
            throw new HttpException("Invalid username or password", 401);
        }
    }

    @Post("register")
    async register(@Body() body: RegisterRequestDTO): Promise<TokenResponseDTO> {
        try {
            let token = await this.authService.register(body.displayName, body.email, body.password);
            return {
                token: token.token
            };
        } catch (error) {
            console.error(error);
            throw new HttpException("Email already taken??", 401);
        }
    }

    @HttpCode(204)
    @Delete("login")
    @UseGuards(AuthenticatedGuard)
    async logout(@Req() request: AuthenticatedRequest){
        await this.authService.logout(request.headers["authorization"].replace("Bearer ", ""));
    }

}