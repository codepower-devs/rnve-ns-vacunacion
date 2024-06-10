import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { printInfo, printLogo } from './core/logger';

import packageJson from '../package.json';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: Number(process.env.PORT || 3000),
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();

  printLogo();
  printInfo({
    env: String(process.env.NODE_ENV),
    name: packageJson.name,
    port: process.env.PORT || '3000',
    version: packageJson.version,
    typeService: 'microservice',
  });
}

bootstrap();
