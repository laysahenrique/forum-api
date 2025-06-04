import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(
    createAnswerDto: CreateAnswerDto,
    userId: number,
    questionId: number,
  ) {
    return await this.prismaService.answer.create({
      data: { ...createAnswerDto, userId, questionId },
    });
  }

  async findAll() {
    return await this.prismaService.answer.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.answer.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return await this.prismaService.answer.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.answer.delete({
      where: { id },
    });
  }
}
