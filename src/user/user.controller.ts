import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};

type UpdateUserDto = {
  name?: string;
  email?: string;
  password?: string;
};

type UserWithoutPassword = {
  id: number;
  name: string;
  email: string;
};

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() data: CreateUserDto): Promise<UserWithoutPassword> {
    return this.userService.createUser(data);
  }

  @Get()
  async findAll(): Promise<UserWithoutPassword[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(+id);
  }

  @Patch('update:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(+id, data);
  }

  @Delete('delete:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(+id);
  }
}
