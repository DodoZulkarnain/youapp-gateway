import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { LoginDto } from './dto/Login.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from './dto/refreshToken.dto'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private configService: ConfigService,
        @Inject('AUTH') private readonly authServices:ClientProxy
        ){}

    async refresToken(refresh_token: RefreshToken){
        try{
            const refreshToken = await this.authServices.send({cmd:'refreshToken'}, refresh_token).toPromise();
            return refreshToken;
        } catch(error){
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }

    async decodeToken(token: string, secreJWT: string){
        try{
            return await this.jwtService.verifyAsync(token, {
                secret: secreJWT
            });
        }catch(e){
            if(e instanceof TokenExpiredError){
                throw new UnauthorizedException('Token Expired!!');
            }else{
                throw new InternalServerErrorException('Failed Extract!');
            }
        }
    }

    async login(loginDto: LoginDto){
        try{
            const login = await this.authServices.send({cmd:'login'}, loginDto).toPromise();
            return login;
        } catch(error){
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }
}
