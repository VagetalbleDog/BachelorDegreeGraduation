// User entity
import { ApiProperty } from "@nestjs/swagger";
import { ArticleEntity, CategoryType } from "src/article/article.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity({ name: "User" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    default: 2,
    description: "用户id",
  })
  id: number;

  @ApiProperty({
    default: "",
    description: "用户名",
  })
  @Column()
  username: string;

  @ApiProperty({
    default: "",
    description: "密码",
  })
  @Column()
  password: string;

  @ApiProperty({
    default: "",
    description: "头像",
  })
  @Column()
  avatar: string;

  @ApiProperty({
    default: "",
    description: "社区名",
  })
  @Column()
  nickname: string;

  @ApiProperty({
    default: "",
    description: "职业",
    type: CategoryType,
    enum: CategoryType,
  })
  @Column()
  work: CategoryType;

  @ApiProperty({
    default: "",
    description: "个人描述",
  })
  @Column()
  selfDesc: string;

  @ApiProperty({
    default: "",
    description: "感兴趣领域",
  })
  @Column()
  interestsJson: string;

  @ApiProperty({
    default: "",
    description: "是否为管理员",
  })
  @Column()
  isAdmin: number;

  @ApiProperty({
    default: "",
    description: "我的文章",
    type: () => [ArticleEntity],
  })
  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];

  @ApiProperty({
    default: "",
    description: "我喜欢的文章",
    type: () => [ArticleEntity],
  })
  @ManyToMany(() => ArticleEntity, (artcile) => artcile.likedBy)
  @JoinTable()
  likedArticles: ArticleEntity[];

  @ApiProperty({
    default: "",
    description: "我收藏的文章",
    type: () => [ArticleEntity],
  })
  @ManyToMany(() => ArticleEntity, (article) => article.collectBy)
  @JoinTable()
  collectArticles: ArticleEntity[];

  @ApiProperty({
    description: "我的粉丝",
    type: () => [UserEntity],
  })
  @ManyToMany(() => UserEntity, (user) => user.follows)
  fans: UserEntity[];

  @ApiProperty({
    description: "我的关注",
    type: () => [UserEntity],
  })
  @JoinTable()
  @ManyToMany(() => UserEntity, (user) => user.fans)
  follows: UserEntity[];
}
