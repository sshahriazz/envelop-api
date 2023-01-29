import { Article, Role } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class User {
  @IsEmail()
  email: string;

  firstname?: string;

  lastname?: string;

  role: Role;

  article?: [Article] | null;

  password: string;
}
