import { BaseController } from '@/common/base';
import { Controller } from '@nestjs/common';
import { VacunaService } from '../service/vacuna.service';
//
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActualizarVacunaDto } from '../dto/actualizar-vacuna.dto';
import { CrearVacunaDto } from '../dto/crear-vacuna.dto';
@Controller('vacuna')
export class VacunaController extends BaseController {
  constructor(private vacunaService: VacunaService) {
    super();
  }

  @MessagePattern({ cmd: 'listar-vacunas' })
  async listar() {
    const result = await this.vacunaService.listar();
    return this.successList(result);
  }

  @MessagePattern({ cmd: 'listar-vacunas-paginacion' })
  async listarTodos(@Payload() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.vacunaService.listarTodos(paginacionQueryDto);
    return this.successListRows(result);
  }

  @MessagePattern({ cmd: 'crear-vacuna' })
  async crear(@Payload() vacunaDto: CrearVacunaDto) {
    const result = await this.vacunaService.crear(vacunaDto);
    return this.successCreate(result);
  }

  @MessagePattern({ cmd: 'actualizar-vacuna' })
  async actualizar(@Payload() vacunaDto: ActualizarVacunaDto) {
    const { id } = vacunaDto;
    const result = await this.vacunaService.actualizar(id, vacunaDto);
    return this.successUpdate(result);
  }

  @MessagePattern({ cmd: 'activar-vacuna' })
  async activar(@Payload() params: ParamIdDto) {
    const { id: idVacuna } = params;
    const result = await this.vacunaService.activar(idVacuna);
    return result;
  }

  @MessagePattern({ cmd: 'inactivar-vacuna' })
  async inactivar(@Payload() params: ParamIdDto) {
    const { id: idVacuna } = params;
    const result = await this.vacunaService.inactivar(idVacuna);
    return result;
  }
}
