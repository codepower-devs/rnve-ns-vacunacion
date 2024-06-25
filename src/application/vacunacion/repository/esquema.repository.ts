import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import { ActualizarEsquemaDto } from '../dto/actualizar-esquema.dto';
import { CrearEsquemaDto } from '../dto/crear-esquema.dto';
import { Esquema } from '../entity/esquema.entity';
import { Vacuna } from '../entity/vacuna.entity';

@Injectable()
export class EsquemaRepository {
  constructor(private dataSource: DataSource) {}

  async listar() {
    return await this.dataSource
      .getRepository(Esquema)
      .createQueryBuilder('esquema')
      .innerJoin('esquema.vacuna', 'vacuna')
      .select([
        'esquema.id',
        'esquema.edadCondicion',
        'esquema.periodoTiempoId',
        'esquema.descripcionPeriodoTiempo',
        'esquema.numeroDeDosis',
        'esquema.cantidadDeDosis',
        'esquema.viaLugarDeDosis',
        'esquema.edadMinimaDias',
        'esquema.edadMinimaMeses',
        'esquema.edadMinimaAnios',
        'esquema.edadMaximaDias',
        'esquema.edadMaximaMeses',
        'esquema.edadMaximaAnios',
        'esquema.ordenDeDosis',
        'esquema.esEsquemaRegular',
        'esquema.estadoId',
        'vacuna.vacuna',
      ])
      .where('esquema.estado_id = :estadoId', { estadoId: 1 })
      .getMany();
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto;
    const query = this.dataSource
      .getRepository(Esquema)
      .createQueryBuilder('esquema')
      .innerJoin('esquema.vacuna', 'vacuna')
      .select([
        'esquema.id',
        'esquema.edadCondicion',
        'esquema.periodoTiempoId',
        'esquema.descripcionPeriodoTiempo',
        'esquema.numeroDeDosis',
        'esquema.cantidadDeDosis',
        'esquema.viaLugarDeDosis',
        'esquema.edadMinimaDias',
        'esquema.edadMinimaMeses',
        'esquema.edadMinimaAnios',
        'esquema.edadMaximaDias',
        'esquema.edadMaximaMeses',
        'esquema.edadMaximaAnios',
        'esquema.ordenDeDosis',
        'esquema.esEsquemaRegular',
        'esquema.estadoId',
        'vacuna.vacuna',
      ])
      .take(limite)
      .skip(saltar);

    switch (orden) {
      case 'descripcion':
        query.addOrderBy('esquema.descripcion', sentido);
        break;
      case 'descripcion_periodo_tiempo':
        query.addOrderBy('esquema.descripcion_periodo_tiempo', sentido);
        break;
      default:
        query.addOrderBy('esquema.id', 'ASC');
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('vacuna.vacuna ilike :filtro', {
            filtro: `%${filtro}%`,
          });
          qb.orWhere('esquema.esEsquemaRegular ilike :filtro', {
            filtro: `${filtro}`,
          });
        }),
      );
    }
    return await query.getManyAndCount();
  }

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Esquema)
      .createQueryBuilder('esquema')
      .where({ id: id })
      .innerJoin('esquema.vacuna', 'vacuna')
      .select([
        'esquema.id',
        'esquema.edadCondicion',
        'esquema.periodoTiempoId',
        'esquema.descripcionPeriodoTiempo',
        'esquema.numeroDeDosis',
        'esquema.cantidadDeDosis',
        'esquema.viaLugarDeDosis',
        'esquema.edadMinimaDias',
        'esquema.edadMinimaMeses',
        'esquema.edadMinimaAnios',
        'esquema.edadMaximaDias',
        'esquema.edadMaximaMeses',
        'esquema.edadMaximaAnios',
        'esquema.ordenDeDosis',
        'esquema.esEsquemaRegular',
        'esquema.estadoId',
        'vacuna.id',
        'vacuna.vacuna',
      ])
      .getOne();
  }

  async crear(esquemaDto: CrearEsquemaDto) {
    // Crear una nueva instancia de esquema con el objeto modificado
    const vacuna = new Vacuna();
    vacuna.id = esquemaDto.vacunaId;

    const nuevoEsquema = new Esquema({
      ...esquemaDto,
      created_at: new Date(),
      estadoId: 1,
      usuarioId: 99,
      vacuna: vacuna,
    });

    return await this.dataSource.getRepository(Esquema).save(nuevoEsquema);
  }

  async actualizar(id: string, esquemaDto: ActualizarEsquemaDto) {
    const vacuna = new Vacuna();
    vacuna.id = esquemaDto.vacunaId;
    const datosActualizar = {
      ...esquemaDto,
      id: +esquemaDto.id,
      updated_at: new Date(),
      usuarioId: 100,
      vacuna: vacuna,
    };

    return await this.dataSource
      .getRepository(Esquema)
      .update(id, datosActualizar);
  }
}
