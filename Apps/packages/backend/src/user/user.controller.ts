import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UserLoginDTO, UserRegsiterDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  @Post("/register")
  @HttpCode(201)
  @ApiBody({
    type: UserRegsiterDTO,
  })
  /**
   * 注册用户
   */
  async regsiterUser(@Body() { user }) {
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
        username,
        id: res.id,
        work: res.work,
        interestsJson: res.interestsJson,
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
}
