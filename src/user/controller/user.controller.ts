import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { IUser, UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(@Body() user: UserDTO) {
    return { message: 'User added successfully', user };
  }

  @Get()
  getUsers(@Query('name') name: string): IUser[] {
    return this.userService.findUsersByName(name);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): IUser | undefined {
    return this.userService.findUserById(id);
  }
}
