import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { ArticleEntity } from "./article.entity";
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleEntity: Repository<ArticleEntity>
  ) {}
  /**
   * 查询所有文章
   * @return Promise<ArticleEntity>
   */
  async find(query) {
    return this.articleEntity.findBy(query);
  }

  /**
   * 搜索文章By标题
   * @return Promise<ArticleEntity>
   */
  async searchByTitle(search: string) {
    return this.articleEntity.find({ where: { title: Like(`%${search}%`) } });
  }

  /**
   * 搜索文章By内容
   * @return Promise<ArticleEntity>
   */
  async searchByContent(search: string) {
    return this.articleEntity.find({ where: { content: Like(`%${search}%`) } });
  }
}
