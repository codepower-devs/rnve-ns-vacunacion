import { Brackets, DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Esquema } from '../entity/esquema.entity';
import { CrearEsquemaDto } from '../dto/crear-esquema.dto';
import { ActualizarEsquemaDto } from '../dto/actualizar-esquema.dto';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { Vacuna } from '../entity/vacuna.entity';
import { programaVacunacion } from '../entity/programa_vacunacion.entity';

@Injectable()
export class EsquemaRepository {
  constructor(private dataSource: DataSource) {}

  async listar() {
    try {
      return await this.dataSource
        .getRepository(Esquema)
        .createQueryBuilder('esquema')
        .innerJoin('esquema.vacuna', 'vacuna')
        .innerJoin('esquema.programavacunacion', 'programavacunacion')
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
          'esquema.estadoId',
          'vacuna.vacuna',
          'programavacunacion.descripcion',
          'programavacunacion.esEsquemaRegular',
        ])
        .andWhere('esquema.estado_id = :estadoId', { estadoId: 1 })
        .andWhere('programavacunacion.estado_id = :estadoId', { estadoId: 1 })
        .getMany();
    } catch (error) {
      console.error('Error listar esquema:', error);
      throw new Error('No se pudo actualizar los datos');
    }
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto;
    const query = this.dataSource
      .getRepository(Esquema)
      .createQueryBuilder('esquema')
      .innerJoin('esquema.vacuna', 'vacuna')
      .innerJoin('esquema.programavacunacion', 'programavacunacion')
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
        'esquema.estadoId',
        'vacuna.vacuna',
        'programavacunacion.descripcion',
        'programavacunacion.esEsquemaRegular',
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
          qb.orWhere('programavacunacion.esEsquemaRegular ilike :filtro', {
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
      .innerJoin('esquema.programavacunacion', 'programavacunacion')
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
        'esquema.estadoId',
        'vacuna.id',
        'vacuna.vacuna',
        'programavacunacion.id',
        'programavacunacion.descripcion',
        'programavacunacion.esEsquemaRegular',
      ])
      .getOne();
  }

  async crear(esquemaDto: CrearEsquemaDto) {
    // Crear una nueva instancia de esquema con el objeto modificado
    const vacuna = new Vacuna();
    vacuna.id = esquemaDto.vacunaId;

    const programavacunacion = new programaVacunacion();
    programavacunacion.id = esquemaDto.programavacunacionId;

    const nuevoEsquema = new Esquema({
      ...esquemaDto,
      created_at: new Date(),
      estadoId: 1,
      usuarioId: 99,
      vacuna: vacuna,
      programavacunacion: programavacunacion,
    });

    return await this.dataSource.getRepository(Esquema).save(nuevoEsquema);
  }

  async actualizar(id: string, esquemaDto: ActualizarEsquemaDto) {
    const vacuna = new Vacuna();
    vacuna.id = esquemaDto.vacunaId;

    const programavacunacion = new programaVacunacion();
    programavacunacion.id = esquemaDto.programavacunacionId;

    const datosActualizar = {
      ...esquemaDto,
      updated_at: new Date(),
      usuarioId: 100,
      vacuna: vacuna,
      programavacunacion: programavacunacion,
    };

    return await this.dataSource
      .getRepository(Esquema)
      .update(id, datosActualizar);
  }
}
