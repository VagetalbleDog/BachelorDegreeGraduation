import { Module } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./article.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [ArticleService, JwtService],
  controllers: [ArticleController],
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
})
export class ArticleModule {}
