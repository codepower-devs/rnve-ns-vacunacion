import { Brackets, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ActualizarGlobalsDto, CrearGlobalsDto } from '../dto';
import { Globals } from '../entity';
import { GlobalsEstado } from '../constant';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';

@Injectable()
export class GlobalsRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Globals)
      .createQueryBuilder('globals')
      .where({ id: id })
      .getOne();
  }

  async actualizar(
    id: string,
    parametroDto: ActualizarGlobalsDto,
    usuarioAuditoria: string,
  ) {
    const datosActualizar = new Globals({
      ...parametroDto,
      usuarioModificacion: usuarioAuditoria,
    });
    return await this.dataSource
      .getRepository(Globals)
      .update(id, datosActualizar);
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto;
    const query = this.dataSource
      .getRepository(Globals)
      .createQueryBuilder('globals')
      .select([
        'globals.id',
        'globals.grupo',
        'globals.descripcion',
        'globals.catalogoId',
        'globals.tablaId',
      ])
      .take(limite)
      .skip(saltar);

    switch (orden) {
      case 'grupo':
        query.addOrderBy('globals.grupo', sentido);
        break;
        break;
      case 'descripcion':
        query.addOrderBy('globals.descripcion', sentido);
        break;
        break;
      case 'estado':
        query.addOrderBy('globals.estado', sentido);
        break;
      default:
        query.orderBy('globals.id', 'ASC');
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('globals.grupo like :filtro', {
            filtro: `%${filtro}%`,
          });
          qb.orWhere('globals.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          });
        }),
      );
    }
    return await query.getManyAndCount();
  }

  async listarPorGrupo(grupo: string) {
    return await this.dataSource
      .getRepository(Globals)
      .createQueryBuilder('globals')
      .select([
        'globals.id',
        'globals.grupo',
        'globals.descripcion',
        'globals.catalogoId',
        'globals.tablaId',
      ])
      .where('globals.grupo = :grupo', {
        grupo,
      })
      .andWhere('globals.estado = :estado', {
        estado: GlobalsEstado.ACTIVO,
      })
      .getMany();
  }

  async crear(parametroDto: CrearGlobalsDto, usuarioAuditoria: string) {
    const { grupo, descripcion } = parametroDto;

    const parametro = new Globals();
    parametro.grupo = grupo;
    parametro.descripcion = descripcion;
    parametro.usuarioCreacion = usuarioAuditoria;

    return await this.dataSource.getRepository(Globals).save(parametro);
  }
}
