import { Answer as PrismaAnswer } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';

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
