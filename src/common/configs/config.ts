import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs API',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  session: {
    resave: false,
    saveUninitialized: false,
    secret: 'my-secret',
  },
  security: {
    expiresIn: '200m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
