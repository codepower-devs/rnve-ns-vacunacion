import { Module } from '@nestjs/common';
import { GlobalsModule } from './globals/globals.module';

@Module({
  imports: [GlobalsModule]
})
export class ModulesModule {}
