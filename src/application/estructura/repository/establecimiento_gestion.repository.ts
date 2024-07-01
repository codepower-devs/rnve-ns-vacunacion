import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EstablecimientoGestion } from '../entity/establecimiento_gestion.entity';

@Injectable()
export class EstablecimientoGestionRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: number) {
    return await this.dataSource
      .getRepository(EstablecimientoGestion)
      .createQueryBuilder('estabgest')
      .where({ id: id })
      .select([
        'estabgest.id',
        'estabgest.establecimientoId',
        'estabgest.establecimiento',
      ])
      .getOne();
  }
}
