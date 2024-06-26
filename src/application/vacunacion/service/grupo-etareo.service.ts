import { BaseService } from '@/common/base';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GrupoetareoRepository } from '../repository/grupo-etareo.repository';
import { CrearGrupoetareoDto } from '../dto/crear-grupoetareo.dto';
import { Messages } from '@/common/constants/response-messages';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ActualizarGrupoetareoDto } from '../dto/actualizar-grupoetareo.dto';

@Injectable()
export class GrupoetareoService extends BaseService {
  constructor(
    @Inject(GrupoetareoRepository)
    private grupoetareoRepository: GrupoetareoRepository,
  ) {
    super();
  }

  async listar() {
    return await this.grupoetareoRepository.listar();
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    return await this.grupoetareoRepository.listarTodos(paginacionQueryDto);
  }

  async crear(grupoEtareoDto: CrearGrupoetareoDto) {
    return await this.grupoetareoRepository.crear(grupoEtareoDto);
  }

  async actualizar(id: string, grupoEtareoDto: ActualizarGrupoetareoDto) {
    const grupoEtareo = await this.grupoetareoRepository.buscarPorId(id);
    if (!grupoEtareo) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }

    console.log(grupoEtareoDto);
    await this.grupoetareoRepository.actualizar(id, grupoEtareoDto);
    return { id };
  }

  async activar(idGrupoEtareo: string) {
    const grupoEtareo =
      await this.grupoetareoRepository.buscarPorId(idGrupoEtareo);
    if (!grupoEtareo) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }

    const grupoEtareoDto = new ActualizarGrupoetareoDto();
    grupoEtareoDto.estadoId = 1;

    await this.grupoetareoRepository.actualizar(idGrupoEtareo, grupoEtareoDto);
    return { id: idGrupoEtareo, estado_id: 1 };
  }

  async inactivar(idGrupoEtareo: string) {
    const grupoEtareo =
      await this.grupoetareoRepository.buscarPorId(idGrupoEtareo);
    if (!grupoEtareo) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }

    const grupoEtareoDto = new ActualizarGrupoetareoDto();
    grupoEtareoDto.estadoId = 2;

    await this.grupoetareoRepository.actualizar(idGrupoEtareo, grupoEtareoDto);
    return { id: idGrupoEtareo, estado_id: 2 };
  }
}
