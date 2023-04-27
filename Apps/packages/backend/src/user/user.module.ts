import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: "zwf.20010928-3",
      signOptions: {
        expiresIn: "3600s",
      },
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
