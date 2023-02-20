import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  UpdateUserParams,
  UserProfileParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  //fetch user
  async fetchUsers() {
    const allUsers = await this.userRespository.find();
    return allUsers;
  }

  //create user
  async createUser(userDetails: CreateUserParams) {
    const newUser = this.userRespository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    try {
      await this.userRespository.save(newUser);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully.',
      };
    } catch (err) {
      return {
        statusCode: HttpStatus.CREATED,
        message: `User with ${newUser.username} has already been created.`,
      };
    }
  }

  //find user by Id
  async findUserById(id: number) {
    let users = await this.userRespository.find({
      where: {
        id,
      },
    });

    if (users.length === 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'No users found!',
        data: [],
      };
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'Users fetched successfully.',
        data: users,
      };
    }
  }

  //delete users by Id
  async deleteUserById(id: number) {
    try {
      await this.userRespository.delete({ id });
      return {
        statusCode: HttpStatus.OK,
        message: 'Users deleted successfully.',
      };
    } catch {
      return {
        statusCode: HttpStatus.OK,
        message: 'Users not found for that id.',
      };
    }
  }

  //update user
  async updateUserById(id: number, userDetail: UpdateUserParams) {
    try {
      await this.userRespository.update(
        { id },
        {
          username: userDetail.username,
        },
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully.',
      };
    } catch {
      return {
        statusCode: HttpStatus.OK,
        message: 'User not found for that id.',
      };
    }
  }

  //create user profile
  async createUserProfile(id: number, profileDetail: UserProfileParams) {
    const user = await this.userRespository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'Cannot create profile. User not found!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProfile = this.profileRepository.create(profileDetail);
    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;
    return this.userRespository.save(user);
  }
}
