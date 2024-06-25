import { BaseController } from '@/common/base';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActualizarGrupoetareoDto } from '../dto/actualizar-grupoetareo.dto';
import { CrearGrupoetareoDto } from '../dto/crear-grupoetareo.dto';
import { GrupoetareoService } from '../service/grupo-etareo.service';

@Controller('grupoEtareo')
export class GrupoetareoController extends BaseController {
  constructor(private grupoetareoService: GrupoetareoService) {
    super();
  }

  @MessagePattern({ cmd: 'listar_grupo_etareo' })
  async listar() {
    const result = await this.grupoetareoService.listar();
    return this.successList(result);
  }

  @MessagePattern({ cmd: 'listar_grupo_etareo_paginacion' })
  @Get('todos')
  async listarTodos(@Payload() paginacionQueryDto: PaginacionQueryDto) {
    const result =
      await this.grupoetareoService.listarTodos(paginacionQueryDto);
    return this.successListRows(result);
  }

  @MessagePattern({ cmd: 'crear_grupo_etareo' })
  async crear(@Payload() grupoEtareoDto: CrearGrupoetareoDto) {
    const result = await this.grupoetareoService.crear(grupoEtareoDto);
    return this.successCreate(result);
  }

  @MessagePattern({ cmd: 'actualizar_grupo_etareo' })
  async actualizar(@Payload() grupoEtareoDto: ActualizarGrupoetareoDto) {
    const result = await this.grupoetareoService.actualizar(
      grupoEtareoDto.id!,
      grupoEtareoDto,
    );
    return this.successUpdate(result);
  }

  @MessagePattern({ cmd: 'activar_grupo_etareo' })
  async activar(@Payload() params: ParamIdDto) {
    const { id: idGrupoEtareo } = params;
    const result = await this.grupoetareoService.activar(idGrupoEtareo);
    return result;
  }

  @MessagePattern({ cmd: 'inactivar_grupo_etareo' })
  async inactivar(@Payload() params: ParamIdDto) {
    const { id: idGrupoEtareo } = params;
    const result = await this.grupoetareoService.inactivar(idGrupoEtareo);
    return result;
  }
}
