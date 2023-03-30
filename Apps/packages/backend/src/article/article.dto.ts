import { ApiProperty } from "@nestjs/swagger";
import { ArticleEntity } from "./article.entity";

/**
 * DTO
 */
export class SearchDTO {
  @ApiProperty({ description: "搜索内容" })
  search: string;
}
export class ArticleResDTO {
  @ApiProperty()
  code: number;
  @ApiProperty({ type: [ArticleEntity] })
  data: [ArticleEntity];
}
