import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article/article.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
      database: 'db.sql',
      entities: [ArticleEntity],
      synchronize: true,
      autoLoadEntities:true
  }),ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
