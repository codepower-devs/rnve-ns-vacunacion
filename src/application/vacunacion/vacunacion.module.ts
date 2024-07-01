import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GrupoetareoController } from './controller/grupo-etareo.controller';
import { GrupoetareoService } from './service/grupo-etareo.service';
import { GrupoetareoRepository } from './repository/grupo-etareo.repository';
import { grupoEtareo } from './entity/grupo_etareo.entity';

import { VacunaController } from './controller/vacuna.controller';
import { VacunaService } from './service/vacuna.service';
import { VacunaRepository } from './repository/vacuna.repository';
import { Vacuna } from './entity/vacuna.entity';

import { EsquemaController } from './controller/esquema.controller';
import { EsquemaService } from './service/esquema.service';
import { EsquemaRepository } from './repository/esquema.repository';
import { Esquema } from './entity/esquema.entity';

import { ProgramaVacunacionController } from './controller/programa-vacunacion.controller';
import { ProgramaVacunacionService } from './service/programa-vacunacion.service';
import { ProgramavacunacionRepository } from './repository/programa-vacunacion.repository';
import { programaVacunacion } from './entity/programa_vacunacion.entity';

import { programavacunacionDepartamento } from './entity/programavacunacion_departamento.entity';

import { EstablecimientoGestion } from '../estructura/entity/establecimiento_gestion.entity';

import { PoblacionobjetivoController } from './controller/poblacion-objetivo.controller';
import { PoblacionobjetivoService } from './service/poblacion-objetivo.service';
import { PoblacionobjetivoRepository } from './repository/poblacion-objetivo.repository';
import { poblacionObjetivo } from './entity/poblacion_objetivo.entity';
import { EstablecimientoGestionRepository } from '../estructura/repository/establecimiento_gestion.repository';
import { ErrorHandlingService } from '@/common/utils/error_handle.service';

@Module({
  controllers: [
    GrupoetareoController,
    VacunaController,
    EsquemaController,
    ProgramaVacunacionController,
    PoblacionobjetivoController,
  ],
  providers: [
    ErrorHandlingService,
    GrupoetareoService,
    GrupoetareoRepository,
    VacunaService,
    VacunaRepository,
    EsquemaService,
    EsquemaRepository,
    ProgramaVacunacionService,
    ProgramavacunacionRepository,
    EstablecimientoGestionRepository,
    PoblacionobjetivoService,
    PoblacionobjetivoRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      grupoEtareo,
      Vacuna,
      Esquema,
      programaVacunacion,
      programavacunacionDepartamento,
      EstablecimientoGestion,
      poblacionObjetivo,
    ]),
  ],
})
export class VacunacionModule {}
