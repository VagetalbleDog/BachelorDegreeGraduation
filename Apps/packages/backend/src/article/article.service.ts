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
    return this.articleEntity.find({ where: query, loadRelationIds: true });
  }

  /**
   * 搜索文章By标题
   * @return Promise<ArticleEntity>
   */
  async searchByTitle(search: string) {
    return this.articleEntity.find({
      where: { title: Like(`%${search}%`) },
      loadRelationIds: true,
    });
  }

  /**
   * 搜索文章By内容
   * @return Promise<ArticleEntity>
   */
  async searchByContent(search: string) {
    return this.articleEntity.find({
      where: { content: Like(`%${search}%`) },
      loadRelationIds: true,
    });
  }
  /**
   * id 查询文章具体内容
   * @return Promise<ArticleEntity>
   */
  async findDetailById(id: number) {
    const res = await this.articleEntity.find({
      where: { id: id },
      relations: ["author", "comments", "likedBy", "collectBy"],
    });
    return res[0];
  }
  /**
   * 添加新文章
   * @return Promise<boolean>
   */
  async addArticle(article: ArticleEntity) {
    try {
      await this.articleEntity.insert(article);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * 删除文章
   * @return Promise<boolean>
   */
  async deleteArticle(id: number) {
    try {
      await this.articleEntity.delete({ id: id });
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * 修改文章
   * @return Promise<boolean>
   */
  async editArticle(id: number, article: ArticleEntity) {
    try {
      await this.articleEntity.update({ id: id }, article);
      return true;
    } catch (e) {
      return false;
    }
  }
}
