import { Body, Controller, Get, Post, Request, UsePipes, ValidationPipe, UseGuards, Req, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDTO } from './dto/createUsers.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { updateProfileDto } from './dto/updateProfile.dto';

@Controller('users')
export class UsersController {
    constructor(private UserServices: UsersService){}

    @Get()
    @UseGuards(AuthGuard)
    async getUser(){
        return await this.UserServices.findUser();
    }

    @Get('/profile')
    @UseGuards(AuthGuard)
    async find(@Req() request:Request) {
        const id =request['user']._id;
        return await this.UserServices.findUserById(id);
    }

    @Patch('/profile')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe)
    async updateId(@Body() updateProfileDto: updateProfileDto, @Req() request:Request){
        const id = '65ccdc01e4ff177f5ec4874f';
        return await this.UserServices.updateProfile(id, updateProfileDto);
    }

    @Post()
    @UsePipes(new ValidationPipe)
    async createUser(@Body() createUserDTO: createUserDTO){
        const user = await this.UserServices.createUser(createUserDTO);
        return user;
    }

}
