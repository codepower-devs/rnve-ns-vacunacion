import { BaseController } from '@/common/base';
import { Controller } from '@nestjs/common';
import { EsquemaService } from '../service/esquema.service';
//
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActualizarEsquemaDto } from '../dto/actualizar-esquema.dto';
import { CrearEsquemaDto } from '../dto/crear-esquema.dto';

@Controller('esquema')
export class EsquemaController extends BaseController {
  constructor(private esquemaService: EsquemaService) {
    super();
  }

  @MessagePattern({ cmd: 'listar-esquemas-vacunacion' })
  async listar() {
    const result = await this.esquemaService.listar();
    return this.successList(result);
  }

  @MessagePattern({ cmd: 'listar-esquemas-vacunacion-paginacion' })
  async listarTodos(@Payload() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.esquemaService.listarTodos(paginacionQueryDto);
    return this.successListRows(result);
  }

  @MessagePattern({ cmd: 'crear-esquema-vacunacion' })
  async crear(@Payload() esquemaDto: CrearEsquemaDto) {
    const result = await this.esquemaService.crear(esquemaDto);
    return this.successCreate(result);
  }

  @MessagePattern({ cmd: 'actualizar-esquema-vacunacion' })
  async actualizar(@Payload() esquemaDto: ActualizarEsquemaDto) {
    const { id } = esquemaDto;
    const result = await this.esquemaService.actualizar(id, esquemaDto);
    return this.successUpdate(result);
  }

  @MessagePattern({ cmd: 'activar-esquema-vacunacion' })
  async activar(@Payload() params: ParamIdDto) {
    const { id: idEsquema } = params;
    const result = await this.esquemaService.activar(idEsquema);
    return result;
  }

  @MessagePattern({ cmd: 'inactivar-esquema-vacunacion' })
  async inactivar(@Payload() params: ParamIdDto) {
    const { id: idEsquema } = params;
    const result = await this.esquemaService.inactivar(idEsquema);
    return result;
  }
}
