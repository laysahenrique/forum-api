import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [PrismaService],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
