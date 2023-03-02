import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }

  async create(params: CreateArticleDto) {
    return await this.prisma.article.create({ data: params });
  }

  async findAll() {
    return await this.prisma.article.findMany({ where: { published: true } });
  }

  async findDrafts() {
    return await this.prisma.article.findMany({ where: { published: false } });
  }

  async findOne(id: number) {
    return await this.prisma.article.findUnique({ where: { id } });
  }

  async update(id: number, params: UpdateArticleDto) {
    const { title, description, body, published } = params;
    return await this.prisma.article.update({
      where: { id },
      data: {
        title,
        description,
        body,
        published
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.article.delete({ where: { id } });
  }
}
