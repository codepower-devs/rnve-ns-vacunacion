import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GrupoetareoService } from '../service/grupo-etareo.service';
import { BaseController } from '@/common/base';
//
import { CrearGrupoetareoDto } from '../dto/crear-grupoetareo.dto';
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ActualizarGrupoetareoDto } from '../dto/actualizar-grupoetareo.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
//import { Request } from 'express';
//import { JwtAuthGuard } from '@/core/authentication/guards/jwt-auth.guard';

@ApiTags('Grupo-Etareo')
//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, CasbinGuard)
@Controller('grupoEtareo')
export class GrupoetareoController extends BaseController {
  constructor(private grupoetareoService: GrupoetareoService) {
    super();
  }

  @ApiOperation({ summary: 'API para obtener el listado de Grupos etareos' })
  @Get()
  async listar() {
    const result = await this.grupoetareoService.listar();
    return this.successList(result);
  }

  @ApiOperation({
    summary: 'API para obtener el listado de todos los Grupos etareos',
  })
  @Get('todos')
  async listarTodos(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result =
      await this.grupoetareoService.listarTodos(paginacionQueryDto);
    return this.successListRows(result);
  }

  @ApiOperation({ summary: 'API para crear un Grupo etareo' })
  @ApiBody({
    type: CrearGrupoetareoDto,
    description:
      'Esta API permite crear un nuevo Grupo etareo utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() grupoEtareoDto: CrearGrupoetareoDto) {
    //console.log(grupoEtareoDto);
    const result = await this.grupoetareoService.crear(grupoEtareoDto);
    return this.successCreate(result);
  }

  @ApiOperation({ summary: 'API para actualizar un Grupo etareo' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @ApiBody({
    type: ActualizarGrupoetareoDto,
    description:
      'Esta API permite actualizar un Grupo etareo existente utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: ParamIdDto,
    @Body() grupoEtareoDto: ActualizarGrupoetareoDto,
  ) {
    const { id: idGrupoEtareo } = params;
    const result = await this.grupoetareoService.actualizar(
      idGrupoEtareo,
      grupoEtareoDto,
    );
    return this.successUpdate(result);
  }

  @ApiOperation({ summary: 'API para activar un Grupo etareo' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/activacion')
  async activar(@Param() params: ParamIdDto) {
    const { id: idGrupoEtareo } = params;
    const result = await this.grupoetareoService.activar(idGrupoEtareo);
    return result;
  }

  @ApiOperation({ summary: 'API para inactivar un Grupo etareo' })
  @ApiProperty({
    type: ParamIdDto,
  })
  @Patch('/:id/inactivacion')
  async inactivar(@Param() params: ParamIdDto) {
    const { id: idGrupoEtareo } = params;
    const result = await this.grupoetareoService.inactivar(idGrupoEtareo);
    return result;
  }
}
