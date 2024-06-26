import { Brackets, DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { programaVacunacion } from '../entity/programa_vacunacion.entity';
import { ActualizarProgramaVacunacionDto } from '../dto/actualizar-programavacunacion.dto';
import { CrearProgramaVacunacionDto } from '../dto/crear-programavacunacion.dto';

@Injectable()
export class ProgramavacunacionRepository {
  constructor(private dataSource: DataSource) {}

  async listar() {
    return await this.dataSource
      .getRepository(programaVacunacion)
      .createQueryBuilder('programaVacunacion')
      .select([
        'programaVacunacion.id',
        'programaVacunacion.descripcion',
        'programaVacunacion.esEsquemaRegular',
        'programaVacunacion.fechaAplicacion',
        'programaVacunacion.estadoId',
      ])
      .where('programaVacunacion.estado_id = :estadoId', { estadoId: 1 })
      .getMany();
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto;
    const query = this.dataSource
      .getRepository(programaVacunacion)
      .createQueryBuilder('programaVacunacion')
      .select([
        'programaVacunacion.id',
        'programaVacunacion.descripcion',
        'programaVacunacion.esEsquemaRegular',
        'programaVacunacion.fechaAplicacion',
        'programaVacunacion.estadoId',
      ])
      .take(limite)
      .skip(saltar);

    switch (orden) {
      case 'descripcion':
        query.addOrderBy('programaVacunacion.descripcion', sentido);
        break;
      default:
        query.addOrderBy('programaVacunacion.id', 'ASC');
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('programaVacunacion.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          });
          qb.orWhere('programaVacunacion.esEsquemaRegular ilike :filtro', {
            filtro: `${filtro}`,
          });
        }),
      );
    }
    return await query.getManyAndCount();
  }

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(programaVacunacion)
      .createQueryBuilder('programaVacunacion')
      .where({ id: id })
      .select([
        'programaVacunacion.id',
        'programaVacunacion.descripcion',
        'programaVacunacion.esEsquemaRegular',
        'programaVacunacion.fechaAplicacion',
        'programaVacunacion.estadoId',
      ])
      .getOne();
  }

  async crear(programaVacunacionDto: CrearProgramaVacunacionDto) {
    // Crear una nueva instancia de esquema con el objeto modificado

    const programavacunacion = new programaVacunacion({
      ...programaVacunacionDto,
      created_at: new Date(),
      estadoId: 1,
      usuarioId: 99,
    });

    return await this.dataSource
      .getRepository(programaVacunacion)
      .save(programavacunacion);
  }

  async actualizar(
    id: string,
    programaVacunacionDto: ActualizarProgramaVacunacionDto,
  ) {
    const datosActualizar = {
      ...programaVacunacionDto,
      updated_at: new Date(),
      usuarioId: 100,
    };

    return await this.dataSource
      .getRepository(programaVacunacion)
      .update(id, datosActualizar);
  }
}
