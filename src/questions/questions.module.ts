import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [PrismaService],
})
export class QuestionsModule {}
