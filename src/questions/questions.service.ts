import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    return await this.prismaService.question.create({
      data: { ...createQuestionDto, userId: userId },
    });
  }

  async findAll() {
    return await this.prismaService.question.findMany({
      include: {
        answers: true,
        user: { select: { name: true, email: true } },
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.question.findUnique({
      where: { id },
      include: {
        answers: true,
        user: { select: { name: true, email: true } },
      },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prismaService.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.question.delete({
      where: { id },
    });
  }
}
