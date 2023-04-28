import { Module } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./article.entity";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/user/user.entity";
import { CommentEntity } from "src/comment/comment.entity";
import { RecommendService } from "src/recommendation/recommend.service";
import { UserService } from "src/user/user.service";

@Module({
  providers: [ArticleService, JwtService, RecommendService, UserService],
  controllers: [ArticleController],
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([CommentEntity]),
  ],
})
export class ArticleModule {}
