import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, CreateUserProfileDto, UpdateUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get(':id')
  getUserById(@Param() params) {
    return this.userService.findUserById(params.id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param() params) {
    return this.userService.deleteUserById(params.id);
  }

  @Patch(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updatedUserData: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updatedUserData);
  }

  @Post(':id/profiles')
  createUserProfiles(
    @Body() createProfileDto: CreateUserProfileDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.createUserProfile(id, createProfileDto);
  }
}
