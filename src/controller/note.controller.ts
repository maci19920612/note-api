import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { NoteDTO } from "src/dto/node.dto";
import { AuthenticatedGuard, AuthenticatedRequest } from "src/guards/authenticated.guard";
import { NoteMapper } from "src/mapper/note.mapper";
import { NoteService } from "src/service/note.service";



@UseGuards(AuthenticatedGuard)
@Controller('/api/notes')
export class NoteController{

    constructor(
        private noteService: NoteService,
        private noteMapper: NoteMapper
    ){}

    @Get("list")
    async getNotes(@Req() request: AuthenticatedRequest) : Promise<NoteDTO[]> {
        return this.noteMapper.mapArray(await this.noteService.list(request.user));
    }

    @Get("details/:id")
    async getNote(@Req() request: AuthenticatedRequest, @Param("id") id: number) : Promise<NoteDTO>{
        return this.noteMapper.map(await this.noteService.details(request.user, id));
    }

    @Post("create")
    async createNote(@Req() request: AuthenticatedRequest, @Body() note: NoteDTO) : Promise<NoteDTO> {
        return this.noteMapper.map(await this.noteService.create(request.user, note.title, note.content));
    }

    @Put("update/:id")
    async updateNote(@Req() request: AuthenticatedRequest, @Param("id") id: number, @Body() body: NoteDTO) : Promise<NoteDTO>{
        return this.noteMapper.map(await this.noteService.update(request.user, id, body.title, body.content));
    }

    @HttpCode(204)
    @Delete(":id")
    async deleteNote(@Req() request: AuthenticatedRequest, @Param("id") id: number) : Promise<void>{
        await this.noteService.delete(request.user, id)
    }
}