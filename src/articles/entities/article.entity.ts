import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ArticleEntity implements Article {
  @ApiProperty()
  id: string;
  @ApiProperty()
  authorId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  body: string;
  @ApiProperty()
  published: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  @Exclude()
  cover: string;
}
