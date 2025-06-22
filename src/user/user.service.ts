import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/userDTO';

@Injectable()
export class UserService {
  @Inject()
  private readonly prismaService: PrismaService;

  async createUser(data: Prisma.UserCreateInput) {
    const hashPassword = await bcrypt.hash(data.password, 10);

    return this.prismaService.user.create({
      data: { ...data, password: hashPassword },
    });
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDTO | null> {
    const user = await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) return null;
    return new UserDTO(user);
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserDTO> {
    const { where, data } = params;
    const user = this.prismaService.user.update({
      data,
      where,
    });
    return new UserDTO(await user);
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<string> {
    this.prismaService.user.delete({
      where,
    });
    return `User with ID ${where.id} deleted successfully`;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
