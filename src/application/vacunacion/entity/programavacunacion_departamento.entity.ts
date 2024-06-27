import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import dotenv from 'dotenv';
import { programaVacunacion } from './programa_vacunacion.entity';

dotenv.config();

@Entity({
  name: 'programavacunacion_departamento',
  schema: process.env.DB_SCHEMA_VACUNACION,
})
@Index('Idx_progvacuna_depto', ['programavacunacionId', 'departamentoId'], {
  unique: true,
})
export class programavacunacionDepartamento {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'programavacunacion_departamento_pkey',
    type: 'integer',
    name: 'id',
    comment: 'Clave primaria de la tabla programavacunacion_departamento',
  })
  id?: number;

  @Column({
    name: 'programavacunacion_id',
    type: 'integer',
    comment: 'Clave foránea que índica que pertenece a programa vacunacion',
  })
  programavacunacionId: number;

  @ManyToOne(() => programaVacunacion)
  @JoinColumn({
    name: 'programavacunacion_id',
    foreignKeyConstraintName: 'fkey_programavacunacion_id',
  })
  programaVacunacion: programaVacunacion;

  @Column({
    length: 100,
    type: 'varchar',
    comment: 'Nombre de programavacunacion_departamento',
  })
  programavacunacion_departamento: string;

  @Column({
    name: 'departamento_id',
    type: 'integer',
    comment: 'Codigo de departamento ',
  })
  departamentoId: number;

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
    comment: 'Identificador de usuario',
  })
  usuario_id: number;

  @Column({
    name: 'estado_id',
    type: 'integer',
    comment: 'Estado del registro',
  })
  estado_id: number;

  public constructor(data?: programavacunacionDepartamento) {
    if (data) Object.assign(this, data);
  }
}
