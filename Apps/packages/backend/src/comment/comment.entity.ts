// User entity
import { ApiProperty } from "@nestjs/swagger";
import { ArticleEntity } from "src/article/article.entity";
import { UserEntity } from "src/user/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class CommentEntity {
  @ApiProperty({
    default: 2,
    description: "评论id",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    default: 2,
    description: "评论内容",
  })
  @Column()
  content: string;

  @ApiProperty({
    default: 2,
    description: "评论目标用户",
  })
  @ManyToOne(() => UserEntity)
  to: UserEntity;

  @ApiProperty({
    default: 2,
    description: "评论来自用户",
  })
  @ManyToOne(() => UserEntity)
  from: UserEntity;

  @ApiProperty({
    default: 2,
    description: "评论文章",
  })
  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}
