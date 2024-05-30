import { BaseService } from '@/common/base/base-service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GlobalsRepository } from '../repository';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { Messages } from '@/common/constants/response-messages';
import { ActualizarGlobalsDto, CrearGlobalsDto } from '../dto';
import { GlobalsEstado } from '../constant';

@Injectable()
export class GlobalsService extends BaseService {
  constructor(
    @Inject(GlobalsRepository)
    private parametroRepositorio: GlobalsRepository,
  ) {
    super();
  }

  async crear(parametroDto: CrearGlobalsDto, usuarioAuditoria: string) {
    return await this.parametroRepositorio.crear(
      parametroDto,
      usuarioAuditoria,
    );
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    return await this.parametroRepositorio.listar(paginacionQueryDto);
  }

  async listarPorGrupo(grupo: string) {
    return await this.parametroRepositorio.listarPorGrupo(grupo);
  }

  async actualizarDatos(
    id: string,
    parametroDto: ActualizarGlobalsDto,
    usuarioAuditoria: string,
  ) {
    const parametro = await this.parametroRepositorio.buscarPorId(id);
    if (!parametro) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT);
    }
    await this.parametroRepositorio.actualizar(
      id,
      parametroDto,
      usuarioAuditoria,
    );
    return { id };
  }

  async activar(idGlobals: string, usuarioAuditoria: string) {
    const parametro = await this.parametroRepositorio.buscarPorId(idGlobals);
    if (!parametro) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT);
    }
    const parametroDto = new ActualizarGlobalsDto();
    parametroDto.estado = GlobalsEstado.ACTIVO;
    await this.parametroRepositorio.actualizar(
      idGlobals,
      parametroDto,
      usuarioAuditoria,
    );
    return {
      id: idGlobals,
      estado: parametroDto.estado,
    };
  }

  async inactivar(idGlobals: string, usuarioAuditoria: string) {
    const parametro = await this.parametroRepositorio.buscarPorId(idGlobals);
    if (!parametro) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT);
    }
    const parametroDto = new ActualizarGlobalsDto();
    parametroDto.estado = GlobalsEstado.INACTIVO;
    await this.parametroRepositorio.actualizar(
      idGlobals,
      parametroDto,
      usuarioAuditoria,
    );
    return {
      id: idGlobals,
      estado: parametroDto.estado,
    };
  }
}
