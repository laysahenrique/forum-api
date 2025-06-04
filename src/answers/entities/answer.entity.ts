import { Answer as PrismaAnswer, Question, User } from '@prisma/client';
// Update the import path below to match the actual location and filename of your Questions entity

export class Answer implements PrismaAnswer {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  questionId: number;
  user: User;
  question: Question;
}
