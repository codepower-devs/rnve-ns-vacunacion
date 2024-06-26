import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { printInfo, printLogo } from './core/logger';

import packageJson from '../package.json';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER || 'nats://localhost:4222'],
      },
    },
  );

  //Restfull api
  // const app = await NestFactory.create(AppModule, {
  //   logger: ['error', 'warn'],
  // });

  // app.enableCors({
  //   origin: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });

  // const options = new DocumentBuilder()
  //   .setTitle('Vacunacion')
  //   .setDescription('')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();

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
