import { Controller, Get, Req, Session, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { RoleGuard } from './auth/role/role.guard';
import { Roles } from './auth/roles/roles.decorator';
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  getHello(@Session() session: Record<string, any>): string {
    session.visits = session.visits ? session.visits + 1 : 1;
    return this.appService.getHello();
  }
}
