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
import { ArticleResDTO, SearchDTO } from "./article.dto";
import { ArticleService } from "./article.service";

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
  @ApiResponse({ type: ArticleResDTO })
  /**
   * 精准匹配
   */
  async findAll(@Query() query) {
    const res = await this.articleService.find(query);
    return {
      code: 200,
      data: [...res],
    };
  }

  @Post("/search")
  @HttpCode(200)
  @ApiBody({
    type: SearchDTO,
    required: true,
    description: "搜索内容",
  })
  @ApiResponse({ type: ArticleResDTO })
  /**
   * 标题模糊匹配
   */
  async search(@Body() content: SearchDTO) {
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
