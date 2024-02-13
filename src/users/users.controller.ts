import { Body, Controller, Get, Post, Request, UsePipes, ValidationPipe, UseGuards, Req, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDTO } from './dto/createUsers.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { updateProfileDto } from './dto/updateProfile.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private UserServices: UsersService){}

    @Get()
    async getUser(@Req() request:Request){
        console.log(request['user']._id);
        return await this.UserServices.findUser();
    }

    @Get('/profile')
    async find(@Req() request:Request) {
        const id = request['user']._id
        return await this.UserServices.findUserById(id);
    }

    @Patch('/profile')
    @UsePipes(new ValidationPipe)
    async updateId(@Body() updateProfileDto: updateProfileDto, @Req() request:Request){
        const id = request['user']._id;        
        return await this.UserServices.updateProfile(id, updateProfileDto);
    }

    @Post()
    @UsePipes(new ValidationPipe)
    async createUser(@Body() createUserDTO: createUserDTO){
        return await this.UserServices.createUser(createUserDTO);
    }

}
