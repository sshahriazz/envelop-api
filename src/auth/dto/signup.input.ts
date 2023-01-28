import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupInput {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @ApiProperty()
  firstname?: string;

  @IsString()
  @ApiProperty()
  lastname?: string;
}
