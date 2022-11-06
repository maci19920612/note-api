import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { CommentController } from './controller/comment.controllet';
import { NoteController } from './controller/note.controller';
import { CommentEntity } from './database/comment.entity';
import { NoteEntity } from './database/note.entity';
import { UserEntity } from './database/user.entity';
import { UserTokenEntity } from './database/userToken.entity';
import { CommentMapper } from './mapper/comment.mapper';
import { NoteMapper } from './mapper/note.mapper';
import { UserMapper } from './mapper/user.mapper';
import { AuthService } from './service/auth.service';
import { CommentService } from './service/comment.service';
import { NoteService } from './service/note.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [
        UserEntity,
        UserTokenEntity,
        NoteEntity,
        CommentEntity
      ],
      synchronize: true
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      UserTokenEntity,
      NoteEntity,
      CommentEntity
    ])
  ],
  controllers: [
    AuthController,
    NoteController,
    CommentController
  ],
  providers: [
    UserMapper,
    NoteMapper,
    CommentMapper,
    AuthService,
    NoteService,
    CommentService
  ],
})
export class AppModule {}
