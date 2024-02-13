import { Injectable, InternalServerErrorException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { createUserDTO } from './dto/createUsers.dto'; 
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/schema/profile.schema';
import { Interest } from 'src/schema/interest.schema';
import { updateProfileDto } from './dto/updateProfile.dto';
import {Types} from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
        @InjectModel(Interest.name) private interestModel: Model<Interest>
        ) {}

    async findUser(){
        try{
            const findAllUser = await this.userModel.find().populate(['profile']).exec();
            return {success:true,data: findAllUser, message: 'Success Get User!'};
        } catch(error){
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }

    async findUserById(Id: string){
        try{
            const UserId = await this.profileModel.findOne({user:Id}).populate(['user','interest']).exec();
            return {success:true,data: UserId, message: 'Success Get User!'};
        } catch(error){
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }

    async updateProfile(id: string,updateProfileDto: updateProfileDto){
        try{
            let updateProfile = await this.profileModel.findOne({user:id});
            if(updateProfileDto.avatar){

            }
            await updateProfile.updateOne(updateProfileDto).exec();
            
            if(updateProfileDto.Interest){
                await updateProfile.updateOne({
                    $unset: {
                        interest : null
                    }
                });

                for (const queryValue of Object.values(updateProfileDto.Interest)) {
                    for (const queryKey of Object.values(queryValue)) {
                        const id = String(queryKey);
                        const idx = new Types.ObjectId(id);
                        await updateProfile.updateOne({
                            $push: {
                                interest: idx,
                            },
                        });
                    }
                }
            }
            const profile = await this.profileModel.findOne({user:id}).populate(['user','interest']).exec();
            return {success:true,data: profile, message: 'Success Update Profile!'};
        } catch(error){
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }

    async createUser(createUserDTO: createUserDTO){
        try{
            const salt = await bcrypt.genSalt();
            createUserDTO.password = await bcrypt.hash(createUserDTO.password, salt);
            const NewUser = await new this.userModel(createUserDTO).save();
            const NewProfile = await new this.profileModel(createUserDTO).save();
            await NewUser.updateOne({
                profile: NewProfile._id
            });
            await NewProfile.updateOne({
                user: NewUser._id
            });
            return {success:true,data: NewUser, message: 'Success Submit User!'};
        } catch (error) {
            return {success:false,data: null, message: new InternalServerErrorException(error.message)};
        }
    }
}