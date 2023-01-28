import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }
  // async changePassword(
  //   userId: string,
  //   userPassword: string,
  //   changePassword: ChangePasswordInput,
  // ) {
  //   const passwordValid = await this.passwordService.validatePassword(
  //     changePassword.oldPassword,
  //     userPassword,
  //   );

  //   if (!passwordValid) {
  //     throw new BadRequestException('Invalid password');
  //   }

  //   const hashedPassword = await this.passwordService.hashPassword(
  //     changePassword.newPassword,
  //   );

  //   return this.prisma.user.update({
  //     data: {
  //       password: hashedPassword,
  //     },
  //     where: { id: userId },
  //   });
  // }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
