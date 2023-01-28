import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: createArticleDto,
    });
  }

  findAll() {
    return this.prisma.article.findMany({ where: { published: true } });
  }
  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  findOne(id: string) {
    return this.prisma.article.findUnique({ where: { id: id } });
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id: id },
      data: updateArticleDto,
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({ where: { id: id } });
  }
}
