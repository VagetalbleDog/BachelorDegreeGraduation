import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import * as bcrypt from "bcryptjs";
import { isEmpty } from "rxjs";
import { ActionType } from "./user.dto";
import { CategoryType } from "src/article/article.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>
  ) {}
  /**
   * 验证用户
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userEntity.findOne({
      where: { username: username },
    });
    if (!user) {
      // 不存在此用户
      return false;
    }

    const hashedPassword = user.password;
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
  /**
   * 查找用户详情
   */
  async getUserDetailInfo(id: number) {
    const user = await this.userEntity.findOne({
      where: {
        id,
      },
      relations: [
        "collectArticles",
        "likedArticles",
        "follows",
        "fans",
        "articles",
      ],
    });
    return user;
  }
  /**
   * 关注某用户
   */
  async followUser(fansId: number, followId: number) {
    const fans = await this.userEntity.findOne({
      where: { id: fansId },
      relations: [
        "collectArticles",
        "likedArticles",
        "follows",
        "fans",
        "articles",
      ],
    });
    const follow = await this.userEntity.findOne({
      where: { id: followId },
      relations: [
        "collectArticles",
        "likedArticles",
        "follows",
        "fans",
        "articles",
      ],
    });
    try {
      follow.fans.push(fans);
      await this.userEntity.save(follow);
      return true;
    } catch (e) {
      return e;
    }
  }
  /**
   * 取消关注
   */
  async unfollow(fansId: number, followId: number) {
    const fans = await this.userEntity.findOne({
      where: { id: fansId },
      relations: [
        "collectArticles",
        "likedArticles",
        "follows",
        "fans",
        "articles",
      ],
    });
    const follow = await this.userEntity.findOne({
      where: { id: followId },
      relations: [
        "collectArticles",
        "likedArticles",
        "follows",
        "fans",
        "articles",
      ],
    });
    try {
      follow.fans = follow.fans.filter((fan) => fan.id !== fans.id);
      await this.userEntity.save(follow);
      return true;
    } catch (e) {
      return e;
    }
  }
  /**
   * 查找所有用户
   */
  async findAll() {
    return this.userEntity.find();
  }
  /**
   * 更新用户兴趣评分矩阵
   */
  async updateInterest(
    category: CategoryType,
    userId: number,
    actionType: ActionType,
    debuff?: boolean
  ) {
    const actionTypeScoreMap = {
      [ActionType.view]: 1,
      [ActionType.like]: 5,
      [ActionType.collect]: 10,
    };
    const score = actionTypeScoreMap[actionType];
    const user = await this.getUserDetailInfo(userId);
    const updated = JSON.parse(user.interestsJson);
    if (debuff) {
      updated[category] -= score;
    } else {
      updated[category] += score;
    }
    const updatedJson = JSON.stringify(updated);
    user.interestsJson = updatedJson;
    await this.userEntity.save(user);
    return true;
  }
}
