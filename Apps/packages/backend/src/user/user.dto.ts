import { ApiProperty } from "@nestjs/swagger";
import { CategoryType } from "src/article/article.entity";
import { UserEntity } from "./user.entity";

/**
 * DTO
 */
export const enum ActionType {
  view = 1,
  like = 2,
  collect = 3,
}
/**
 * request
 */

export class UserRegsiterDTO {
  @ApiProperty({ description: "用户信息" })
  user: UserEntity;
}
export class UserLoginDTO {
  @ApiProperty({ description: "账号" })
  username: string;
  @ApiProperty({ description: "密码" })
  password: string;
}
export class FollowUserDTO {
  @ApiProperty({ description: "粉丝id" })
  fansId: number;
  @ApiProperty({ description: "被关注的人id" })
  followId: number;
}
export class updateInterestDTO {
  @ApiProperty({ description: "" })
  category: CategoryType;
  @ApiProperty({ description: "行为类型" })
  actionType: ActionType;
  @ApiProperty({ description: "用户id" })
  userId: number;
}
