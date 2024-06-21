import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import dotenv from 'dotenv';
dotenv.config();

//@Check(UtilService.buildStatusCheck(grupoeEtareoEstado))
@Entity({ name: 'vacuna', schema: process.env.DB_SCHEMA_VACUNACION })
export class Vacuna {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'vacuna_pkey',
    type: 'integer',
    name: 'id',
    comment: 'Clave primaria de la tabla vacuna',
  })
  id?: number;

  @Column({
    length: 100,
    type: 'varchar',
    comment: 'Nombre de vacuna',
  })
  vacuna: string;

  @Column({
    name: 'enfermedades_previene',
    length: 200,
    type: 'varchar',
    comment: 'Enfermedades que previene',
  })
  enfermedadesPreviene: string;

  @Column({
    name: 'via',
    length: 100,
    type: 'varchar',
    comment: 'Via de administracion de la vacuna',
  })
  via: string;

  @Column({ type: 'timestamp', comment: 'Fecha de creacion del registro' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    comment: 'Fecha de modificacion del registro',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at?: Date;

  @Column({
    name: 'usuario_id',
    type: 'integer',
    comment: 'Estado del Grupo etareo ',
  })
  usuarioId: number;

  @Column({
    name: 'estado_id',
    type: 'integer',
    comment: 'Estado del Grupo etareo ',
  })
  estadoId: number;

  public constructor(data?: Vacuna) {
    if (data) Object.assign(this, data);
  }
}
