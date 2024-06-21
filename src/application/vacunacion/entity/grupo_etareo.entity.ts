import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import dotenv from 'dotenv';
dotenv.config();

//@Check(UtilService.buildStatusCheck(grupoeEtareoEstado))
@Entity({ name: 'grupo_etareo', schema: process.env.DB_SCHEMA_VACUNACION })
export class grupoEtareo {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
    comment: 'Clave primaria de la tabla grupo_etareo',
  })
  id?: number;

  @Column({
    length: 100,
    type: 'varchar',
    comment: 'Descripción del Grupo etareo',
  })
  descripcion: string;

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
    name: 'edad_inicial',
    type: 'integer',
    comment: 'Edad Inicial del Grupo etareo ',
  })
  edadInicial: number;

  @Column({
    name: 'edad_final',
    type: 'integer',
    comment: 'Edad Final del Grupo etareo ',
  })
  edadFinal: number;

  @Column({
    name: 'genero_aplica_id',
    type: 'integer',
    comment: 'Identificador de genero que aplica al grupo etareo',
  })
  generoAplicaId: number;

  @Column({
    name: 'descripcion_genero_aplica',
    length: 100,
    type: 'varchar',
    comment: 'Descripción genero que aplica al grupo etareo',
  })
  descripcionGeneroAplica: string;

  @Column({
    name: 'es_esquema_regular',
    type: 'boolean',
    default: true,
    comment:
      'Indica si el grupo etareo pertenece a esquema regular (true/false)',
  })
  esEsquemaRegular: boolean = true;

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

  public constructor(data?: grupoEtareo) {
    if (data) Object.assign(this, data);
  }
}
