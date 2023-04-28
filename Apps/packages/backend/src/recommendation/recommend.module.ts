import { Module } from "@nestjs/common";
import { ArticleService } from "src/article/article.service";
import { UserService } from "src/user/user.service";
import { RecommendService } from "./recommend.service";
@Module({
  providers: [UserService, RecommendService, ArticleService],
})
export class RecommendationModule {}
