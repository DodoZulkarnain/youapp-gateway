import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/Login.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/schema/user.schema';
import { UserToken } from 'src/schema/userToken.schema';
import { RefreshToken } from './dto/refreshToken.dto';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private configService: ConfigService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserToken.name) private userTokenModel: Model<UserToken>
        ){}

    async refresToken(refresh_token: RefreshToken){
        try{
            const { refreshToken } = refresh_token;
            const secretJWT = String(this.configService.get<string>('RefreshJWT'))
            const payload = await this.decodeToken(refreshToken, secretJWT);
            const ExpirdDate = new Date(payload.exp * 1000);
            const exDate = new Intl.DateTimeFormat(['id'], {timeZone:'Asia/Jakarta'}).format(ExpirdDate)
                        + ' ' + ExpirdDate.toLocaleTimeString();

            const token = await this.userTokenModel.findOne({expiredDate:exDate, is_status: true})
            if(!token){
                return {success:false,data: null, message: 'Token Not Available!'};
            }
            
            const user = await this.userModel.findById(payload._id);
            if(user){
                const ttl = Number(this.configService.get<number>('ExpiredRefreshToken'));
                const secreJWT = String(this.configService.get<string>('RefreshJWT'))
                const payload = {
                    _id : user._id
                }
                const access_token = await this.jwtService.signAsync(payload);
                const res = {
                    user : user.username,
                    access_token: access_token,
                    refresh_token: refreshToken
                }
                return {success:true,data: res, message: 'success Update Token!!'};
            }
            return {success:false,data: null, message: 'User Not Found!!'};
        }catch(error){
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
            const findUSer = await this.userModel.findOne({
                email : loginDto.email
            });
            if(findUSer){
                const isMatch = await bcrypt.compare(loginDto.password, findUSer.password);
                if(isMatch){
                    const ttl = Number(this.configService.get<number>('ExpiredRefreshToken'));
                    const secreJWT = String(this.configService.get<string>('RefreshJWT'))
                    const payload = {
                        _id : findUSer._id
                    }
                    const access_token = await this.jwtService.signAsync(payload);
                    const refresh_token = await this.jwtService.signAsync(payload,{
                        secret: secreJWT,
                        expiresIn: ttl
                    });

                    const expiredDate = new Date();
                    expiredDate.setSeconds(expiredDate.getSeconds() + ttl);
                    const exDate = new Intl.DateTimeFormat(['id'], {timeZone:'Asia/Jakarta'}).format(expiredDate)
                        + ' ' + expiredDate.toLocaleTimeString();

                    const newToken = await new this.userTokenModel(
                        {
                            is_status: true, 
                            expiredDate: exDate
                        }).save();
                    const update = await findUSer.updateOne({
                        $push: {
                            tokens: newToken._id,
                        },
                    });
                    
                    const res = {
                        user : findUSer.username,
                        access_token: access_token,
                        refresh_token: refresh_token
                    }
                    return {success:true,data: res, message: 'Success Get Token!!'};
                }
                return {success:false,data: null, message: 'User and pass not match!!'};
            }else{
                return {success:false,data: null, message: 'User Not Found!!!'};
            }
        } catch (error) {
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }
}
