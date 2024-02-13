import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { RefreshToken } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,){}

    @Post('/refresh-token')
    @UsePipes(new ValidationPipe)
    async updateToken(@Body() refreshToken:RefreshToken){
        return await this.authService.refresToken(refreshToken);
    }

    @Post('login')
    @UsePipes(new ValidationPipe)
    async Login(@Body() LoginDto: LoginDto){
        return await this.authService.login(LoginDto);
    }
}
