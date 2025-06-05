import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  @Inject()
  private readonly prismaService: PrismaService;

  async createUser(data: Prisma.UserCreateInput) {
    const hash = await bcrypt.hash(data.password, 10);
    return this.prismaService.user.create({
      data: { ...data, password: hash },
    });
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }
}
