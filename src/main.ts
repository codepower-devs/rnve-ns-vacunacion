import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { printInfo, printLogo } from './core/logger';

import packageJson from '../package.json';

//import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  /* const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: Number(process.env.PORT || 3000),
      },
    },
  ); */

  //Restfull api
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  const options = new DocumentBuilder()
    .setTitle('Vacunacion')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT || 3000);

  printLogo();
  printInfo({
    env: String(process.env.NODE_ENV),
    name: packageJson.name,
    port: process.env.PORT || '3000',
    version: packageJson.version,
    typeService: 'rest',
  });
}

bootstrap();
