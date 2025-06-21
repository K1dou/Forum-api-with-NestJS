import { Body, Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';
import { connect } from 'http2';

@Injectable()
export class AnswerService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createAnswerDto: CreateAnswerDto, userId: number, questionId: string) {
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: { id: userId },
      },
      question: {
        connect: { id: questionId.toString() },
      },
    };
    return this.prisma.answer.create({ data: newAnswer });
  }

  findAll() {
    return this.prisma.answer.findMany();
  }

  findOne(id: string) {
    return this.prisma.answer.findUnique({ where: { id } });
  }

  update(id: string, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.answer.update({ where: { id }, data: updateAnswerDto });
  }

  remove(id: string) {
    return this.prisma.answer.delete({ where: { id: id } });
  }
}
