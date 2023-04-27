import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "src/comment/comment.entity";
import { UserEntity } from "src/user/user.entity";
import { Like, Repository } from "typeorm";
import { ArticleEntity } from "./article.entity";
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleEntity: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private userService: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private commentService: Repository<CommentEntity>
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
      const res = await this.articleEntity.insert(article);
      return { id: res.identifiers[0].id };
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
  async editArticle(id: number, editArticle: ArticleEntity) {
    try {
      let article = await this.articleEntity.findOne({ where: { id: id } });
      article = editArticle;
      await this.articleEntity.save(article);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * 点赞文章
   */
  async likeArticle(userId: number, articleId: number) {
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: [
        "collectArticles",
        "likedArticles",
        "follows",
        "fans",
        "articles",
      ],
    });
    const article = await this.articleEntity.findOne({
      where: { id: articleId },
      relations: ["likedBy", "author", "collectBy", "comments"],
    });
    try {
      article.likedBy.push(user);
      await this.articleEntity.save(article);
      return true;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  /**
   * 收藏文章
   */
  async collectArticle(userId: number, articleId: number) {
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: [
        "collectArticles",
        "likedArticles",
        "follows",
        "fans",
        "articles",
      ],
    });
    const article = await this.articleEntity.findOne({
      where: { id: articleId },
      relations: ["likedBy", "author", "collectBy", "comments"],
    });
    try {
      article.collectBy.push(user);
      await this.articleEntity.save(article);
      return true;
    } catch (e) {
      return e;
    }
  }
  /**
   * 取消收藏文章
   */
  async unCollect(userId: number, articleId: number) {
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: [
        "collectArticles",
        "likedArticles",
        "follows",
        "fans",
        "articles",
      ],
    });
    const article = await this.articleEntity.findOne({
      where: { id: articleId },
      relations: ["likedBy", "author", "collectBy", "comments"],
    });
    try {
      user.collectArticles = user.collectArticles.filter(
        (art) => art.id !== article.id
      );
      await this.userService.save(user);
      return true;
    } catch (e) {
      return e;
    }
  }
  /**
   * 评论文章
   */
  async addComment(comment: CommentEntity) {
    try {
      const res = await this.commentService.insert(comment);
      return { id: res.identifiers[0].id };
    } catch (e) {
      return false;
    }
  }
}
