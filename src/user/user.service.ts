import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  @Inject()
  private readonly prismaService: PrismaService;

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }
}
