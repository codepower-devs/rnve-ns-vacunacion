import { BaseController } from '@/common/base';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ActualizarProgramaVacunacionDto } from '../dto/actualizar-programavacunacion.dto';
import { CrearProgramaVacunacionDto } from '../dto/crear-programavacunacion.dto';
import { ProgramaVacunacionService } from '../service/programa-vacunacion.service';

@ApiTags('Programa-Vacunacion')
@Controller('programaVacunacion')
export class ProgramaVacunacionController extends BaseController {
  constructor(private programavacunacionService: ProgramaVacunacionService) {
    super();
  }

  @MessagePattern({ cmd: 'listar-programa-vacunacion' })
  async listar() {
    const result = await this.programavacunacionService.listar();
    return this.successList(result);
  }

  @MessagePattern({ cmd: 'listar-programa-vacunacion-paginacion' })
  async listarTodos(@Payload() paginacionQueryDto: PaginacionQueryDto) {
    const result =
      await this.programavacunacionService.listarTodos(paginacionQueryDto);
    return this.successListRows(result);
  }

  @MessagePattern({ cmd: 'crear-programa-vacunacion' })
  async crear(@Payload() programaVacunacionDto: CrearProgramaVacunacionDto) {
    const result = await this.programavacunacionService.crear(
      programaVacunacionDto,
    );
    return this.successCreate(result);
  }

  @MessagePattern({ cmd: 'actualizar-programa-vacunacion' })
  async actualizar(
    @Payload() programaVacunacionDto: ActualizarProgramaVacunacionDto,
  ) {
    const { id: idProgramaVacunacion } = programaVacunacionDto;
    const result = await this.programavacunacionService.actualizar(
      idProgramaVacunacion,
      programaVacunacionDto,
    );
    return this.successUpdate(result);
  }

  @MessagePattern({ cmd: 'activar-programa-vacunacion' })
  async activar(@Payload() params: ParamIdDto) {
    const { id: idProgramaVacunacion } = params;
    const result =
      await this.programavacunacionService.activar(idProgramaVacunacion);
    return result;
  }

  @MessagePattern({ cmd: 'inactivar-programa-vacunacion' })
  async inactivar(@Payload() params: ParamIdDto) {
    const { id: idProgramaVacunacion } = params;
    const result =
      await this.programavacunacionService.inactivar(idProgramaVacunacion);
    return result;
  }
}
