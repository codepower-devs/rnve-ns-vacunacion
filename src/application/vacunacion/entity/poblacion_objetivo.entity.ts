import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import dotenv from 'dotenv';
import { EstablecimientoGestion } from '../../estructura/entity/establecimiento_gestion.entity';
import { grupoEtareo } from './grupo_etareo.entity';
dotenv.config();

@Entity({
  name: 'poblacion_objetivo',
  schema: process.env.DB_SCHEMA_VACUNACION,
  synchronize: true,
})
export class poblacionObjetivo {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'poblacion_objetivo_pkey',
    type: 'integer',
    name: 'id',
    comment: 'Clave primaria de la tabla poblacion objetivo.',
  })
  id?: number;

  @Column({
    name: 'cantidad',
    type: 'integer',
    comment: 'Cantidad total del grupo etareo.',
  })
  cantidad: number;

  @Column({
    name: 'cantidad_masculino',
    type: 'integer',
    comment: 'Cantidad masculino del grupo etareo.',
  })
  cantidadMasculino: number;

  @Column({
    name: 'cantidad_femenino',
    type: 'integer',
    comment: 'Cantidad femenino del grupo etareo ',
  })
  cantidadFemenino: number;

  @Column({
    name: 'cantidad_pai',
    type: 'integer',
    comment: 'Cantidad PAI total del grupo etareo ',
  })
  cantidadPai: number;

  @Column({
    name: 'cantidad_masculino_pai',
    type: 'integer',
    comment: 'Cantidad PAI masculino del grupo etareo ',
  })
  cantidadMasculinoPai: number;

  @Column({
    name: 'cantidad_femenino_pai',
    type: 'integer',
    comment: 'Cantidad PAI femenino del grupo etareo ',
  })
  cantidadFemeninoPai: number;

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
    name: 'estabgest_id',
    type: 'integer',
    comment:
      'Clave foránea que índica que pertenece a Establecimiento de salud',
  })
  establecimientoGestionId: number;

  @ManyToOne(() => EstablecimientoGestion)
  @JoinColumn([
    {
      name: 'estabgest_id',
      foreignKeyConstraintName: 'fkey_poblacionobj_estabgest',
    },
  ])
  establecimientoGestion: EstablecimientoGestion;

  @Column({
    name: 'grupo_etareo_id',
    type: 'integer',
    comment: 'Clave foránea que índica que pertenece a un grupo etareo',
  })
  grupoEtareoId: number;

  @ManyToOne(() => grupoEtareo)
  @JoinColumn([
    {
      name: 'grupo_etareo_id',
      foreignKeyConstraintName: 'fkey_poblacionobj_grupoetareo',
    },
  ])
  grupoEtareo: grupoEtareo;

  @Column({
    name: 'estado_id',
    type: 'integer',
    comment: 'Estado del Registro ',
  })
  estadoId: number;

  public constructor(data?: poblacionObjetivo) {
    if (data) Object.assign(this, data);
  }
}
