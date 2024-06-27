import { BaseService } from '@/common/base';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Messages } from '@/common/constants/response-messages';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ProgramavacunacionRepository } from '../repository/programa-vacunacion.repository';
import { CrearProgramaVacunacionDto } from '../dto/crear-programavacunacion.dto';
import { ActualizarProgramaVacunacionDto } from '../dto/actualizar-programavacunacion.dto';

@Injectable()
export class ProgramaVacunacionService extends BaseService {
  constructor(
    @Inject(ProgramavacunacionRepository)
    private programaVacunacionRepository: ProgramavacunacionRepository,
  ) {
    super();
  }

  async listar() {
    return await this.programaVacunacionRepository.listar();
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    return await this.programaVacunacionRepository.listarTodos(
      paginacionQueryDto,
    );
  }

  async crear(programaVacunacionDto: CrearProgramaVacunacionDto) {
    return await this.programaVacunacionRepository.crear(programaVacunacionDto);
  }

  async actualizar(
    id: string,
    programaVacunacionDto: ActualizarProgramaVacunacionDto,
  ) {
    const programaVacunacion =
      await this.programaVacunacionRepository.buscarPorId(id);
    if (!programaVacunacion) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }
    try {
      await this.programaVacunacionRepository.actualizar(
        id,
        programaVacunacionDto,
      );
      return { id };
    } catch (error) {
      console.error('Error al actualizar Programa Vacunacion:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }

  async activar(idProgramaVacunacion: string) {
    const programaVacunacion =
      await this.programaVacunacionRepository.buscarPorId(idProgramaVacunacion);
    if (!programaVacunacion) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }

    try {
      const programaVacunacionDto = new ActualizarProgramaVacunacionDto();
      programaVacunacionDto.estadoId = 1;
      //console.log(esquemaDto);
      await this.programaVacunacionRepository.actualizar(
        idProgramaVacunacion,
        programaVacunacionDto,
      );
      return { id: idProgramaVacunacion, estado_id: 1 };
    } catch (error) {
      console.error('Error al activar Programa Vacunacion:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }

  async inactivar(idProgramaVacunacion: string) {
    const programaVacunacion =
      await this.programaVacunacionRepository.buscarPorId(idProgramaVacunacion);
    if (!programaVacunacion) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }

    try {
      const programaVacunacionDto = new ActualizarProgramaVacunacionDto();
      programaVacunacionDto.estadoId = 2;
      console.log(programaVacunacionDto);
      await this.programaVacunacionRepository.actualizar(
        idProgramaVacunacion,
        programaVacunacionDto,
      );
      return { id: idProgramaVacunacion, estado_id: 2 };
    } catch (error) {
      console.error('Error al inactivar Programa Vacunacion:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }
}
