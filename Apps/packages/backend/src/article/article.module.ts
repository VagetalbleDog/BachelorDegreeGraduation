import { Module } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./article.entity";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/user/user.entity";

@Module({
  providers: [ArticleService, JwtService],
  controllers: [ArticleController],
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class ArticleModule {}
