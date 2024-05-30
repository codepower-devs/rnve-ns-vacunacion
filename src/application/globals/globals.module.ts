import { Module } from '@nestjs/common';
import { GlobalsController } from '@/application/globals/controller/globals.controller';
import { GlobalsService } from '@/application/globals/service/globals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalsRepository } from '@/application/globals/repository/globals.repository';
import { Globals } from '@/application/globals/entity';

@Module({
  controllers: [GlobalsController],
  providers: [GlobalsService, GlobalsRepository],
  imports: [TypeOrmModule.forFeature([Globals])],
})
export class GlobalsModule {}
