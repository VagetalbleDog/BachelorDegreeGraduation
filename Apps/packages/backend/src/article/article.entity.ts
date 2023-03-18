import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
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

  // @ApiProperty({
  //     default:[],
  //     description:'评论'
  // })
  // @Column({type:'array'})
  // comments:any[]

  @ApiProperty({
    enum: CategoryType,
    default: CategoryType.FRONTEND,
    description: "文章分类",
  })
  @Column({ type: "enum", enum: CategoryType, default: CategoryType.FRONTEND })
  category: CategoryType;

  @ApiProperty({
    default: 0,
    description: "点赞次数",
  })
  @Column({ type: "int", default: 0 })
  like_cnt: number;

  @ApiProperty({
    default: 0,
    description: "收藏次数",
  })
  @Column({ type: "int", default: 0 })
  collect_cnt: number;
}
