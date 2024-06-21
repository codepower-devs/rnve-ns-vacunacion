import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EsquemaService } from '../service/esquema.service';
import { BaseController } from '@/common/base';
//
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { CrearEsquemaDto } from '../dto/crear-esquema.dto';
import { ActualizarEsquemaDto } from '../dto/actualizar-esquema.dto';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
//import { Request } from 'express';
//import { JwtAuthGuard } from '@/core/authentication/guards/jwt-auth.guard';

@ApiTags('Esquema')
//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, CasbinGuard)
@Controller('esquema')
export class EsquemaController extends BaseController {
  constructor(private esquemaService: EsquemaService) {
    super();
  }

  @ApiOperation({ summary: 'API para obtener el listado de Esquemas' })
  @Get()
  async listar() {
    const result = await this.esquemaService.listar();
    return this.successList(result);
  }

  @ApiOperation({
    summary: 'API para obtener el listado de todos los Esquemas',
  })
  @Get('todos')
  async listarTodos(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.esquemaService.listarTodos(paginacionQueryDto);
    return this.successListRows(result);
  }

  @ApiOperation({ summary: 'API para crear una vacuna dentro de un Esquema' })
  @ApiBody({
    type: CrearEsquemaDto,
    description:
      'Esta API permite crearuna vacuna dentro de un Esquema utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() esquemaDto: CrearEsquemaDto) {
    //console.log(esquemaDto);
    const result = await this.esquemaService.crear(esquemaDto);
    return this.successCreate(result);
  }

  @ApiOperation({ summary: 'API para actualizar una vacuna dentro un Esquema' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @ApiBody({
    type: ActualizarEsquemaDto,
    description:
      'Esta API permite actualizar una vacuna dentro un Esquema existente utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: ParamIdDto,
    @Body() esquemaDto: ActualizarEsquemaDto,
  ) {
    const { id: idEsquema } = params;
    const result = await this.esquemaService.actualizar(idEsquema, esquemaDto);
    return this.successUpdate(result);
  }

  @ApiOperation({ summary: 'API para activar una vacuna dentro un Esquema' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/activacion')
  async activar(@Param() params: ParamIdDto) {
    const { id: idEsquema } = params;
    const result = await this.esquemaService.activar(idEsquema);
    return result;
  }

  @ApiOperation({ summary: 'API para inactivar una vacuna dentro un Esquema' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/inactivacion')
  async inactivar(@Param() params: ParamIdDto) {
    const { id: idEsquema } = params;
    const result = await this.esquemaService.inactivar(idEsquema);
    return result;
  }
}
