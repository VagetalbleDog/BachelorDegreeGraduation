import { Injectable } from "@nestjs/common";
import { ArticleService } from "src/article/article.service";
import { UserService } from "src/user/user.service";
import { deduplication, interestsJsonToVector } from "src/utils";

@Injectable()
export class RecommendService {
  constructor(
    private userService: UserService,
    private articleService: ArticleService
  ) {}
  /**
   * 工具函数 计算点积
   */
  dotProduct(vectorA: number[], vectorB: number[]) {
    return vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);
  }
  /**
   * 工具函数 计算向量绝对值
   */
  magnitude(vector: number[]): number {
    return Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0));
  }
  /**
   * 推荐算法实现过程 ☆☆☆☆☆
   * 算法原理：对用户的兴趣值矩阵做协同过滤
   * 实现语言：typescript
   * @param userId 接受用户id作为参数，为该用户推荐符合其兴趣的文章
   * @Return Article[] 返回推荐文章列表
   */
  async recommendArticle(userId) {
    /**
     * 1、查找目标用户的信息
     */
    const targetUser = await this.userService.getUserDetailInfo(userId);
    /**
     * 2、查找除目标用户外所有用户的信息
     */
    const otherUsers = (await this.userService.findAll()).filter(
      (u) => u.id !== targetUser.id
    );
    /**
     * 3、通过用户的interestJson字段 构造用户——兴趣矩阵
     */
    const matrix = [];
    for (const u of otherUsers) {
      matrix.push({ id: u.id, interest: u.interestsJson });
    }
    /**
     * 4、计算矩阵中每个用户与目标用户兴趣值的余弦相似度，并用一个数组记录
     */
    const similaritys = [];
    for (const u of matrix) {
      // 计算余弦相似度
      const targetUserInterestVector = interestsJsonToVector(
        targetUser.interestsJson
      ); // 目标用户兴趣向量
      const otherUserInterestVector = interestsJsonToVector(u.interest); // 其他用户兴趣向量
      const dot = this.dotProduct(
        targetUserInterestVector,
        otherUserInterestVector
      ); // 计算点积
      const magA = this.magnitude(targetUserInterestVector); // 计算向量绝对值
      const magB = this.magnitude(otherUserInterestVector); // 计算向量绝对值
      const cosineSimilarity = dot / (magA * magB);
      similaritys.push({
        id: u.id,
        score: cosineSimilarity,
      }); // 存入数组记录
    }
    /**
     * 5、对相似度进行排序 选取跟目标用户相似度最高前五个用户，依次将用户的点赞与收藏推荐给目标用户
     */
    similaritys.sort((a, b) => b.score - a.score);
    const recommendArticleIds = [];
    for (let i = 0; i < Math.min(5, similaritys.length); i++) {
      const topSimUser = await this.userService.getUserDetailInfo(
        similaritys[i].id
      );
      // 添加收藏文章id
      for (const art of topSimUser.collectArticles) {
        recommendArticleIds.push(art.id);
      }
      // 添加点赞文章id
      for (const art of topSimUser.likedArticles) {
        recommendArticleIds.push(art.id);
      }
    }
    // 重复文章id去重
    const deduplicatedIds = new Set(recommendArticleIds);
    /**
     * 6、根据文章id查询文章详细内容并返回
     */
    const recommendArticles = [];
    for (const id of deduplicatedIds) {
      recommendArticles.push(await this.articleService.findDetailById(id));
    }
    return recommendArticles;
  }
}
