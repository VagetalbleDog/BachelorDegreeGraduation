import {
  Injectable,
  CanActivate,
  ConsoleLogger,
  ExecutionContext,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { UserEntity } from "src/user/user.entity";
/**
 * 全局权限守卫，获取每次请求的头部的token。
 * 使用jwt加解密，解密后对角色进行权限认证，认证成功放行。
 * 配合自定义角色装饰器使用
 */
/**
 * 登录使用权限 @Roles("normal")
 */
/**
 * 无需登录的最低权限 @Roles()
 */
/**
 * 管理员权限 @Roles('administrator')
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization) {
      return false;
    }
    //拿到jwt
    const token = authorization;
    // 没有token说明未登录
    if (!token) {
      return false;
    }
    //解密
    const userInfo = this.jwtService.decode(token) as UserEntity;
    if (roles.includes("admin")) {
      if (userInfo.isAdmin === 1) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
