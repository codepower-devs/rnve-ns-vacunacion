import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Global } from './entities/global.entity';
import { GlobalsService } from './globals.service';
import { GlobalsController } from './globals.controller';

@Module({
  imports: [
    // Add the TypeOrmModule.forFeature() method to the imports array.
    TypeOrmModule.forFeature([Global]),
  ],
  controllers: [GlobalsController],
  providers: [GlobalsService],
})
export class GlobalsModule {}
