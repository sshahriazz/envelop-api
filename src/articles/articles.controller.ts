import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@ApiBearerAuth()
@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({
    type: ArticleEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('cover'))
  create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 650000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    cover: Express.Multer.File,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articlesService.create(createArticleDto);
  }
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  @ApiCreatedResponse({
    type: ArticleEntity,
    isArray: true,
  })
  async findAll(): Promise<ArticleEntity[]> {
    return await this.articlesService.findAll();
  }
  @Get('drafts')
  @ApiCreatedResponse({
    type: ArticleEntity,
    isArray: true,
  })
  async findDrafts(): Promise<ArticleEntity[]> {
    return await this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: ArticleEntity,
  })
  async findOne(@Param('id') id: string): Promise<ArticleEntity> {
    return await this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    type: ArticleEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return await this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    type: ArticleEntity,
  })
  async remove(@Param('id') id: string): Promise<ArticleEntity> {
    return await this.articlesService.remove(id);
  }
}
