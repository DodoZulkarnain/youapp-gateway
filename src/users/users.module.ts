import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { Profile, profileSchema } from 'src/schema/profile.schema';
import { Interest, interestSchema } from 'src/schema/interest.schema';

@Module({
        imports: [MongooseModule.forFeature([
            {
                name: User.name,
                schema: userSchema
            },
            {
                name: Profile.name,
                schema: profileSchema
            },
            {
                name: Interest.name,
                schema: interestSchema
            }
        ]),
        JwtModule.register({
            secret: process.env.SecretJWT,
            signOptions: {
                expiresIn: Number(process.env.ExpiredJWT)
            },
          }),
        ],
        controllers: [UsersController],
        providers: [
            UsersService, AuthGuard
        ],
        //exports: [UsersService],
})
export class UsersModule {}
