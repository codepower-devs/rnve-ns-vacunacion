import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GrupoetareoController } from './controller/grupo-etareo.controller';
import { GrupoetareoService } from './service/grupo-etareo.service';
import { GrupoetareoRepository } from './repository/grupo-etareo.repository';

import { VacunaController } from './controller/vacuna.controller';
import { VacunaService } from './service/vacuna.service';
import { VacunaRepository } from './repository/vacuna.repository';

import { EsquemaController } from './controller/esquema.controller';
import { EsquemaService } from './service/esquema.service';
import { EsquemaRepository } from './repository/esquema.repository';

import { grupoEtareo } from './entity/grupo_etareo.entity';
import { Vacuna } from './entity/vacuna.entity';
import { Esquema } from './entity/esquema.entity';
import { programaVacunacion } from './entity/programa_vacunacion.entity';
import { programavacunacionDepartamento } from './entity/programavacunacion_departamento.entity';
import { ProgramaVacunacionController } from './controller/programa-vacunacion.controller';
import { ProgramaVacunacionService } from './service/programa-vacunacion.service';
import { ProgramavacunacionRepository } from './repository/programa-vacunacion.repository';

@Module({
  controllers: [
    GrupoetareoController,
    VacunaController,
    EsquemaController,
    ProgramaVacunacionController,
  ],
  providers: [
    GrupoetareoService,
    GrupoetareoRepository,
    VacunaService,
    VacunaRepository,
    EsquemaService,
    EsquemaRepository,
    ProgramaVacunacionService,
    ProgramavacunacionRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      grupoEtareo,
      Vacuna,
      Esquema,
      programaVacunacion,
      programavacunacionDepartamento,
    ]),
  ],
})
export class VacunacionModule {}
