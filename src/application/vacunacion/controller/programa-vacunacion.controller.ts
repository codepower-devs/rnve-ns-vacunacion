import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BaseController } from '@/common/base';
//
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ProgramaVacunacionService } from '../service/programa-vacunacion.service';
import { CrearProgramaVacunacionDto } from '../dto/crear-programavacunacion.dto';
import { ActualizarProgramaVacunacionDto } from '../dto/actualizar-programavacunacion.dto';
//import { Request } from 'express';
//import { JwtAuthGuard } from '@/core/authentication/guards/jwt-auth.guard';

@ApiTags('Programa-Vacunacion')
//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, CasbinGuard)
@Controller('programaVacunacion')
export class ProgramaVacunacionController extends BaseController {
  constructor(private programavacunacionService: ProgramaVacunacionService) {
    super();
  }

  @ApiOperation({
    summary: 'API para obtener el listado de Programas de Vacunacion',
  })
  @Get()
  async listar() {
    const result = await this.programavacunacionService.listar();
    return this.successList(result);
  }

  @ApiOperation({
    summary: 'API para obtener el listado de todos los Programas de Vacunacion',
  })
  @Get('todos')
  async listarTodos(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result =
      await this.programavacunacionService.listarTodos(paginacionQueryDto);
    return this.successListRows(result);
  }

  @ApiOperation({ summary: 'API para crear un Programa de Vacunacion' })
  @ApiBody({
    type: CrearProgramaVacunacionDto,
    description:
      'Esta API permite crear un Programa de Vacunacion utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() programaVacunacionDto: CrearProgramaVacunacionDto) {
    //console.log(programaVacunacionDto);
    const result = await this.programavacunacionService.crear(
      programaVacunacionDto,
    );
    return this.successCreate(result);
  }

  @ApiOperation({ summary: 'API para actualizar un Programa de Vacunacion' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @ApiBody({
    type: ActualizarProgramaVacunacionDto,
    description:
      'Esta API permite actualizar un Programa de Vacunacion existente utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: ParamIdDto,
    @Body() programaVacunacionDto: ActualizarProgramaVacunacionDto,
  ) {
    const { id: idProgramaVacunacion } = params;
    const result = await this.programavacunacionService.actualizar(
      idProgramaVacunacion,
      programaVacunacionDto,
    );
    return this.successUpdate(result);
  }

  @ApiOperation({ summary: 'API para activar un Programa de Vacunacion' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/activacion')
  async activar(@Param() params: ParamIdDto) {
    const { id: idProgramaVacunacion } = params;
    const result =
      await this.programavacunacionService.activar(idProgramaVacunacion);
    return result;
  }

  @ApiOperation({ summary: 'API para inactivar un Programa de Vacunacion' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/inactivacion')
  async inactivar(@Param() params: ParamIdDto) {
    const { id: idProgramaVacunacion } = params;
    const result =
      await this.programavacunacionService.inactivar(idProgramaVacunacion);
    return result;
  }
}
