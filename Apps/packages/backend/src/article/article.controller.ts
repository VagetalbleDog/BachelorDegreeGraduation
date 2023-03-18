import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
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
  /**
   * 精准匹配
   */
  findAll(@Query() query) {
    return this.articleService.find(query);
  }
  @Get("/search")
  @HttpCode(200)
  @ApiQuery({ name: "title", required: false, description: "文章标题搜索" })
  /**
   * 标题模糊匹配
   */
  searchByTitle(@Query() { title }) {
    return this.articleService.find("s");
  }
  // @Get()
  // @HttpCode(200)
  // /**
  //  * 内容模糊匹配
  //  */
  // searchByContent(@Query() { content }) {
  //   return this.articleService.find({ content });
  // }
}
