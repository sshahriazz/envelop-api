<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

This api project is built for professionals using [Nest](https://github.com/nestjs/nest). This project is a boilerplate project which covers some stupid setup steps we do every time we create a new project.

## Features

- Built with nestjs & express
- Prisma ORM
- Postgres DB, You can hot swap with mongo or other's supported by prisma
- Security headers
- Cors
- Compression
- JWT token & refresh token based auth
- Role based authorization
- One dummy module
- nestjs configModule used for env
- husky, lint-staged setup
- Based on typescript
- eslint, prettier setup

## Installation

```bash
$ npm install
```

## DB Setup

First `cp .env.example .env` then,
Change below url according to your connection string in .env
`DATABASE_URL="postgresql://polash:polash@localhost:5432/envelop?schema=public"`

Learn More: [Prisma Postgres](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

## Running the app

```bash
# Preparation for initializing the database

$ npm run db:migrate
$ yarn db:migrate

$ npm run db:client
$ yarn db:client

# after changing schema run these both command simultaneously.

# this steps are mandatory
```

```bash
# development
$ npm run start
$ yarn start

# watch mode
$ npm run start:dev
$ yarn start:dev

# production mode
$ npm run start:prod
$ yarn start:prod
```

Visit: `http://localhost:3000/api` for swagger docs

## Stay in touch

- Author - [Sharieaz Kavier](https://github.com/sshahriazz)
  <!-- - Website - [https://nestjs.com](https://nestjs.com/) -->
  <!-- - Twitter - [@nestframework](https://twitter.com/nestframework) -->

## License

Nest is [MIT licensed](LICENSE).

## Issues

Please report any issues you face on Github issues, I will be glad to fix that.
