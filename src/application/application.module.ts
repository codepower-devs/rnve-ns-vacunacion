import { Module } from '@nestjs/common';
import { ParametroModule } from './parametro/parametro.module';
import { VacunacionModule } from './vacunacion/vacunacion.module';

@Module({
  imports: [ParametroModule, VacunacionModule],
})
export class ApplicationModule {}
