import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
@Injectable()
export class ArticleService {
    constructor(@InjectRepository(ArticleEntity) private articleEntity:Repository<ArticleEntity>){}
    /**
     * 查询所有文章
     * @return Promise<ArticleEntity>
     */
    async find(){
        return this.articleEntity.find();
    }
}
