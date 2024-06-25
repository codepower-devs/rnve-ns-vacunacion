import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import packageJson from '../package.json';

import { CoreModule } from './core/core.module';
import { LoggerModule } from './core/logger';
import { AppController } from './app.controller';
import { ApplicationModule } from './application/application.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors';
import { LoggerMiddleware } from './common/middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`], // .env.development , .env.production , .env.quality
    }),
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({
      console: process.env.LOG_CONSOLE,
      appName: packageJson.name,
      level: process.env.LOG_LEVEL,
      fileParams: process.env.LOG_PATH
        ? {
            path: process.env.LOG_PATH,
            size: process.env.LOG_SIZE,
            rotateInterval: process.env.LOG_INTERVAL,
          }
        : undefined,
      lokiParams: process.env.LOG_LOKI_URL
        ? {
            url: process.env.LOG_LOKI_URL,
            username: process.env.LOG_LOKI_USERNAME,
            password: process.env.LOG_LOKI_PASSWORD,
            batching: process.env.LOG_LOKI_BATCHING,
            batchInterval: process.env.LOG_LOKI_BATCH_INTERVAL,
          }
        : undefined,
      auditParams: {
        context: process.env.LOG_AUDIT,
      },
    }),
    CoreModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
