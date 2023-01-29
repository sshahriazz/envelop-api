import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import {
  NestConfig,
  CorsConfig,
  SwaggerConfig,
  SessionConfig,
} from './common/configs/config.interface';
import helmet from 'helmet';
import * as compression from 'compression';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const sessionConfig = configService.get<SessionConfig>('session');
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  if (corsConfig.enabled) {
    app.enableCors();
  }
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.use(compression());
  app.use(
    session({
      secret: sessionConfig.secret,
      resave: sessionConfig.resave,
      saveUninitialized: sessionConfig.saveUninitialized,
    }),
  );

  if (swaggerConfig.enabled) {
    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()

      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerConfig.path, app, document);
  }

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
  );

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(process.env.PORT || nestConfig.port || 8080);
}
bootstrap();
