import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  ApiBody,
  ApiHeader,
  ApiHeaders,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/role.decorator";
import { UserLoginDTO, UserRegsiterDTO } from "./user.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User")
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  @Post("/register")
  @Roles()
  @HttpCode(201)
  @ApiBody({
    type: UserRegsiterDTO,
  })
  /**
   * 注册用户
   */
  async regsiterUser(@Body() { user }) {
    user.isAdmin = 2;
    try {
      const res = await this.userService.createUser(user);
      return {
        code: 201,
        message: "success",
      };
    } catch (e) {
      return {
        code: 500,
        message: e,
      };
    }
  }

  @Post("/login")
  @Roles()
  @HttpCode(200)
  @ApiBody({
    type: UserLoginDTO,
  })
  /**
   * 用户登录
   */
  async loginUser(@Body() { username, password }) {
    const res = await this.userService.validateUser(username, password);
    if (res) {
      const payload = {
        ...res,
        password: undefined,
      };
      const token = this.jwtService.sign(payload, {
        secret: "zwf.20010928-3",
      });
      return {
        code: 200,
        message: "成功",
        token: token,
      };
    } else {
      return {
        code: 400,
        message: "账号或密码错误",
      };
    }
  }
  /**
   * 获取用户信息
   */
  @Roles("login")
  @Get("/info")
  @HttpCode(200)
  async getUserInfo(@Headers() { authorization }) {
    const token = authorization;
    const userSimpleInfo = this.jwtService.decode(token) as UserEntity;
    const userFullInfo = await this.userService.getUserDetailInfo(
      userSimpleInfo.id
    );
    return {
      code: 200,
      data: userFullInfo,
    };
  }
  /**
   * 根据id获取用户信息
   */
  @Roles("login")
  @Get("/getInfo/:userId")
  @HttpCode(200)
  @ApiParam({ name: "userId", description: "用户ID" })
  async getUserInfoById(@Param() { userId }) {
    const userFullInfo = await this.userService.getUserDetailInfo(userId);
    return {
      code: 200,
      data: userFullInfo,
    };
  }
}
