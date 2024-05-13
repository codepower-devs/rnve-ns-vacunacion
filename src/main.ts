import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NacosServer } from './config';

async function bootstrap() {
  await NacosServer();

  console.log('Nacos server: ', process.env.NACOS_SERVERADDR);
  console.log('Nacos namespace: ', process.env.NACOS_NAMESPACE);
  console.log('Nacos key: ', process.env.NACOS_IDENTITYKEY);
  console.log('Nacos secret: ', process.env.NACOS_IDENTITYVALUE);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Globals documentation')
    .setDescription('The globals API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document, {
    customSiteTitle: 'Global Documentation',
  });

  await app.listen(process.env.NS00_PORT || 3103);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
