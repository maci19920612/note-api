import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite"
    }),
    TypeOrmModule.forFeature([

    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
