import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticleModule } from "./article/article.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./article/article.entity";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { UserModule } from "./user/user.module";
import { UserEntity } from "./user/user.entity";
import { CommentModule } from "./comment/comment.module";
import { CommentEntity } from "./comment/comment.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      username: "root",
      password: "zwf.20010928-3",
      database: "tecCommunity",
      port: 3306,
      entities: [ArticleEntity, UserEntity, CommentEntity],
      // synchronize: true,
      autoLoadEntities: true,
    }),
    ArticleModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
