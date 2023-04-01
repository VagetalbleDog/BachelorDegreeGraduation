import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { sleep } from "src/utils";
import {
  ArticleEditOrCreateReqDTO,
  ArticleResDTO,
  ArtilceDetailResDTO,
  ExecutionResDTO,
  SearchReqDTO,
} from "./article.dto";
import { ArticleEntity } from "./article.entity";
import { ArticleService } from "./article.service";

@Controller("article")
@ApiTags("Article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
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
    const res = await this.articleService.find(query);
    await sleep(300);
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
    const { search } = content;
    const titleRes = await this.articleService.searchByTitle(search);
    await sleep(300);
    return {
      data: titleRes,
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
  async deleteArticle(@Param() { id }) {
    const res = await this.articleService.deleteArticle(id);
    return {
      code: 201,
      res,
    };
  }
}
