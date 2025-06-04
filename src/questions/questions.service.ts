import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(createQuestionDto: CreateQuestionDto) {
    const userId = 1; // This should be replaced with the actual user ID from the request context
    return await this.prismaService.question.create({
      data: { ...createQuestionDto, userId },
    });
  }

  findAll() {
    return this.prismaService.question.findMany();
  }

  findOne(id: number) {
    return this.prismaService.question.findUnique({
      where: { id },
    });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
