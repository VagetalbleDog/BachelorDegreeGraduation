import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ArticleService } from "./article.service";

@Controller("article")
@ApiTags("文章模块")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  @HttpCode(200)
  @ApiQuery({ name: "id", required: false, description: "根据id查询文章" })
  @ApiQuery({
    name: "category",
    required: false,
    description: "根据文章分类查询文章",
  })
  /**
   * 精准匹配
   */
  findAll(@Query() query) {
    return this.articleService.find(query);
  }
  @Get()
  @HttpCode(200)
  @ApiQuery({ name: "title", required: false, description: "文章标题搜索" })
  /**
   * 标题模糊匹配
   */
  searchByTitle(@Query() { title }) {
    return this.articleService.find("s");
  }
  @Get()
  @HttpCode(200)
  @ApiQuery({ name: "id", required: false, description: "根据id查询文章" })
  /**
   * 内容模糊匹配
   */
  searchByContent(@Query() { content }) {
    return this.articleService.find({ content });
  }
}
