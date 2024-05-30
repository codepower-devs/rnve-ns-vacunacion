import { Module } from '@nestjs/common';
import { ParametroModule } from './parametro/parametro.module';
import { GlobalsModule } from './globals/globals.module';

@Module({
  imports: [ParametroModule, GlobalsModule],
})
export class ApplicationModule {}
