import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GrupoetareoController } from './controller/grupo-etareo.controller';
import { GrupoetareoService } from './service/grupo-etareo.service';
import { GrupoetareoRepository } from './repository/grupo-etareo.repository';

import { grupoEtareo } from './entity/grupo_etareo.entity';

@Module({
  controllers: [GrupoetareoController],
  providers: [GrupoetareoService, GrupoetareoRepository],
  imports: [TypeOrmModule.forFeature([grupoEtareo])],
})
export class VacunacionModule {}
