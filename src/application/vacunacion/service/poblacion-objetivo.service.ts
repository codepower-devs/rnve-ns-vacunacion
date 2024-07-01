import { BaseService } from '@/common/base';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Messages } from '@/common/constants/response-messages';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';

import { PoblacionobjetivoRepository } from '../repository/poblacion-objetivo.repository';
import { CrearPoblacionObjetivoDto } from '../dto/crear-poblacionobjetivo.dto';
import { EstablecimientoGestionRepository } from '@/application/estructura/repository/establecimiento_gestion.repository';
import { ErrorHandlingService } from '@/common/utils/error_handle.service';
import { ActualizarPoblacionObjetivoDto } from '../dto/actualizar-poblacionobjetivo.dto';

@Injectable()
export class PoblacionobjetivoService extends BaseService {
  constructor(
    @Inject(PoblacionobjetivoRepository)
    private poblacionobjetivoRepository: PoblacionobjetivoRepository,
    @Inject(EstablecimientoGestionRepository)
    private establecimientoGestionRepository: EstablecimientoGestionRepository,
    private readonly errorHandlingService: ErrorHandlingService,
  ) {
    super();
  }

  async listar() {
    return await this.poblacionobjetivoRepository.listar();
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    return await this.poblacionobjetivoRepository.listarTodos(
      paginacionQueryDto,
    );
  }

  async crear(poblacionObjetivoDto: CrearPoblacionObjetivoDto) {
    try {
      const establecimiento =
        await this.establecimientoGestionRepository.buscarPorId(
          poblacionObjetivoDto.establecimientoGestionId,
        );
      if (!establecimiento) {
        throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
      }

      return await this.poblacionobjetivoRepository.crear(poblacionObjetivoDto);
    } catch (error) {
      return this.errorHandlingService.handlerErrors(
        error,
        'create_poblacion_objetivo',
      );
    }
  }

  async actualizar(
    id: string,
    poblacionObjetivoDto: ActualizarPoblacionObjetivoDto,
  ) {
    const poblacionobjetivo =
      await this.poblacionobjetivoRepository.buscarPorId(id);
    if (!poblacionobjetivo) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }
    try {
      //console.log(poblacionobjetivo);
      await this.poblacionobjetivoRepository.actualizar(
        id,
        poblacionObjetivoDto,
      );
      return { id };
    } catch (error) {
      console.error('Error al actualizar Poblacion Objetivo:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }

  async activar(idPoblacionObjetivo: string) {
    const poblacionobjetivo =
      await this.poblacionobjetivoRepository.buscarPorId(idPoblacionObjetivo);
    if (!poblacionobjetivo) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }
    try {
      const PoblacionObjetivoDto = new ActualizarPoblacionObjetivoDto();
      PoblacionObjetivoDto.estadoId = 1;
      PoblacionObjetivoDto.establecimientoGestionId =
        poblacionobjetivo.establecimientoGestion.id;
      PoblacionObjetivoDto.grupoEtareoId = poblacionobjetivo.grupoEtareo.id;
      //console.log(PoblacionObjetivoDto);
      await this.poblacionobjetivoRepository.actualizar(
        idPoblacionObjetivo,
        PoblacionObjetivoDto,
      );
      return { id: idPoblacionObjetivo, estado_id: 1 };
    } catch (error) {
      console.error('Error al activar Poblacion Objetivo:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }

  async inactivar(idPoblacionObjetivo: string) {
    const poblacionobjetivo =
      await this.poblacionobjetivoRepository.buscarPorId(idPoblacionObjetivo);
    if (!poblacionobjetivo) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }
    try {
      const PoblacionObjetivoDto = new ActualizarPoblacionObjetivoDto();
      PoblacionObjetivoDto.estadoId = 2;
      PoblacionObjetivoDto.establecimientoGestionId =
        poblacionobjetivo.establecimientoGestion.id;
      PoblacionObjetivoDto.grupoEtareoId = poblacionobjetivo.grupoEtareo.id;
      //console.log(PoblacionObjetivoDto);
      await this.poblacionobjetivoRepository.actualizar(
        idPoblacionObjetivo,
        PoblacionObjetivoDto,
      );
      return { id: idPoblacionObjetivo, estado_id: 2 };
    } catch (error) {
      console.error('Error al inactivar Poblacion Objetivo:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }
}
