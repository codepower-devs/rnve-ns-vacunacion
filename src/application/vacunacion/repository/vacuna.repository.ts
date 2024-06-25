import { Brackets, DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Vacuna } from '../entity/vacuna.entity';
import { CrearVacunaDto } from '../dto/crear-vacuna.dto';
import { ActualizarVacunaDto } from '../dto/actualizar-vacuna.dto';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';

@Injectable()
export class VacunaRepository {
  constructor(private dataSource: DataSource) {}

  async listar() {
    return await this.dataSource
      .getRepository(Vacuna)
      .createQueryBuilder('vacuna')
      .select([
        'vacuna.id',
        'vacuna.vacuna',
        'vacuna.enfermedadesPreviene',
        'vacuna.via',
        'vacuna.estadoId',
      ])
      .where({ estadoId: 1 })
      .getMany();
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto;
    const query = this.dataSource
      .getRepository(Vacuna)
      .createQueryBuilder('vacuna')
      .select([
        'vacuna.id',
        'vacuna.vacuna',
        'vacuna.enfermedadesPreviene',
        'vacuna.via',
        'vacuna.estadoId',
      ])
      .take(limite)
      .skip(saltar);

    switch (orden) {
      case 'vacuna':
        query.addOrderBy('vacuna.vacuna', sentido);
        break;
      default:
        query.addOrderBy('vacuna.id', 'ASC');
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('vacuna.vacuna ilike :filtro', {
            filtro: `%${filtro}%`,
          });
        }),
      );
    }
    return await query.getManyAndCount();
  }

  async buscarPorVacuna(descripcion: string, transaction?: EntityManager) {
    const repo = transaction
      ? transaction.getRepository(Vacuna)
      : this.dataSource.getRepository(Vacuna);
    return await repo
      .createQueryBuilder('vacuna')
      .where({ vacuna: descripcion })
      .select([
        'vacuna.id',
        'vacuna.vacuna',
        'vacuna.enfermedadesPreviene',
        'vacuna.via',
        'vacuna.estadoId',
      ])
      .getOne();
  }

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Vacuna)
      .createQueryBuilder('vacuna')
      .where({ id: id })
      .select([
        'vacuna.id',
        'vacuna.vacuna',
        'vacuna.enfermedadesPreviene',
        'vacuna.via',
        'vacuna.estadoId',
      ])
      .getOne();
  }

  async crear(vacunaDto: CrearVacunaDto) {
    // Crear una nueva instancia de Vacuna con el objeto modificado
    const nuevaVacuna = new Vacuna({
      ...vacunaDto,
      created_at: new Date(),
      estadoId: 1,
      usuarioId: 99,
    });

    return await this.dataSource.getRepository(Vacuna).save(nuevaVacuna);
  }

  async actualizar(id: string, vacunaDto: ActualizarVacunaDto) {
    const datosActualizar = {
      ...vacunaDto,
      id: +id,
      updated_at: new Date(),
      usuarioId: 100,
    };

    return await this.dataSource
      .getRepository(Vacuna)
      .update(id, datosActualizar);
  }
}
