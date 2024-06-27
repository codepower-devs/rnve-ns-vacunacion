import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import dotenv from 'dotenv';
import { Vacuna } from './vacuna.entity';
import { programaVacunacion } from './programa_vacunacion.entity';
dotenv.config();

@Entity({ name: 'esquema', schema: process.env.DB_SCHEMA_VACUNACION })
export class Esquema {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'esquema_pkey',
    type: 'integer',
    name: 'id',
    comment: 'Clave primaria de la tabla esquema',
  })
  id?: number;

  @Column({
    length: 100,
    type: 'varchar',
    name: 'edad_condicion',
    comment: 'Descripción del Edad o condicion',
  })
  edadCondicion: string;

  @Column({
    name: 'periodo_tiempo_id',
    type: 'integer',
    comment: 'Identificador de periodo de tiempo ',
  })
  periodoTiempoId: number;

  @Column({
    name: 'descripcion_periodo_tiempo',
    length: 100,
    type: 'varchar',
    comment: 'Descripción perido de tiempo',
  })
  descripcionPeriodoTiempo: string;

  @Column({
    name: 'numero_de_dosis',
    length: 50,
    type: 'varchar',
    comment: 'Numero de dosis',
  })
  numeroDeDosis: string;

  @Column({
    name: 'cantidad_de_dosis',
    length: 50,
    type: 'varchar',
    comment: 'Numero de dosis',
  })
  cantidadDeDosis: string;

  @Column({
    name: 'via_lugar_de_dosis',
    length: 100,
    type: 'varchar',
    comment: 'Numero de dosis',
  })
  viaLugarDeDosis: string;

  @Column({
    name: 'edad_minima_dias',
    type: 'integer',
    comment: 'Edad minima en dias del esquema ',
  })
  edadMinimaDias: number;

  @Column({
    name: 'edad_minima_meses',
    type: 'integer',
    comment: 'Edad minima en meses del esquema ',
  })
  edadMinimaMeses: number;

  @Column({
    name: 'edad_minima_anios',
    type: 'integer',
    comment: 'Edad minima en meses del esquema',
  })
  edadMinimaAnios: number;

  @Column({
    name: 'edad_maxima_dias',
    type: 'integer',
    comment: 'Edad maxima en dias del esquema',
  })
  edadMaximaDias: number;

  @Column({
    name: 'edad_maxima_meses',
    type: 'integer',
    comment: 'Edad maxima en meses del esquema ',
  })
  edadMaximaMeses: number;

  @Column({
    name: 'edad_maxima_anios',
    type: 'integer',
    comment: 'Edad maxima en meses del esquema ',
  })
  edadMaximaAnios: number;

  @Column({
    name: 'orden_de_dosis',
    type: 'integer',
    comment: 'Orden de la dosis para una vacuna',
  })
  ordenDeDosis: number;

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
  usuarioId: number;

  @Column({
    name: 'vacuna_id',
    type: 'integer',
    comment: 'Clave foránea que índica que pertenece a vacuna',
  })
  vacunaId?: number;

  @ManyToOne(() => Vacuna)
  @JoinColumn([
    {
      name: 'vacuna_id',
      foreignKeyConstraintName: 'fkey_vacunas',
    },
  ])
  vacuna: Vacuna;

  @Column({
    name: 'programavacunacion_id',
    type: 'integer',
    comment: 'Clave foránea que índica que pertenece a programa de vacunacion',
  })
  programavacunacionId?: number;

  @ManyToOne(() => programaVacunacion)
  @JoinColumn([
    {
      name: 'programavacunacion_id',
      foreignKeyConstraintName: 'fkey_programavacunacion',
    },
  ])
  programavacunacion: programaVacunacion;

  @Column({
    name: 'estado_id',
    type: 'integer',
    comment: 'Estado del Esquema ',
  })
  estadoId: number;

  public constructor(data?: Esquema) {
    if (data) Object.assign(this, data);
  }
}
