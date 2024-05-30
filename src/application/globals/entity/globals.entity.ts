import { UtilService } from '@/common/lib/util.service';
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditoriaEntity } from '@/common/entity/auditoria.entity';
import { GlobalsEstado } from '../constant';
import dotenv from 'dotenv';

dotenv.config();
@Check(UtilService.buildStatusCheck(GlobalsEstado))
@Entity({
  name: 'catalogos_genericos',
  schema: process.env.DB_SCHEMA_PARAMETRICAS,
})
export class Globals extends AuditoriaEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla Parámetro',
  })
  id: string;

  @Column({
    type: 'bigint',
    name: 'catalogo_id',
    comment: 'Clave foránea de la tabla Catálogo',
  })
  catalogoId: number;

  @Column({
    type: 'bigint',
    name: 'tabla_id',
    comment: 'Clave foránea de la tabla Tabla',
  })
  tablaId: number;

  @Column({ length: 100, type: 'varchar', comment: 'Grupo de parámetro' })
  grupo: string;

  @Column({ length: 255, type: 'varchar', comment: 'Descripción de parámetro' })
  descripcion: string;

  constructor(data?: Partial<Globals>) {
    super(data);
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || GlobalsEstado.ACTIVO;
  }
}
