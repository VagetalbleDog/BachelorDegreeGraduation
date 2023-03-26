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
import { ArticleEntity } from "./article.entity";
import { ArticleService } from "./article.service";

/**
 * DTO
 */
export class searchDto {
  @ApiProperty({ description: "搜索内容" })
  search: string;
}

@Controller("article")
@ApiTags("Article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  @HttpCode(200)
  @ApiQuery({ name: "id", required: false, description: "query by id" })
  @ApiQuery({
    name: "category",
    required: false,
    description: "query by category",
  })
  @ApiResponse({ type: [ArticleEntity] })
  /**
   * 精准匹配
   */
  findAll(@Query() query) {
    return this.articleService.find(query);
  }

  @Post("/search")
  @HttpCode(200)
  @ApiBody({
    type: searchDto,
    required: true,
    description: "搜索内容",
  })
  /**
   * 标题模糊匹配
   */
  async search(@Body() content: searchDto) {
    const { search } = content;
    const titleRes = await this.articleService.searchByTitle(search);
    const contentRes = await this.articleService.searchByContent(search);
    const result = [...titleRes, ...contentRes];
    return {
      data: result,
      code: 200,
    };
  }
}
