import { ApiProperty } from "@nestjs/swagger";
import { ArticleEntity } from "./article.entity";

/**
 * DTO
 */

/**
 * request
 */
export class SearchReqDTO {
  @ApiProperty({ description: "搜索内容" })
  search: string;
}
export class ArticleEditOrCreateReqDTO {
  @ApiProperty()
  id: number;
  @ApiProperty({ type: ArticleEntity })
  article: ArticleEntity;
}
/**
 * response
 */
export class ArticleResDTO {
  @ApiProperty()
  code: number;
  @ApiProperty({ type: [ArticleEntity] })
  data: [ArticleEntity];
}

export class ExecutionResDTO {
  @ApiProperty()
  code: number;
  @ApiProperty()
  success: boolean;
}

export class ArtilceDetailResDTO {
  @ApiProperty()
  code: number;
  @ApiProperty({ type: ArticleEntity })
  data: ArticleEntity;
}
