import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Headers,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { RecommendService } from "src/recommendation/recommend.service";
import { UserEntity } from "src/user/user.entity";
import { deduplication, sleep } from "src/utils";
import {
  ArticleEditOrCreateReqDTO,
  ArticleResDTO,
  ArtilceDetailResDTO,
  commentDto,
  ExecutionResDTO,
  likeDto,
  SearchReqDTO,
} from "./article.dto";
import { ArticleEntity } from "./article.entity";
import { ArticleService } from "./article.service";

@Controller("article")
@ApiTags("Article")
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly jwtService: JwtService,
    private readonly recommendService: RecommendService
  ) {}
  @Get()
  @HttpCode(200)
  @ApiQuery({
    name: "category",
    required: false,
    description: "query by category",
  })
  @ApiResponse({ type: ArticleResDTO })
  /**
   * 查询所有文章
   */
  async findAll(@Query() query) {
    const res = await (
      await this.articleService.find(query)
    ).sort((a, b) => b.id - a.id);
    return {
      code: 200,
      data: [...res],
    };
  }
  @Get("/recommend/:userId")
  @HttpCode(200)
  @ApiResponse({ type: ArticleResDTO })
  @ApiParam({ name: "userId", description: "用户ID" })
  /**
   * 根据用户爱好个性化推荐
   */
  async recommend(@Param() { userId }) {
    const res = await this.recommendService.recommendArticle(userId);
    return {
      code: 200,
      data: [...res],
    };
  }
  @Post("/search")
  @HttpCode(200)
  @ApiBody({
    type: SearchReqDTO,
    required: true,
    description: "搜索内容",
  })
  @ApiResponse({ type: ArticleResDTO })
  /**
   * 根据标题搜索
   */
  async search(@Body() content: SearchReqDTO) {
    const { search, category } = content;
    const titleRes = await this.articleService.searchByTitle(search);
    const contentRes = await this.articleService.searchByContent(search);

    const deduplicatedRes = deduplication(titleRes, contentRes).filter((i) => {
      if (!category) {
        return true;
      }
      return i.category === category;
    });
    await sleep(200);
    return {
      data: deduplicatedRes,
      code: 200,
    };
  }

  @Get("/:id")
  @HttpCode(200)
  @ApiParam({ name: "id", description: "文章id" })
  @ApiResponse({ type: ArtilceDetailResDTO })
  /**
   * 根据id查询文章具体内容
   */
  async findDetailById(@Param() { id }) {
    const res = await this.articleService.findDetailById(id);
    await sleep(200);
    return {
      code: 200,
      data: res,
    };
  }
  @Post("/edit")
  @HttpCode(201)
  @ApiBody({ type: ArticleEditOrCreateReqDTO, description: "文章实体" })
  @ApiResponse({ type: ExecutionResDTO })
  /**
   * 修改文章
   */
  async editArticle(@Body() { article, id }) {
    const res = await this.articleService.editArticle(id, article);
    return {
      code: 201,
      res,
    };
  }

  @Post("/create")
  @HttpCode(201)
  @ApiBody({ type: ArticleEditOrCreateReqDTO, description: "文章实体" })
  @ApiResponse({ type: ExecutionResDTO })
  /**
   * 创建文章
   */
  async createArticle(@Body() { article }) {
    const res = await this.articleService.addArticle(article);
    return {
      code: 201,
      res,
    };
  }

  @Post("/delete")
  @HttpCode(201)
  @ApiParam({ name: "id", description: "文章id" })
  @ApiResponse({ type: ExecutionResDTO })
  /**
   * 删除文章
   */
  async deleteArticle(@Param() { id }, @Headers() { authorization }) {
    const articleInfo = await this.articleService.findDetailById(id);
    const token = authorization;
    const userSimpleInfo = this.jwtService.decode(token) as UserEntity;
    if (articleInfo.author.id != userSimpleInfo.id) {
      return {
        code: 403,
        res: "failed",
      };
    }
    const res = await this.articleService.deleteArticle(id);
    return {
      code: 201,
      res,
    };
  }
  /**
   * 点赞文章
   */
  @Post("/like")
  @HttpCode(201)
  @ApiBody({ type: likeDto, description: "" })
  async likeArticle(@Body() { userId, articleId }) {
    const res = await this.articleService.likeArticle(userId, articleId);
    if (res === true) {
      return {
        code: 200,
        message: "success",
      };
    } else {
      return {
        code: 500,
        error: res,
      };
    }
  }
  /**
   * 收藏文章
   */
  @Post("/collect")
  @HttpCode(201)
  @ApiBody({ type: likeDto, description: "" })
  async collectArticle(@Body() { userId, articleId }) {
    const res = await this.articleService.collectArticle(userId, articleId);
    if (res === true) {
      return {
        code: 200,
        message: "success",
      };
    } else {
      return {
        code: 500,
        error: res,
      };
    }
  }
  /**
   * 取消收藏文章
   */
  @Post("/unCollect")
  @HttpCode(201)
  @ApiBody({ type: likeDto, description: "" })
  async unCollect(@Body() { userId, articleId }) {
    const res = await this.articleService.unCollect(userId, articleId);
    if (res === true) {
      return {
        code: 200,
        message: "success",
      };
    } else {
      return {
        code: 500,
        error: res,
      };
    }
  }
  /**
   * 评论文章
   */
  @Post("/comment")
  @HttpCode(201)
  @ApiBody({
    type: commentDto,
    description: "评论内容",
  })
  async comment(@Body() { comment }) {
    const res = await this.articleService.addComment(comment);
    return {
      code: 201,
      res,
    };
  }
}
