import { Answer as AnswerPrisma } from '@prisma/client';

export class Answer implements AnswerPrisma {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  questionId: string;
  userId: number;
}
