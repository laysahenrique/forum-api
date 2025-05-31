import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, User as UserModel } from 'generated/prisma';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
