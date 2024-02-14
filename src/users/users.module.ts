import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
        imports: [
        JwtModule.register({
            secret: process.env.SecretJWT,
            signOptions: {
                expiresIn: Number(process.env.ExpiredJWT)
            },
        }),
        ClientsModule.register([
            {
              name: 'PROFILE',
              transport: Transport.TCP,
              options: {
                host: 'localhost',
                port: 3001,
              },
            }
        ]),
        ],
        controllers: [UsersController],
        providers: [
            UsersService,
            //AuthGuard
        ],
})
export class UsersModule {}
