import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginInput {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
