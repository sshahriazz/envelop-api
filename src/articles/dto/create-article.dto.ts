import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  @IsOptional()
  cover: any;
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true' || value === true || value === 1 || value === '1';
  })
  @IsBoolean()
  @ApiProperty({ required: false, type: Boolean, default: false })
  published?: boolean = false;
}
