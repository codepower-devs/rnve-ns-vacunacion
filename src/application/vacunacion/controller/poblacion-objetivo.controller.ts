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

import { ParamIdDto } from '@/common/dto/params-id.dto';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';

import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PoblacionobjetivoService } from '../service/poblacion-objetivo.service';
import { CrearPoblacionObjetivoDto } from '../dto/crear-poblacionobjetivo.dto';
import { ActualizarPoblacionObjetivoDto } from '../dto/actualizar-poblacionobjetivo.dto';
//import { Request } from 'express';
//import { JwtAuthGuard } from '@/core/authentication/guards/jwt-auth.guard';

@ApiTags('Poblacion-Objetivo')
//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, CasbinGuard)
@Controller('poblacionObjetivo')
export class PoblacionobjetivoController extends BaseController {
  constructor(private poblacionobjetivoService: PoblacionobjetivoService) {
    super();
  }

  @ApiOperation({
    summary: 'API para obtener el listado de Poblacion Objetivo',
  })
  @Get()
  async listar() {
    const result = await this.poblacionobjetivoService.listar();
    return this.successList(result);
  }

  @ApiOperation({
    summary: 'API para obtener el listado de todos los Poblacion Objetivo',
  })
  @Get('todos')
  async listarTodos(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result =
      await this.poblacionobjetivoService.listarTodos(paginacionQueryDto);
    return this.successListRows(result);
  }

  @ApiOperation({ summary: 'API para crear un Poblacion Objetivo' })
  @ApiBody({
    type: CrearPoblacionObjetivoDto,
    description:
      'Esta API permite crear un nuevo Poblacion Objetivo utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() poblacionObjetivoDto: CrearPoblacionObjetivoDto) {
    //console.log(poblacionObjetivoDto);
    const result =
      await this.poblacionobjetivoService.crear(poblacionObjetivoDto);
    return this.successCreate(result);
  }

  @ApiOperation({ summary: 'API para actualizar un Poblacion Objetivo' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @ApiBody({
    type: ActualizarPoblacionObjetivoDto,
    description:
      'Esta API permite actualizar un Poblacion Objetivo existente utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: ParamIdDto,
    @Body() poblacionObjetivoDto: ActualizarPoblacionObjetivoDto,
  ) {
    const { id: idPoblacionObjetivo } = params;
    const result = await this.poblacionobjetivoService.actualizar(
      idPoblacionObjetivo,
      poblacionObjetivoDto,
    );
    return this.successUpdate(result);
  }

  @ApiOperation({ summary: 'API para activar un Poblacion Objetivo' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/activacion')
  async activar(@Param() params: ParamIdDto) {
    const { id: idPoblacionObjetivo } = params;
    const result =
      await this.poblacionobjetivoService.activar(idPoblacionObjetivo);
    return result;
  }

  @ApiOperation({ summary: 'API para inactivar un Poblacion Objetivo' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/inactivacion')
  async inactivar(@Param() params: ParamIdDto) {
    const { id: idPoblacionObjetivo } = params;
    const result =
      await this.poblacionobjetivoService.inactivar(idPoblacionObjetivo);
    return result;
  }
}
