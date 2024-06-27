import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import dotenv from 'dotenv';
import { programavacunacionDepartamento } from './programavacunacion_departamento.entity';
dotenv.config();

//@Check(UtilService.buildStatusCheck(grupoeEtareoEstado))
@Entity({
  name: 'programa_vacunacion',
  schema: process.env.DB_SCHEMA_VACUNACION,
})
export class programaVacunacion {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'programavacunacion_pkey',
    type: 'integer',
    name: 'id',
    comment: 'Clave primaria de la tabla programa de vacunacion',
  })
  id?: number;

  @Column({
    length: 100,
    type: 'varchar',
    comment: 'Descripción del programa de vacunacion',
  })
  descripcion: string;

  @Column({
    name: 'es_esquema_regular',
    type: 'boolean',
    default: true,
    comment:
      'Indica si el programa de vacunacion pertenece a esquema regular (true/false)',
  })
  esEsquemaRegular: boolean = true;

  @Column({
    name: 'fecha_aplicacion',
    type: 'date',
    comment: 'Fecha de aplicacion del programa de vacunacion',
  })
  fechaAplicacion: Date;

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
    name: 'estado_id',
    type: 'integer',
    comment: 'Estado del programa_vacunacion',
  })
  estadoId: number;

  @OneToMany(
    () => programavacunacionDepartamento,
    (pgvacdepto) => pgvacdepto.programaVacunacion,
  )
  programavacunaDeptos?: programavacunacionDepartamento[];

  public constructor(data?: programaVacunacion) {
    if (data) Object.assign(this, data);
  }
}
