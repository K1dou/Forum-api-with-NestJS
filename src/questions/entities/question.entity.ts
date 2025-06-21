import { Question as PrismaQuestion } from '@prisma/client';

export class Question implements PrismaQuestion {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
