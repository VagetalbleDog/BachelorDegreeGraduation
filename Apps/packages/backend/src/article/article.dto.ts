import { ApiProperty } from "@nestjs/swagger";
import { CommentEntity } from "src/comment/comment.entity";
import { ArticleEntity, CategoryType } from "./article.entity";

/**
 * DTO
 */

/**
 * request
 */
export class SearchReqDTO {
  @ApiProperty({ description: "搜索内容" })
  search: string;
  @ApiProperty({ description: "文章类型" })
  category: CategoryType;
}
export class ArticleEditOrCreateReqDTO {
  @ApiProperty()
  id: number;
  @ApiProperty({ type: ArticleEntity })
  article: ArticleEntity;
}
export class likeDto {
  @ApiProperty({ description: "用户id" })
  userId: number;
  @ApiProperty({ description: "文章id" })
  articleId: number;
}
export class commentDto {
  @ApiProperty({
    description: "评论",
    type: CommentEntity,
  })
  comment: CommentEntity;
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
