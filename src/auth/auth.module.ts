import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from  'src/schema/user.schema';
import { UserToken, userTokenSchema } from  'src/schema/userToken.schema';

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      JwtModule.register({
        secret: process.env.SecretJWT,
        signOptions: {
            expiresIn: Number(process.env.ExpiredJWT)
        },
      }),
      MongooseModule.forFeature([
        {
          name : User.name,
          schema: userSchema
        },
        {
          name: UserToken.name,
          schema: userTokenSchema
        }
      ]),
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

