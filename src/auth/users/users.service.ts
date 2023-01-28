import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}
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
  async changePassword(changePassword: ChangePasswordInput) {
    const user = await this.prisma.user.findUnique({
      where: { id: changePassword.id },
    });
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword,
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: user.id },
    });
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
