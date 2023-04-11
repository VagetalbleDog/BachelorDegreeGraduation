import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import * as bcrypt from "bcryptjs";
import { isEmpty } from "rxjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>
  ) {}
  /**
   * 验证用户
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userEntity.find({
      where: { username: username },
    });
    if (user.length === 0) {
      // 不存在此用户
      return false;
    }

    const hashedPassword = user[0].password;
    if (bcrypt.compare(password, hashedPassword)) {
      return user;
    }
    return false;
  }
  /**
   * 注册用户
   */
  async createUser(user: UserEntity) {
    // 查找有无同名用户
    const findSameUserName = await this.userEntity.find({
      where: { username: user.username },
    });
    if (findSameUserName.length > 0) {
      throw new Error();
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return this.userEntity.insert(user);
  }
}
