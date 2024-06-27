import { BaseService } from '@/common/base';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrearEsquemaDto } from '../dto/crear-esquema.dto';
import { ActualizarEsquemaDto } from '../dto/actualizar-esquema.dto';
import { Messages } from '@/common/constants/response-messages';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { EsquemaRepository } from '../repository/esquema.repository';

@Injectable()
export class EsquemaService extends BaseService {
  constructor(
    @Inject(EsquemaRepository)
    private esquemaRepository: EsquemaRepository,
  ) {
    super();
  }

  async listar() {
    return await this.esquemaRepository.listar();
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    return await this.esquemaRepository.listarTodos(paginacionQueryDto);
  }

  async crear(esquemaDto: CrearEsquemaDto) {
    return await this.esquemaRepository.crear(esquemaDto);
  }

  async actualizar(id: string, esquemaDto: ActualizarEsquemaDto) {
    const esquema = await this.esquemaRepository.buscarPorId(id);
    if (!esquema) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }
    try {
      //console.log(esquemaDto);
      await this.esquemaRepository.actualizar(id, esquemaDto);
      return { id };
    } catch (error) {
      console.error('Error al actualizar esquema:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }

  async activar(idEsquema: string) {
    const esquema = await this.esquemaRepository.buscarPorId(idEsquema);
    if (!esquema) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }

    try {
      const esquemaDto = new ActualizarEsquemaDto();
      esquemaDto.estadoId = 1;
      esquemaDto.vacunaId = esquema.vacuna.id;
      esquemaDto.programavacunacionId = esquema.programavacunacion.id;
      //console.log(esquemaDto);
      await this.esquemaRepository.actualizar(idEsquema, esquemaDto);
      return { id: idEsquema, estado_id: 1 };
    } catch (error) {
      console.error('Error al activar esquema:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }

  async inactivar(idEsquema: string) {
    const esquema = await this.esquemaRepository.buscarPorId(idEsquema);
    if (!esquema) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }

    try {
      const esquemaDto = new ActualizarEsquemaDto();
      esquemaDto.estadoId = 2;
      esquemaDto.vacunaId = esquema.vacuna.id;
      esquemaDto.programavacunacionId = esquema.programavacunacion.id;
      //console.log(esquemaDto);
      await this.esquemaRepository.actualizar(idEsquema, esquemaDto);
      return { id: idEsquema, estado_id: 2 };
    } catch (error) {
      console.error('Error al inactivar esquema:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }
}
