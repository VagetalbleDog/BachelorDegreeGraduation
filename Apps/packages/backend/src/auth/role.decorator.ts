/**
 * 自定义装饰器，使用方法如下
 * @Roles('admin','normal')
 * const roles = this.reflector.get<string[]>('roles',context.getHandler());
 * roles = ['admin','normal']
 */
import { SetMetadata } from "@nestjs/common";
import { applyDecorators } from "@nestjs/common";
export const Roles = (...roles: string[]) =>
  applyDecorators(SetMetadata("roles", roles));
