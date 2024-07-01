import { Column, Entity, PrimaryColumn } from 'typeorm';

import dotenv from 'dotenv';

dotenv.config();

@Entity({
  name: 'establecimiento_gestion',
  schema: process.env.DB_SCHEMA_PARAMETRICAS,
  synchronize: false,
})
export class EstablecimientoGestion {
  @PrimaryColumn({
    type: 'integer',
    name: 'id',
    comment: 'Clave primaria de la tabla Establecimientos-Gestion',
  })
  id: number;

  @Column({
    name: 'establecimiento_id',
  })
  establecimientoId: number;

  @Column()
  establecimiento: string;

  public constructor(data?: EstablecimientoGestion) {
    if (data) Object.assign(this, data);
  }
}
