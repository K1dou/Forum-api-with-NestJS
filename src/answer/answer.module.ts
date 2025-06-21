import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [DatabaseModule],
})
export class AnswerModule {}
