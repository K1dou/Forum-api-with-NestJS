import { PrismaService } from './../database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    return await this.prisma.question.create({
      data: { ...createQuestionDto, userId },
    });
  }

  async findAll() {
    return await this.prisma.question.findMany({
      include: {
        answers: true,
        user: {
          select: { name: true, email: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.question.findUnique({
      where: { id },
      include: {
        answers: true,
        user: {
          select: { name: true, email: true },
        },
      },
    });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  remove(id: string) {
    this.prisma.question.delete({
      where: { id },
    });
    return { message: 'Question deleted successfully' };
  }
}
