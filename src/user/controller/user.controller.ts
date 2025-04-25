import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { IUser, UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(@Body() user: UserDTO) {
    return this.userService.createUser(user);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get()
  getUsers(@Query('name') name: string): Promise<IUser[]> {
    return this.userService.findUsersByName(name);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): IUser | undefined {
    return this.userService.findUserById(id);
  }
}
