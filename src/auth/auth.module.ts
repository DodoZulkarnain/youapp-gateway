import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
      ClientsModule.register([
        {
          name: 'AUTH',
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3002,
          },
        }
    ]),
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

