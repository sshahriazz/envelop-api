import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    return this.prisma.article.create({
      data: createArticleDto,
    });
  }

  async findAll(): Promise<ArticleEntity[]> {
    return await this.prisma.article.findMany({ where: { published: true } });
  }
  async findDrafts(): Promise<ArticleEntity[]> {
    return await this.prisma.article.findMany({ where: { published: false } });
  }

  async findOne(id: string): Promise<ArticleEntity> {
    return await this.prisma.article.findUnique({ where: { id: id } });
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return await this.prisma.article.update({
      where: { id: id },
      data: updateArticleDto,
    });
  }

  async remove(id: string): Promise<ArticleEntity> {
    return await this.prisma.article.delete({ where: { id: id } });
  }
}
