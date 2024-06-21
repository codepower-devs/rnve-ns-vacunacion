import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VacunaService } from '../service/vacuna.service';
import { BaseController } from '@/common/base';
//
import { CrearVacunaDto } from '../dto/crear-vacuna.dto';
import { ActualizarVacunaDto } from '../dto/actualizar-vacuna.dto';
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
//import { Request } from 'express';
//import { JwtAuthGuard } from '@/core/authentication/guards/jwt-auth.guard';

@ApiTags('Vacunas')
//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, CasbinGuard)
@Controller('vacuna')
export class VacunaController extends BaseController {
  constructor(private vacunaService: VacunaService) {
    super();
  }

  @ApiOperation({ summary: 'API para obtener el listado de vacunas' })
  @Get()
  async listar() {
    const result = await this.vacunaService.listar();
    return this.successList(result);
  }

  @ApiOperation({
    summary: 'API para obtener el listado de todos las vacunas',
  })
  @Get('todos')
  async listarTodos(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.vacunaService.listarTodos(paginacionQueryDto);
    return this.successListRows(result);
  }

  @ApiOperation({ summary: 'API para crear una vacuna' })
  @ApiBody({
    type: CrearVacunaDto,
    description:
      'Esta API permite crear un nuevo vacuna utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() vacunaDto: CrearVacunaDto) {
    //console.log(vacunaDto);
    const result = await this.vacunaService.crear(vacunaDto);
    return this.successCreate(result);
  }

  @ApiOperation({ summary: 'API para actualizar un vacuna' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @ApiBody({
    type: ActualizarVacunaDto,
    description:
      'Esta API permite actualizar un vacuna existente utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: ParamIdDto,
    @Body() vacunaDto: ActualizarVacunaDto,
  ) {
    const { id: idVacuna } = params;
    const result = await this.vacunaService.actualizar(idVacuna, vacunaDto);
    return this.successUpdate(result);
  }

  @ApiOperation({ summary: 'API para activar un vacuna' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/activacion')
  async activar(@Param() params: ParamIdDto) {
    const { id: idVacuna } = params;
    const result = await this.vacunaService.activar(idVacuna);
    return result;
  }

  @ApiOperation({ summary: 'API para inactivar un vacuna' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/inactivacion')
  async inactivar(@Param() params: ParamIdDto) {
    const { id: idVacuna } = params;
    const result = await this.vacunaService.inactivar(idVacuna);
    return result;
  }
}
