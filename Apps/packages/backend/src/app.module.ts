import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticleModule } from "./article/article.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./article/article.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      username: "root",
      password: "zwf.20010928-3",
      database: "tecCommunity",
      port: 3306,
      entities: [ArticleEntity],
      // synchronize: true,
      autoLoadEntities: true,
    }),
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
