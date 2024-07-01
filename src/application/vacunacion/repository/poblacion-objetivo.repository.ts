import { Brackets, DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ErrorHandlingService } from 'src/common/utils/error_handle.service';

import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { poblacionObjetivo } from '../entity/poblacion_objetivo.entity';
import { CrearPoblacionObjetivoDto } from '../dto/crear-poblacionobjetivo.dto';
import { EstablecimientoGestion } from '@/application/estructura/entity/establecimiento_gestion.entity';
import { grupoEtareo } from '../entity/grupo_etareo.entity';
import { ActualizarPoblacionObjetivoDto } from '../dto/actualizar-poblacionobjetivo.dto';
import { EstablecimientoGestionRepository } from '@/application/estructura/repository/establecimiento_gestion.repository';

@Injectable()
export class PoblacionobjetivoRepository {
  constructor(
    private dataSource: DataSource,
    private readonly errorHandlingService: ErrorHandlingService,
    @Inject(EstablecimientoGestionRepository)
    private establecimientoGestionRepository: EstablecimientoGestionRepository,
  ) {}

  async listar() {
    try {
      return await this.dataSource
        .getRepository(poblacionObjetivo)
        .createQueryBuilder('poblacion')
        .innerJoin('poblacion.grupoEtareo', 'grupoEtareo')
        .innerJoin('poblacion.establecimientoGestion', 'establecimientoGestion')
        .select([
          'poblacion.id',
          'poblacion.cantidadMasculino',
          'poblacion.cantidadFemenino',
          'poblacion.cantidadMasculinoPai',
          'poblacion.cantidadFemeninoPai',
          'poblacion.estadoId',
          'grupoEtareo.descripcion',
          'establecimientoGestion.id',
          'establecimientoGestion.establecimiento',
        ])
        .andWhere('poblacion.estado_id = :estadoId', { estadoId: 1 })
        .getMany();
    } catch (error) {
      console.error('Error listar esquema:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto;
    const query = this.dataSource
      .getRepository(poblacionObjetivo)
      .createQueryBuilder('poblacion')
      .innerJoin('poblacion.grupoEtareo', 'grupoEtareo')
      .innerJoin('poblacion.establecimientoGestion', 'establecimientoGestion')
      .select([
        'poblacion.id',
        'poblacion.cantidadMasculino',
        'poblacion.cantidadFemenino',
        'poblacion.cantidadMasculinoPai',
        'poblacion.cantidadFemeninoPai',
        'poblacion.estadoId',
        'grupoEtareo.descripcion',
        'establecimientoGestion.id',
        'establecimientoGestion.establecimiento',
      ])
      .take(limite)
      .skip(saltar);

    switch (orden) {
      case 'grupoetareo':
        query.addOrderBy('grupoEtareo.descripcion', sentido);
        break;
      case 'establecimientoId':
        query.addOrderBy('establecimientoGestion.id', sentido);
        break;
      default:
        query.addOrderBy('poblacion.id', 'ASC');
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('grupoEtareo.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          });
          qb.orWhere('establecimientoGestion.id ilike :filtro', {
            filtro: `${filtro}`,
          });
        }),
      );
    }
    return await query.getManyAndCount();
  }

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(poblacionObjetivo)
      .createQueryBuilder('poblacion')
      .where({ id: id })
      .innerJoin('poblacion.grupoEtareo', 'grupoEtareo')
      .innerJoin('poblacion.establecimientoGestion', 'establecimientoGestion')
      .select([
        'poblacion.id',
        'poblacion.cantidadMasculino',
        'poblacion.cantidadFemenino',
        'poblacion.cantidadMasculinoPai',
        'poblacion.cantidadFemeninoPai',
        'poblacion.estadoId',
        'grupoEtareo.id',
        'grupoEtareo.descripcion',
        'establecimientoGestion.id',
        'establecimientoGestion.establecimiento',
      ])
      .getOne();
  }

  async crear(crearPoblacionObjetivoDto: CrearPoblacionObjetivoDto) {
    try {
      // Crear una nueva instancia de esquema con el objeto modificado
      const estabgest = new EstablecimientoGestion();
      estabgest.id = crearPoblacionObjetivoDto.establecimientoGestionId;

      const grupoetareo = new grupoEtareo();
      grupoetareo.id = crearPoblacionObjetivoDto.grupoEtareoId;

      const nuevaPoblacion = new poblacionObjetivo({
        ...crearPoblacionObjetivoDto,
        cantidad:
          crearPoblacionObjetivoDto.cantidadMasculino +
          crearPoblacionObjetivoDto.cantidadFemenino,
        cantidadPai:
          crearPoblacionObjetivoDto.cantidadMasculinoPai +
          crearPoblacionObjetivoDto.cantidadFemeninoPai,
        created_at: new Date(),
        estadoId: 1,
        usuarioId: 99,
        establecimientoGestion: estabgest,
        grupoEtareo: grupoetareo,
      });

      return await this.dataSource
        .getRepository(poblacionObjetivo)
        .save(nuevaPoblacion);
    } catch (error) {
      return this.errorHandlingService.handlerErrors(
        error,
        'create_poblacion_objetivo',
      );
    }
  }

  async actualizar(
    id: string,
    PoblacionObjetivoDto: ActualizarPoblacionObjetivoDto,
  ) {
    const estabgest = new EstablecimientoGestion();

    if (PoblacionObjetivoDto.establecimientoGestionId !== undefined) {
      estabgest.id = PoblacionObjetivoDto.establecimientoGestionId;
    } else {
      throw new Error('EstablecimientoGestionId es undefined');
    }

    const grupoetareo = new grupoEtareo();
    grupoetareo.id = PoblacionObjetivoDto.grupoEtareoId;

    const datosActualizar = {
      ...PoblacionObjetivoDto,
      updated_at: new Date(),
      usuarioId: 100,
      establecimientoGestion: estabgest,
      grupoEtareo: grupoetareo,
    };

    return await this.dataSource
      .getRepository(poblacionObjetivo)
      .update(id, datosActualizar);
  }
}
