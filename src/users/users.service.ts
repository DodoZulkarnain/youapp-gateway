import { Injectable, InternalServerErrorException, Inject } from '@nestjs/common';
import { createUserDTO } from './dto/createUsers.dto'; 
import { updateProfileDto } from './dto/updateProfile.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
    constructor(
        @Inject('PROFILE') private readonly profileUser:ClientProxy
        ) {}

    async findUser(){
        try{
            const findAllUser = await this.profileUser.send({cmd:'userAll'}, {}).toPromise();
            return findAllUser;
        } catch(error){
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }

    async findUserById(Id: string){
        try{
            const UserId = await this.profileUser.send({cmd:'userById'}, {}).toPromise();
            return UserId;
        } catch(error){
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }

    async updateProfile(id: string, updateProfileDto: updateProfileDto){
        try{
            const updateUser = await  this.profileUser.send({cmd:'userUpdate'}, {id,updateProfileDto}).toPromise();
            return updateUser;
        } catch(error){
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }

    async createUser(createUserDTO: createUserDTO){
        try{
            const user = await this.profileUser.send('register',createUserDTO);
            return user;
        } catch (error) {
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }
}