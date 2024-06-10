import { BaseController } from '@/common/base';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ActualizarParametroDto,
  CrearParametroDto,
  ParamGrupoDto,
} from '../dto';
import { ParametroService } from '../service';

@Controller('parametros')
export class ParametroController extends BaseController {
  constructor(private parametroServicio: ParametroService) {
    super();
  }

  @MessagePattern({ cmd: 'listar-parametros' })
  async listar(@Payload() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.parametroServicio.listar(paginacionQueryDto);
    return this.successListRows(result);
  }

  @MessagePattern({ cmd: 'listar-parametros-por-grupo' })
  async listarPorGrupo(@Payload() params: ParamGrupoDto) {
    const { grupo } = params;
    const result = await this.parametroServicio.listarPorGrupo(grupo);
    return this.successList(result);
  }

  @MessagePattern({ cmd: 'crear-parametro' })
  async crear(@Payload() parametroDto: CrearParametroDto) {
    const result = await this.parametroServicio.crear(parametroDto);
    return this.successCreate(result);
  }

  @MessagePattern({ cmd: 'actualizar-parametro' })
  async actualizar(@Payload() parametroDto: ActualizarParametroDto) {
    const { id } = parametroDto;
    const result = await this.parametroServicio.actualizarDatos(
      id,
      parametroDto,
    );
    return this.successUpdate(result);
  }

  @MessagePattern({ cmd: 'activar-parametro' })
  async activar(@Payload() params: ParamIdDto) {
    const { id: idParametro } = params;
    const result = await this.parametroServicio.activar(idParametro);
    return this.successUpdate(result);
  }

  @MessagePattern({ cmd: 'inactivar-parametro' })
  async inactivar(@Payload() params: ParamIdDto) {
    const { id: idParametro } = params;
    const result = await this.parametroServicio.inactivar(idParametro);
    return this.successUpdate(result);
  }
}
