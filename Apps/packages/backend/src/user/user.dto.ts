import { ApiProperty } from "@nestjs/swagger";
import { CategoryType } from "src/article/article.entity";
import { UserEntity } from "./user.entity";

/**
 * DTO
 */

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
