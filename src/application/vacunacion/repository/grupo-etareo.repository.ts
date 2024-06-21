import { Brackets, DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { grupoEtareo } from '../entity/grupo_etareo.entity';
import { CrearGrupoetareoDto } from '../dto/crear-grupoetareo.dto';
import { ActualizarGrupoetareoDto } from '../dto/actualizar-grupoetareo.dto';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';

@Injectable()
export class GrupoetareoRepository {
  constructor(private dataSource: DataSource) {}

  async listar() {
    return await this.dataSource
      .getRepository(grupoEtareo)
      .createQueryBuilder('grupoEtareo')
      .select([
        'grupoEtareo.id',
        'grupoEtareo.descripcion',
        'grupoEtareo.periodoTiempoId',
        'grupoEtareo.descripcionPeriodoTiempo',
        'grupoEtareo.edadInicial',
        'grupoEtareo.edadFinal',
        'grupoEtareo.generoAplicaId',
        'grupoEtareo.descripcionGeneroAplica',
        'grupoEtareo.esEsquemaRegular',
        'grupoEtareo.estadoId',
      ])
      .where({ estadoId: 1 })
      .getMany();
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto;
    const query = this.dataSource
      .getRepository(grupoEtareo)
      .createQueryBuilder('grupoEtareo')
      .select([
        'grupoEtareo.id',
        'grupoEtareo.descripcion',
        'grupoEtareo.periodoTiempoId',
        'grupoEtareo.descripcionPeriodoTiempo',
        'grupoEtareo.edadInicial',
        'grupoEtareo.edadFinal',
        'grupoEtareo.generoAplicaId',
        'grupoEtareo.descripcionGeneroAplica',
        'grupoEtareo.esEsquemaRegular',
        'grupoEtareo.estadoId',
      ])
      .take(limite)
      .skip(saltar);

    switch (orden) {
      case 'descripcion':
        query.addOrderBy('grupoEtareo.descripcion', sentido);
        break;
      case 'descripcion_periodo_tiempo':
        query.addOrderBy('grupoEtareo.descripcion_periodo_tiempo', sentido);
        break;
      default:
        query.addOrderBy('grupoEtareo.id', 'ASC');
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('grupoEtareo.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          });
          qb.orWhere('grupoEtareo.descripcion_periodo_tiempo ilike :filtro', {
            filtro: `%${filtro}%`,
          });
        }),
      );
    }
    return await query.getManyAndCount();
  }

  async buscarPorDescripcionGrupoetareo(
    descripcion: string,
    transaction?: EntityManager,
  ) {
    const repo = transaction
      ? transaction.getRepository(grupoEtareo)
      : this.dataSource.getRepository(grupoEtareo);
    return await repo
      .createQueryBuilder('grupoEtareo')
      .where({ descripcion: descripcion })
      .select([
        'grupoEtareo.id',
        'grupoEtareo.descripcion',
        'grupoEtareo.periodoTiempoId',
        'grupoEtareo.descripcionPeriodoTiempo',
        'grupoEtareo.edadInicial',
        'grupoEtareo.edadFinal',
        'grupoEtareo.generoAplicaId',
        'grupoEtareo.descripcionGeneroAplica',
        'grupoEtareo.esEsquemaRegular',
        'grupoEtareo.estadoId',
      ])
      .getOne();
  }

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(grupoEtareo)
      .createQueryBuilder('grupoEtareo')
      .where({ id: id })
      .select([
        'grupoEtareo.id',
        'grupoEtareo.descripcion',
        'grupoEtareo.periodoTiempoId',
        'grupoEtareo.descripcionPeriodoTiempo',
        'grupoEtareo.edadInicial',
        'grupoEtareo.edadFinal',
        'grupoEtareo.generoAplicaId',
        'grupoEtareo.descripcionGeneroAplica',
        'grupoEtareo.esEsquemaRegular',
        'grupoEtareo.estadoId',
      ])
      .getOne();
  }

  async crear(grupoEtareoDto: CrearGrupoetareoDto) {
    // Crear una nueva instancia de grupoEtareo con el objeto modificado
    const nuevoGrupoEtario = new grupoEtareo({
      ...grupoEtareoDto,
      created_at: new Date(),
      estadoId: 1,
      usuarioId: 99,
    });

    return await this.dataSource
      .getRepository(grupoEtareo)
      .save(nuevoGrupoEtario);
  }

  async actualizar(id: string, grupoEtareoDto: ActualizarGrupoetareoDto) {
    const datosActualizar = {
      ...grupoEtareoDto,
      updated_at: new Date(),
      usuarioId: 100,
    };

    return await this.dataSource
      .getRepository(grupoEtareo)
      .update(id, datosActualizar);
  }
}
