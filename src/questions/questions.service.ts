import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prismaService: PrismaService;

  @UseGuards(AuthGuard)
  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    return await this.prismaService.question.create({
      data: { ...createQuestionDto, userId },
    });
  }

  @UseGuards(AuthGuard)
  async findAll() {
    return await this.prismaService.question.findMany();
  }

  @UseGuards(AuthGuard)
  async findOne(id: number) {
    return await this.prismaService.question.findUnique({
      where: { id },
    });
  }

  @UseGuards(AuthGuard)
  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const userId = 1;
    return await this.prismaService.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  @UseGuards(AuthGuard)
  async remove(id: number) {
    return await this.prismaService.question.delete({
      where: { id },
    });
  }
}
