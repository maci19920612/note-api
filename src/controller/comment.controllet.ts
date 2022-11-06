import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CommentEntity } from "src/database/comment.entity";
import { UserEntity } from "src/database/user.entity";
import { CommentDTO } from "src/dto/comment.dto";
import { AuthenticatedGuard, AuthenticatedRequest } from "src/guards/authenticated.guard";
import { CommentMapper } from "src/mapper/comment.mapper";
import { CommentService } from "src/service/comment.service";

@UseGuards(AuthenticatedGuard)
@Controller("/api/notes/comments")
export class CommentController {
    constructor(
        private commentService: CommentService,
        private commentMapper: CommentMapper
    ){}
    @Get(":id")
    async getComments(@Req() request: AuthenticatedRequest, @Param("id") noteId: number) : Promise<CommentDTO[]>{
        return await this.commentMapper.mapArray(await this.commentService.list(request.user, noteId));
    }

    @Post(":id")
    async createComment(@Req() request: AuthenticatedRequest, @Param("id") noteId: number, @Body() comment: CommentDTO) : Promise<CommentDTO>{
        return this.commentMapper.map(await this.commentService.create(request.user, noteId, comment.content));
    }

    @HttpCode(204)
    @Delete(":id")
    async deleteComment(@Req() request: AuthenticatedRequest, @Param("id") commentId: number){
        await this.commentService.delete(request.user, commentId)
    }
}