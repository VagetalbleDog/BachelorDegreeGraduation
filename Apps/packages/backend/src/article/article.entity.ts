import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/user/user.entity";
import { CommentEntity } from "src/comment/comment.entity";
export enum CategoryType {
  FRONTEND = 1,
  BACKEND = 2,
  CLIENT = 3,
  ALGORITHM = 4,
  IOS = 5,
  QA = 6,
  MAINTAIN = 7,
}
export const CategoryTextMap = {
  [CategoryType.FRONTEND]: "前端",
  [CategoryType.BACKEND]: "后端",
  [CategoryType.CLIENT]: "客户端",
  [CategoryType.ALGORITHM]: "算法",
  [CategoryType.IOS]: "IOS",
  [CategoryType.QA]: "测试",
  [CategoryType.MAINTAIN]: "运维",
};
@Entity({ name: "Article" })
export class ArticleEntity {
  @ApiProperty({
    default: 2,
    description: "文章id",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    default: "React hooks的那些事",
    description: "文章标题",
  })
  @Column({ type: "varchar", length: 256 })
  title: string;

  @ApiProperty({
    default: "React hooks是一个新特性。。。",
    description: "文章描述",
  })
  @Column({ type: "varchar", length: 256 })
  desc: string;

  @ApiProperty({
    default: "",
    description: "文章内容",
  })
  @Column({ type: "text" })
  content: string;

  @ApiProperty({
    description: "评论",
    type: [CommentEntity],
  })
  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];

  @ApiProperty({
    enum: CategoryType,
    default: CategoryType.FRONTEND,
    description: "文章分类",
  })
  @Column({ type: "enum", enum: CategoryType, default: CategoryType.FRONTEND })
  category: CategoryType;

  @ApiProperty({
    type: [UserEntity],
    description: "点赞的用户",
  })
  @ManyToMany(() => UserEntity, (user) => user.likedArticles)
  likedBy: UserEntity[];

  @ApiProperty({
    type: [UserEntity],
    description: "收藏的用户",
  })
  @ManyToMany(() => UserEntity, (user) => user.collectArticles)
  collectBy: UserEntity[];

  @ApiProperty({
    description: "作者",
    type: UserEntity,
  })
  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;
}
